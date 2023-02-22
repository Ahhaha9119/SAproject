import express from 'express';
import { addKeyword, deleteKeyword, getKeyword, getKeywords, updateKeyword } from '../controller/keywords.controller.js';

const keywordsRoutes = express.Router();

keywordsRoutes.route('/')
  .get(getKeywords)
  .post(addKeyword);

keywordsRoutes.route('/:keywordId')
  .get(getKeyword)
  .delete(deleteKeyword);

export default keywordsRoutes;


