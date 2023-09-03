const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  devtool: false,
  optimization: {
    minimizer: [new TerserWebpackPlugin()]
  },
  plugins: [new CleanWebpackPlugin()]
};
