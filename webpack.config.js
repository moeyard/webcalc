const path = require("path");
module.exports = {
  entry: './src/index.js',
  output: {
    path : path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  module : {
    rules : [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.scss$/, 
        loader: 'style-loader!css-loader!sass-loader', 
        exclude: /node_modules/ 
      }
    ]
  }
};
