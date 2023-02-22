import express from 'express';
import { addContentwithSentiment, getAVGmagnitude, getAVGscore, getAVGsentiments } from '../controller/central.controller.js';

const centralRoutes = express.Router();

centralRoutes.route('/')
  .post(addContentwithSentiment);

centralRoutes.route('/avg/:keywordId')
  .get(getAVGsentiments);

centralRoutes.route('/avg/:keywordId/score')
  .get(getAVGscore);

centralRoutes.route('/avg/:keywordId/magnitude')
  .get(getAVGmagnitude);

export default centralRoutes;
