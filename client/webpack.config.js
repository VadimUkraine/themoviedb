const path = require("path");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

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

const webpackConfigCommon = {
  context: path.resolve(__dirname, "src"),
  entry: ["babel-polyfill", "./index.tsx"],
  output: {
    filename: `[name].[contenthash].js`,
    path: path.resolve(__dirname, "public")
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
    })
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
