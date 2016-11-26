var path = require('path'),
    webpack = require('webpack');

module.exports = {  
  entry: ["./js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, "js")
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: "css-loader!style-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({PRODUCTION: true}),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(
      {
        sourceMap: true,
        mangle: false
      }
    )
  ]
};