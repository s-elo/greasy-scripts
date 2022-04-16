const path = require("path");
module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
    },
  },
  watchOptions: {
    // detect the modify time ms
    poll: 1000,
    // avoid repeatly bundle
    aggregateTimeout: 500,
    // not listening
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
