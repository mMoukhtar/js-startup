import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';

export default {
    entry: [
        // Add the client which connects to our middleware
        // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
        // useful if you run your app from another point like django
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
        // And then the actual application
        './src/client/index.js',
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(import.meta.url, './dist'),
        publicPath: '/',
        library: 'Client',
        libraryTarget: 'var',
    },
    // Development settings
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(import.meta.url, './dist'),
        compress: true,
        port: 3000,
    },
    // Loaders
    module: {
        rules: [
            {
                test: /.m?js$/,
                use: 'babel-loader',
                exclude: /node_module/,
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
            },
        ],
    },
    // Plugins
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/client/views/index.html',
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
