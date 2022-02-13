"use strict";

const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  resolve: {
    alias: {
      vue: "vue/dist/vue.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  // @see https://webpack.js.org/plugins/
  plugins: [
    new VueLoaderPlugin(),
    // Copies from wherever to the dist folder
    new CopyWebpackPlugin([{ from: "./src/index.html" }, { from: "./src/index.css" }, { from: "./src/manifest.json" }]),
  ],
};
