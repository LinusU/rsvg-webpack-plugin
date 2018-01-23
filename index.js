const fs = require('fs')
const path = require('path')
const { Rsvg } = require('librsvg-prebuilt')

function renderSvg (inputPath, specification) {
  return new Promise((resolve, reject) => {
    const svg = new Rsvg()
    const input = fs.createReadStream(inputPath)

    input.on('error', (err) => reject(err))
    svg.on('error', (err) => reject(err))

    svg.on('finish', () => {
      resolve(svg.render({ format: 'png', width: specification.width, height: specification.height }).data)
    })

    input.pipe(svg)
  })
}

function callbackify (promise, cb) {
  promise.then(
    () => process.nextTick(cb, null),
    err => process.nextTick(cb, err)
  )
}

function RsvgWebpackPlugin (specification) {
  if (!Array.isArray(specification)) {
    specification = [specification]
  }

  function apply (compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      const all = Promise.all(specification.map((spec) => {
        return renderSvg(path.join(compiler.options.context, spec.file), spec).then((data) => {
          compilation.assets[spec.name] = {
            size () { return data.byteLength },
            source () { return data }
          }
        })
      }))

      callbackify(all, cb)
    })
  }

  return { apply }
}

module.exports = RsvgWebpackPlugin
