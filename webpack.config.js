const path = require("path");
module.exports = {
  entry: './src/index.js',
  output: {
    path : path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  devServer :{
    host : 'localhost',
    port : '8080',
    proxy: {
      "/key": "http://localhost:3000"
    }
  },
  module : {
    rules : [
      { 
        test: /\.js[x]?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.scss$/, 
        loader: 'style-loader!css-loader!sass-loader', 
      },
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader', 
      }

    ]
  }
};
