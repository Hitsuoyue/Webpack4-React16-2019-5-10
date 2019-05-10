const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin') //自动打开浏览器
const path = require('path')
module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.min.js' //name为对应入口文件的文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
        // 打包输出HTML
        title: 'New HTML', //打包后生成 html 的 title html模板时不生效
        minify: {
            // 压缩 HTML 文件
            removeComments: true, // 移除 HTML 中的注释
            collapseWhitespace: true, // 删除空白符与换行符
            minifyCSS: true // 压缩内联 css
        },
        filename: 'index.html', // 生成后的文件名
        template: 'index.ejs' // 根据此模版生成 HTML 文件
        }),
        // 默认情况下，此插件将删除 webpack output.path目录中的所有文件。
        new CleanWebpackPlugin()
    ]
}