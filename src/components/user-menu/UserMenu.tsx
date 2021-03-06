import * as React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from 'urql';
import { AuthGate, ObjDetails } from '../index';
import { useSessionState } from '../../hooks';
import { DB_NAME, SELF_CONTEXT, SELF_OPTIONS } from '../../constants';
import { GET_USER_DATA, SET_USER_DATA_ATTR } from '../../queries/user';
import classes from './user-menu.module.styl';
import styles from './user-menu.styles';

interface IProps {
  logoutURL: string;
}

export const UserMenu = ({ logoutURL }: IProps) => {
  const sess = useSessionState();

  const { 
    error: userError,
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  const [{
    error: userDataError, 
    data: userDataRoot 
  }, getUserData] = useQuery({
    ...SELF_CONTEXT,
    query: GET_USER_DATA,
    variables: { userId: sess?.userUUID },
    pause: (true ||
      isLoading ||
      !isAuthenticated ||
      !sess?.userUUID ||
      !!userError
    )
  });

  const [{ fetching: busySettingAttr }, setDataAttr] = useMutation(SET_USER_DATA_ATTR);

  if (isLoading) {
    return <></>;
  }

  if (userError || userDataError) {
    return (<div>
      <strong>
        Dang<i>!</i> Something didn't work as expected.
      </strong>

      <pre>{JSON.stringify(userError, null, 2)}</pre>
      <pre>{JSON.stringify(userDataError, null, 2)}</pre>
    </div>);
  }

  const userData = userDataRoot?.[`${DB_NAME}_user`][0].user_data;

  const handleLogout = () => {
    logout({
      returnTo: logoutURL
    });
  }

  const handleTap = () => {
    setDataAttr({
      authName: user?.sub,
      value: { 
        tapCount: (userData?.tapCount ?? 0) + 1 
      }
    }, SELF_OPTIONS);
  }

  return (
    <nav className={classes.menu}>
      {isAuthenticated ? <>
        <img
          className={classes.pic}
          src={user.picture}
          width={32}
          height={32}
          alt={user.name}
        />

        <button onClick={handleLogout}>LOG-OUT</button>
      </> : <>
        <button onClick={loginWithRedirect}>LOG-IN</button>
      </>}

      <AuthGate>
        <div className={styles.menu}>
          <ObjDetails className={classes.details} title="Data" src={userData} />

          <button onClick={getUserData}>
            GET DATA
          </button>

          <button onClick={handleTap} disabled={busySettingAttr}>
            TAP ME
          </button>

          <ObjDetails className={classes.details} title="User" src={user} />
        </div>
      </AuthGate>
    </nav>
  );
}