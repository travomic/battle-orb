import React from 'react';
import classes from './au-ui.module.styl';

interface IProps {
  title: string;
  year: number;
}

export const AuLayout = ({ 
  children, 
  title, 
  year,
}: React.PropsWithChildren<IProps>) => {
  return (
    <div className={classes.root}>
      <header><h1>{title}</h1></header>
      <main>{children}</main>
      <aside></aside>
      <footer>{year}</footer>
    </div>
  )
}