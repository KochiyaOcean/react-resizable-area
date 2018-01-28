const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    sourceMapFilename: "[file].map",
    libraryTarget: 'umd',
    library: 'ReactResizeableArea',
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory=true',
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
}
