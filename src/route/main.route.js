import express from 'express';
import { getPackages, postKeyword } from '../controller/main.controller.js';

const mainRoutes = express.Router();

mainRoutes.route('/allpackages')
  .get(getPackages);

mainRoutes.route('/keyword')
  .post(postKeyword);

export default mainRoutes;
