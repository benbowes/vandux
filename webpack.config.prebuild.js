const { resolve } = require("path");

const entry = {
  vandux: resolve(__dirname, "src/vandux/index.ts"),
};
const library = "vandux";
const moduleConfig = {
  rules: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: { loader: "ts-loader" },
    },
  ],
};

module.exports = {
  entry,
  module: moduleConfig,
  output: {
    filename: "./dist/[name].js",
    libraryTarget: "umd",
    library,
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js", ".ts"],
  },
};
