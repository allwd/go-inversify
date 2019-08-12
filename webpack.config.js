const path = require('path');
const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: {
        app: ['./app/app.ts'],
        vendor: ['inversify', 'reflect-metadata', 'es6-symbol', 'gojs']
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: /app/,
                exclude: /node_modules/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.js$/,
                use: ['source-map-loader']
            },
            {
                test: /\.scss$/,
                use:
                [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 25000
                    }
                }
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: 'build',
        host: process.env.HOST,
        port: 9000,
        index: 'index.html',
        overlay: {
            errors: true,
            warnings: true
        }
    }
};
