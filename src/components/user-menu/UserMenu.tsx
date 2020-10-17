import * as React from 'react';

interface IProps {
  authClient: any;
}

export const UserMenu = ({ authClient }: IProps) => {
  React.useEffect(() => {
    
    console.log("authClient:", authClient);
  }, [authClient]);

  const handleLogin = async () => {
    await authClient.loginWithRedirect({
      redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI
    });

    const user = await authClient.getUser();
    console.log('USER:', user);
  }

  return (
    <nav>
      <button onClick={handleLogin}>LOGIN</button>
    </nav>
  );
}