import type { FC, SVGProps } from 'react';

export type SvgIcon = FC<SVGProps<SVGSVGElement>>;

declare module '*.svg' {
  const ReactComponent: SvgIcon;
  export default ReactComponent;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}