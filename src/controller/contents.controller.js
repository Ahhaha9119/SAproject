import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/sap.query.js';
import HttpStatus from './HttpStatus.js';



export const addContent = (req, res) => {

  logger.info(`${req.method} ${req.originalUrl}, adding content`);

  database.query(QUERY.ADD_CONTENT, Object.values(req.body), (error, results) => {
    
    if(!results){
      
      logger.error(error.message);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
    } else {
      

      res.status(HttpStatus.CREATED.code)
        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Content added`));
       
    }
  });
};

export const getContents = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching contents`);
  database.query(QUERY.SELECT_CONTENTS, (error, results) => {
    if(!results){
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No contents found`));
    } else {
      
      //var content = results;

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Contents retrieved`, { content: results }));

      //console.log(content[0].content);

    }
  });
};

export const getContent = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching content`);
  database.query(QUERY.SELECT_CONTENT, [req.params.contentId], (error, results) => {
    if(!results[0]){
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Content by id ${req.params.contentId} was not found`));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Content retrieved`, results[0]));
    }
  });
};

export const updateContent = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching content`);
  database.query(QUERY.SELECT_CONTENT, [req.params.contentId], (error, results) => {
    if(!results[0]){
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Content by id ${req.params.contentId} was not found`));
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating content`);
      database.query(QUERY.UPDATE_CONTENT, [...Object.values(req.body), req.params.contentId], (error, results) => {
        if(!error){
          res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Content updated`, { id: req.params.contentId, ...req.body }));
        } else {
          logger.error(error.message);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
        }
      });
    }
  });
};

export const deleteContent = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting content`);
  database.query(QUERY.DELETE_CONTENT, [req.params.contentId], (error, results) => {
    if(results.affectedRows > 0){
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Content deleted`, results[0]));
    } else {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Content by id ${req.params.contentId} was not found`));
    }
  });
};


