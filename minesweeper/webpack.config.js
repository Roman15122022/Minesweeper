const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.main.js',
    clean: true
  },
  resolve: {
    alias: {
      asserts: path.resolve(__dirname, './src/asserts'),
      extensions: ['.js'],
    }
  },
  devServer: {
    port: '3000',
    static: path.resolve(__dirname, 'src'),
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: true
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,'style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.jpeg$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/template.html'),
      filename: 'index.html'
    })
  ]
}
