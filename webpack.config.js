const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const assets = path.resolve(__dirname, "assets");

module.exports = (env = {}) => {
    const publicPath = env.PUBLIC_PATH ?? "auto";

    return {
        entry: path.resolve(__dirname, "src/index.ts"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            publicPath,
            clean: true,
        },
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(assets), to: path.resolve("dist", "assets") },
                ],
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "index.html"),
                filename: "index.html",
                inject: "body",
                scriptLoading: "blocking",
            }),
        ],
        devServer: {
            static: false,
            port: 8080,
            hot: false,
            liveReload: true,
            client: {
                overlay: true,
            },
        },
    };
};

