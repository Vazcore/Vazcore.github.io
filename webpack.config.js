var path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: ["./js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  devtool: "eval",
  resolveLoader: {
    alias: {
      "ag_remove_numbers": path.join(__dirname, "/custom_loaders/remove_numbers")
    }
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, "js")
        ],
        loaders: ['ag_remove_numbers', 'babel-loader?presets[]=es2015']
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
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
    new webpack.optimize.OccurrenceOrderPlugin(),    
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({PRODUCTION: false}),
  ], 
  cache: true,
  watch: true,
  devServer: {
    host: "localhost",
    port: "5000",
    contentBase: "."
  }
};