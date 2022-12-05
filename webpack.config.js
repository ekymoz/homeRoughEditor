const WebpackBar = require('webpackbar')
const path = require('path')
const webpack = require('webpack')

module.exports = (env, argv) => {

  const plugins = [
    new WebpackBar(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

  const config = {
    entry: './src/index',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'js/[name].js',
      publicPath: '/',
    },
    plugins,
    resolve: {
      extensions: ['.js'],
      modules: [path.resolve(__dirname, 'node_modules')],
    },
    devtool: 'eval-source-map',
    optimization: {
      nodeEnv: 'development',
    }
  }

  return config
}
