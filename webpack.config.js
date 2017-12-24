const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname,
  entry: ['./src/js/ClientApp.jsx', './src/scss/main.scss'],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader' // Adds CSS to the DOM by injecting a <style> tag
          },
          {
            loader: 'css-loader' //  interprets @import and url() like import/require() and will resolve them.
          },
          {
            loader: 'postcss-loader', // postcss loader so we can use autoprefixer
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/' // where the fonts will go
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // define where to save the file
      filename: 'style.css',
      allChunks: true
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.entry = './src/js/App.jsx';
  config.devtool = false;
  config.plugins = [];
}

module.exports = config;
