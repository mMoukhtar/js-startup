/* Routes - routes.js */

// Imports
import express from 'express';
import path from 'path';

// Setting Router
const router = express.Router();

// Get access to dirname
const moduleURL = new URL(import.meta.url);
const dirname = path.dirname(moduleURL.pathname);

// Server Endpoints

// define the home page route
router.get('/', (req, res) => {
    res.sendFile(path.join(dirname, '../../../dist/index.html'));
});

export default router;
