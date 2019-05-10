const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin') //自动打开浏览器
const path = require('path')

module.exports = function(env, argv) {
  console.log('env', env)
  env = env || { development: true }

  return {
    entry: {
      index: './src/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          use: [{
            loader: "babel-loader",
            options: {
              presets: ["env", "react"],
            }
          }],
          exclude: /node_modules/
        },
        {
          test: /\.css$/i, // 针对 .css 后缀的文件设置 loader
          use: ['style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }]
        },
        {
          test: /\.(less|css)$/i, // 针对 .less 后缀的文件设置 loader
          use: ['style-loader', 'css-loader', 'less-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i, // 针对 .png|.jpg|.jpeg | .gif 后缀的图片设置 loader
          use: [{
            loader: 'url-loader',
            options: {
              outputPath: 'imgs/', //相对于 output.path 的输出目录
              limit: 8*1024 //大于此数值依旧用 file-loader处理，打包到 imgs 里面，小于此数值的转为 base64，以减少文件请求次数
            }
          }]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i, // 针对 eot|svg|ttf|woff|woff2 后缀的字体设置 loader
          use: [{
            loader: 'url-loader',
            options: {
              outputPath: 'fonts/', //相对于 output.path 的输出目录
              limit: 4*1024 //大于此数值依旧用 file-loader处理，打包到 fonts 里面，小于此数值的转为 base64，以减少文件请求次数
            }
          }]
        }
      ]
    },
    ...env.production ? require('./config/webpack.production.config') : require('./config/webpack.development.config')
  }
}
