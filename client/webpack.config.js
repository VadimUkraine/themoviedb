/* eslint-disable no-param-reassign */
const path = require("path");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const dotenv = require("dotenv");
const webpack = require("webpack");
const webpackConfigDev = require("./webpack/webpack.config.dev");
const webpackConfigProd = require("./webpack/webpack.config.prod");

const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env", "@babel/preset-react"]
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const env = dotenv.config({ path: `./.env` }).parsed || {};

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const webpackConfigCommon = {
  context: path.resolve(__dirname, "src"),
  entry: ["babel-polyfill", "./index.tsx"],
  output: {
    filename: `[name].contenthash].js`,
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions()
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript")
        }
      }
    ]
  }
};

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return merge([webpackConfigCommon, webpackConfigDev]);
    case "production":
      return merge(webpackConfigCommon, webpackConfigProd);
    default:
      throw new Error("No matching configuration was found!");
  }
};
