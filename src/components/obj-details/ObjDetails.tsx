import * as React from 'react';

interface IProps {
  className?: string;
  src: any;
  title: string;
}

export const ObjDetails = ({
  className,
  src,
  title
}: IProps) => {
  const [obj, setObj] = React.useState(src);
  console.log('setObj', setObj);
  
  return (
    <details className={className}>
      <summary>{title}</summary>
      {obj ? <ul>
      {Object.keys(obj).map((k) => (
        <li key={k}>
          {k}<br />
          <small>{JSON.stringify(obj[k])}</small>
        </li>
      ))}
      </ul> : <>...</>}
    </details>
  )
}
