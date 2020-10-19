import * as React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import classes from './user-menu.module.styl';

interface IProps {
  logoutURL: string;
}

export const UserMenu = ({ logoutURL }: IProps) => {
  const { 
    error,
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return (<strong>
      Dang<i>!</i> Something didn't work as expected.
    </strong>);
  }

  const handleLogout = () => {
    logout({
      returnTo: logoutURL
    });
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
    </nav>
  );
}