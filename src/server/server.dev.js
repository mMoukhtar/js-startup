/* Server - index.js */

// Imports
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../../webpack.dev.js';
import path from 'path';

// Get access to dirname
const moduleURL = new URL(import.meta.url);
const dirname = path.dirname(moduleURL.pathname);

// Get access to process.env
dotenv.config();

// Setting app to use express as server
const app = express();

// Middleware
// Using Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Using Cros
app.use(cors());

if (app.get('env') === 'development') {
    // Using Webpack
    const webpackCompiler = webpack(webpackDevConfig);
    app.use(
        webpackDevMiddleware(webpackCompiler, {
            publicPath: webpackDevConfig.output.publicPath,
        })
    );
    app.use(webpackHotMiddleware(webpackCompiler));
} else {
}

// Spin Server
const port = process.env.port;
app.listen(port, () => {
    console.log(chalk.green('Express Server is running...'));
    console.log(chalk.green(`http://localhost:${port}`));
    // Automatically open in browser
    // open(`http://localhost:${port}`);
});

//Get
app.get((req, res) => {
    res.sendFile(path.join(dirname, '../Client/views/index.html'));
});
