import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/sap.query.js';
import HttpStatus from './HttpStatus.js';

export const addKeyword = (req, res) => {

  logger.info(`${req.method} ${req.originalUrl}, adding keyword`);

  database.query(QUERY.ADD_KEYWORD, Object.values(req.body), (error, results) => {

    if(!results){

      logger.error(error.message);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
    } else {

      res.status(HttpStatus.CREATED.code)
        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Keyword added`));
    }
  });
};

export const getKeywords = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching keywords`);
  database.query(QUERY.SELECT_KEYWORDS, (error, results) => {
    if(!results){
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No keyword found`));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Keywords retrieved`, { keywords: results }));
    }
  });
};

export const getKeyword = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching keyword`);
  database.query(QUERY.SELECT_KEYWORD, [req.params.keywordId], (error, results) => {
    if(!results[0]){
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Keyword by id ${req.params.id} was not found`));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Keyword retrieved`, results[0]));
    }
  });
};

export const updateKeyword = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching keyword`);
  database.query(QUERY.SELECT_KEYWORD, [req.params.keywordId], (error, results) => {
    if(!results[0]){
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Keyword by id ${req.params.keywordId} was not found`));
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating keyword`);
      database.query(QUERY.UPDATE_KEYWORD, [...Object.values(req.body), req.params.keywordId], (error, results) => {
        if(!error){
          res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Keyword updated`, { KeywordId: req.params.keywordId, ...req.body }));
        } else {
          logger.error(error.message);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
        }
      });
    }
  });
};

export const deleteKeyword = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting keyword`);
  database.query(QUERY.DELETE_KEYWORD, [req.params.keywordId], (error, results) => {
    if(results.affectedRows > 0){
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Keyword deleted`, results[0]));
    } else {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `KeywordId by id ${req.params.keywordId} was not found`));
    }
  });
};

export default HttpStatus;


