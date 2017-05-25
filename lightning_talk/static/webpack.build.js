const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssnext = require('postcss-cssnext')
const BabiliPlugin = require('babili-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.resolve(__dirname, 'src', 'index')
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/lightning_talk/static/dist/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              'env',
              {
                targets: { browsers: ['> 1%', 'iOS >= 8', 'Android >= 4'] },
                modules: false
              }
            ],
            'react'
          ],
          plugins: [
            'babel-plugin-transform-object-rest-spread',
            'babel-plugin-transform-function-bind',
            'react-hot-loader/babel'
          ]
        }
      },
      { test: /\.(png|jpg)$/, loader: 'file-loader', options: { name: 'img/[hash].[ext]' } },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                context: path.resolve(__dirname, 'src'),
                localIdentName: '[sha1:hash:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                minimize: true,
                debug: false,
                plugins: loader => [
                  cssnext({ browsers: ['> 1%', 'iOS >= 8', 'Android >= 4'] })
                ]
              }
            }
          ]
        })
      }
    ]
  },

  devtool: 'source-map',

  resolve: {
    modules: ['.', 'src', 'public', 'node_modules'],
    extensions: ['.js']
  },

  plugins: [
    new BabiliPlugin(),
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
  ]
}
