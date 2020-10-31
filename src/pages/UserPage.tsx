import * as React from 'react';
import { RouteComponentProps, useLocation } from '@reach/router';

interface IProps extends RouteComponentProps {
  streams: any;
}

export const UserPage = ({streams}: IProps) => {
  const location = useLocation();
  
  React.useEffect(() => {
    console.log("STREAMS:", streams);
    console.log('LOCATION:', location);
  }, [streams]);

  return (
    <section>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </section>
  );
};
