import express from 'express';
import { addContent, deleteContent, getContent, getContents, updateContent } from '../controller/contents.controller.js';

const contentsRoutes = express.Router();

contentsRoutes.route('/')
  .get(getContents)
  .post(addContent);

contentsRoutes.route('/:contentId')
  .get(getContent)
  .delete(deleteContent);

export default contentsRoutes;
