var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  webpackConfig: Object.assign({}, require("./webpack.config.dev.js"), {
    plugins: [
      new webpack.DefinePlugin({
        process: { env: {} },
      }),

      new VueLoaderPlugin(),
    ],
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
  }),
};
