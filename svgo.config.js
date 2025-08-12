module.exports = {
  multipass: true,
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    { name: 'convertPathData', params: { floatPrecision: 2 } },
    'mergePaths',
    'removeHiddenElems',
    'removeUnknownsAndDefaults',
    { name: 'removeViewBox', active: false },
  ],
}
