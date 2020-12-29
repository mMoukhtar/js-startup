/* Server.js */

// Imports
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import path from 'path';
import open from 'open';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackDevConfig from '../../webpack.dev.esm.js';

// Get access to process.env
dotenv.config();

// Setting app to use express as server
const app = express();

// Middleware
// Serving Static Files
app.use(express.static('../../dist'));
// Using Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Using Cros
app.use(cors());
// // Using Webpack
// const webpackCompiler = webpack(webpackDevConfig);
// app.use(
//     webpackDevMiddleware(webpackCompiler, {
//         publicPath: webpackDevConfig.output.publicPath,
//     })
// );
// app.use(webpackHotMiddleware(webpackCompiler));

// Spin Server
const port = process.env.port;
app.listen(port, () => {
    console.log(chalk.green('Express Server is running...'));
    console.log(chalk.green(`http://localhost:${port}`));
    open(`http://localhost:${port}`);
});

// Server Endpoints
app.get('/', (req, res) => {
    console.log(
        chalk.blue(`GET:: /
    request body:
    ${req.body}`)
    );
    res.sendFile(path.join(import.meta.url, '../../dist/index.html'));
});
