# RSVG WebPack plugin

A plugin for WebPack to rasterize svg files using [librsvg](https://github.com/GNOME/librsvg).

## Installation

```sh
npm install --save-dev rsvg-webpack-plugin
```

## Usage

```js
const RsvgWebpackPlugin = require('rsvg-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new RsvgWebpackPlugin([
      { file: 'assets/logo.svg', name: 'logo-16.png', width: 16, height: 16 },
      { file: 'assets/logo.svg', name: 'logo-32.png', width: 32, height: 32 },
      { file: 'assets/logo.svg', name: 'logo-48.png', width: 48, height: 48 }
    ])
  ]
}
```

This will output three files: `logo-16.png`, `logo-32.png` and `logo-48.png`.
