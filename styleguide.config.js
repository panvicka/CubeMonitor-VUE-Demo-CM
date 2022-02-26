var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  assetsDir: 'docs/assets/',
  theme: {
    color: {
      link: "blue",
      linkHover: "red",
    },
  },
  styles: {},
  sections: [
    {
      name: "Motivation and introduction",
      content: "docs/introduction.md",
    },
    {
      name: "Documentation",
      content: "docs/documentation.md",
    },
    {
      name: "UI Components",
      components: "src/components/**/[A-Z]*.vue",
      exampleMode: "collapse", // 'hide' | 'collapse' | 'expand'
      usageMode: "collapse", // 'hide' | 'collapse' | 'expand'
    },
  ],
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
