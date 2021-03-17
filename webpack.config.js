const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const isDevelopment = process.env.NODE_ENV !== 'production';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "/server/public"),
        filename: "index_bundle.js"
    },
    devtool: isDevelopment && "cheap-module-eval-source-map",
    devServer: {
        port: 3000,
        proxy: {
            "*": "http://[::1]:8080",
            "secure": false,
            "changeOrigin": true
        },
        open: true,
        contentBase: path.join(__dirname, "../src"),
        // host: '0.0.0.0',
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    performance: {
        hints: false
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        sourceMap: true
                    }
                },
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: isDevelopment,
                            plugins: [
                                autoprefixer()
                            ]
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "[id].css",
        }),

        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),

        // new BundleAnalyzerPlugin()
    ]
};