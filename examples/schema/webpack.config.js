var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
      publicPath: '/'
    },
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          test: /\.js$/,
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin()]
};
