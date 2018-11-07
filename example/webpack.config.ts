import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import CopyWebpackPlugin = require('copy-webpack-plugin');

const config: webpack.Configuration = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, 'index.tsx'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'public'), to: 'public'}
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8088
    }
};

export default config;