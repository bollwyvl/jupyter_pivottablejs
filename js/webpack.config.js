var version = require('./package.json').version;

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var loaders = [
  {
    test: /\.json$/, loader: 'json-loader'
  },
  {
    test: /\.css$/, loader: "style-loader!css-loader"
  }
];

var externals = [
  'jupyter-js-widgets',
  'jquery'
];


module.exports = [
  {
    entry: './src/extension.js',
    output: {
      filename: 'extension.js',
      path: '../widgetpivottable/static',
      libraryTarget: 'amd'
    },
    externals: externals
  },
  {
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: '../widgetpivottable/static',
      libraryTarget: 'amd'
    },
    devtool: 'source-map',
    module: {
      loaders: loaders
    },
    externals: externals
  },
  {
    entry: './src/embed.js',
    output: {
      filename: 'index.js',
      path: './dist/',
      libraryTarget: 'amd',
      publicPath: 'https://npmcdn.com/jupyter-widget-pivottable@' + version + '/dist/'
    },
    devtool: 'source-map',
    module: {
      loaders: loaders
    },
    externals: externals
  }
];
