const path = require("path");
const fs = require("fs-extra");

// each script has an entry
const scriptPath = path.resolve(__dirname, "./src");
const entry = fs
  .readdirSync(scriptPath)
  .filter(
    (dir) => !fs.statSync(`${scriptPath}/${dir}`).isFile() && dir !== "template"
  )
  .reduce((entry, scriptName) => {
    entry[scriptName] = `${scriptPath}/${scriptName}/main.tsx`;
    return entry;
  }, {});

module.exports = {
  entry: entry,
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
