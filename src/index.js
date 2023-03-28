import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import ip from 'ip';
import cors from 'cors';

import Response from './domain/response.js';
import HttpStatus from './controller/HttpStatus.js';
import logger from './util/logger.js';

import mainRoutes from './route/main.route.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const path = '/home/ahhaha9191/Documents/SAproject/api/src/test.json';
let rawdata = fs.readFileSync(path);
console.log(JSON.parse(rawdata));


app.use('/main', mainRoutes);
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'SAproject API, v1.0.0, working well')));

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));
