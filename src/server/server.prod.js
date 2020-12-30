/* Production Server - server.prod.js */

// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import chalk from 'chalk';
import dotenv from 'dotenv';
import routes from './routes/index.js';

// Get access to process.env
dotenv.config();

// Setting app to use express as server
const app = express();

// Middleware
// Using compression - gzip
app.use(compression());
// Serving Static Files
app.use(express.static('dist'));
// Using Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Using Cros
app.use(cors());
// Using Routes
app.use('/', routes);

// Not Found
app.use((req, res, next) => {
    const error = new Error('Page not found!');
    error.status = 404;
    next(error);
});

// Spin Server
const port = process.env.port;
app.listen(port, () => {
    console.log(chalk.green('Express Server is running...'));
    console.log(chalk.green(`http://localhost:${port}`));
    // Automatically open in browser
    // open(`http://localhost:${port}`);
});
