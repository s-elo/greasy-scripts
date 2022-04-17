const path = require("path");
module.exports = {
  entry: {
    "00_test": "./src/00_test/main.tsx",
    "01_float_ball": "./src/01_float_ball/main.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
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
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(tsx?|jsx?)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
