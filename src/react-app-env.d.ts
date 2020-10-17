
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface Process{
    env: ProcessEnv
  }
  interface ProcessEnv {
    /**
     * By default, there are two modes in Vite:
     * 
     * * `development` is used by vite and vite serve
     * * `production` is used by vite build
     * 
     * You can overwrite the default mode used for a command by passing the --mode option flag.
     * 
     */
    readonly NODE_ENV: 'development' | 'production'
    readonly VITE_AUTH0_CLIENT: string;
    readonly VITE_AUTH0_DOMAIN: string;
    readonly VITE_TEST_VAR: string;
  }
}

declare var process: NodeJS.Process

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
    const src: string
    export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>

  const src: string;
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.styl' {
  const classes: { readonly [key: string]: string }
  export default classes
}

