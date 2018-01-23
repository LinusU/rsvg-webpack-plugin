declare interface Specification {
  /** Path to the input SVG file */
  file: string

  /** Name of the output PNG file */
  name: string

  /** Width of the output image */
  width: number

  /** Height of the output image */
  height: number
}

declare class RsvgWebpackPlugin {
  constructor (specification: Specification | Specification[])
}

export = RsvgWebpackPlugin
