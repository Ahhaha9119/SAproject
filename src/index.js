import express from 'express';
import dotenv from 'dotenv';
import ip from 'ip';
import cors from 'cors';

import Response from './domain/response.js';
import HttpStatus from './controller/HttpStatus.js';
import logger from './util/logger.js';

import contentsRoutes from './route/contents.route.js';
import keywordsRoutes from './route/keywords.route.js';
import centralRoutes from './route/central.route.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/contents', contentsRoutes);
app.use('/keywords', keywordsRoutes);
app.use('/main', centralRoutes);
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'SAP API, v1.0.0, working well')));

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));
