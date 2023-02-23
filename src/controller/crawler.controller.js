import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/sap.query.js';
import HttpStatus from './HttpStatus.js';

//Adding a new keyword to 'keywords' table.
export const addcachekeyword = (req, res) => {
  
  logger.info(`${req.method} ${req.originalUrl}, adding keyword`);

  database.query(QUERY.ADD_KEYWORD, Object.values(req.body), (error, results) => {

    if(!results){

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred (adding keyword)`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `new keyword added`, results[0]));
    }
  });
};

//Fetching keyword.
export const getKeyword = (req, res) => {
  
  logger.info(`${req.method} ${req.originalUrl}, fetching keyword`)
};
