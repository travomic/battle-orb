import React from 'react';
import classes from './aura.module.styl';
import { AuraAPI } from './AuraAPI';

interface IProps {
  apiURI: string;
  schema?: string;
  title: string;
  year: number;
  aside: React.ReactNode;
}

export const AuraLayout = ({
  apiURI,
  children, 
  title, 
  year,
  aside,
  schema,
}: React.PropsWithChildren<IProps>) => {
  return (
    <AuraAPI apiURI={apiURI} schema={schema}>
      <div className={classes.root}>
        <header className={classes.head}>
          <h1>{title}</h1>
        </header>

        <main className={classes.main}>
          {children}
        </main>

        <aside className={classes.more}>
          {aside}
        </aside>

        <footer className={classes.foot}>
          {year}
        </footer>
      </div>
    </AuraAPI>
  )
}