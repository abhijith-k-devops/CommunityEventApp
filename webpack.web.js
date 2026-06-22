const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "index.web.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".web.tsx", ".web.ts", ".web.js", ".tsx", ".ts", ".js", ".json"],
    mainFields: ["react-native", "browser", "module", "main"],
    alias: {
      "react-native$": "react-native-web",
      "expo-modules-core$": path.resolve(__dirname, "node_modules/expo-modules-core/index.js"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(@react-native|react-native|react-native-web|react-native-safe-area-context|react-native-screens|@react-native-vector-icons|expo|expo-asset|expo-font|expo-modules-core)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["module:@react-native/babel-preset"],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    port: 8082,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/v1"],
        target: "https://mocki.io",
        changeOrigin: true,
        secure: true,
      },
    ],
  },
  devtool: "eval-source-map",
};
