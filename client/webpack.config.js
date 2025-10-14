// webpack.config.js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['javascript', 'python', 'cpp', 'java', 'html', 'css', 'json']
    })
  ]
};