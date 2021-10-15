/** @internal */
declare global {
  // Will be provided through Terser global definitions by Angular CLI during the
  // production build. This is how Angular does tree-shaking internally.
  const ngDevMode: boolean;
}

export {};
