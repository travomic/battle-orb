export type TViewMode = 'flat' | 'orb';
export type TCubeFlag = 'flip' | 'orbit';
export type TCubeFlags = Record<TCubeFlag, boolean>;

export type TFaceTile = {
  style: CSSStyleDeclaration | any;
  opacity: number;
  glyph: string;
}
