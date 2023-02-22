import language from '@google-cloud/language';
import express from 'express';

import database from '../config/mysql.config.js';
import HttpStatus from '../controller/HttpStatus.js';
import QUERY from '../query/sap.query.js';
import logger from '../util/logger.js';
import Response from '../domain/response.js';

//google-nlp sentiment analyze function.
async function analyzing(contentId ,text, req, res) {

  const client = new language.LanguageServiceClient();

  const document = {

    content: text,
    type: 'PLAIN_TEXT',
  };

    
  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  //Add sentiment results to 'sentiments' table in sapdb.
  database.query(QUERY.ADD_SENTIMENT, [contentId, sentiment.score, sentiment.magnitude], (error, results) => {

    if(!results){

      logger.error(error.message);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occured(adding sentiment results)`));
    } else {

      res.status(HttpStatus.CREATED.code)
        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `action completed`));
    }
  });
}

//Adding content to 'contents' table in sapdb then call the sentiment analyze function.
export const addContentwithSentiment = (req, res) => {
  
  database.query(QUERY.ADD_CONTENT, Object.values(req.body), (error, results) => {
    
    if(!results){

      logger.error(error.message);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(adding content)`));
    } else {
      
      logger.info(`content added(success!)`);

      //Select the required contentId for the query to add sentiments.
      database.query(QUERY.SELECT_MAX_CONTENTID , (error, results) => {

        if(!results){

          logger.error(error.message);

          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(getting max contentId)`));
        } else {

          logger.info(`max contentId recieved`);

          //Calling analyzing function.
          analyzing(results[0].latestId, req.body.content, req, res);
        }

      });
    }
  });
};

//Select the average score and magnitude of contents by keyword.
export const getAVGsentiments = (req, res) => {
  
  logger.info(`${req.method} ${req.originalUrl}, fetching AVG sentiments`);

  database.query(QUERY.AVG_SCORE_MAGNITUDE, [req.params.keywordId], (error, results) => {

    if(!results){

      logger.error(error.message);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occured(fetching avgs)`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `avgs received`, results));
    }
  });
};

//Select the average score of contents by keyword.
export const getAVGscore = (req, res) => {
  
  logger.info(`${req.method} ${req.originalUrl}, fetching avg score`);
  
  database.query(QUERY.AVG_SCORE_MAGNITUDE, [req.params.keywordId], (error, results) => {

    if(!results){

      logger.error(error.message);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occured(fetching avg score)`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `avg score received`, results[0].SCORE));
    }
  });
};

//Select the average magnitude of contents by keyword.
export const getAVGmagnitude = (req, res) => {

  logger.info(`${req.method} ${req.originalUrl}, fetcing avg magnitude`);

  database.query(QUERY.AVG_SCORE_MAGNITUDE, [req.params.keywordId], (error, results) => {
    
    if(!results){

      logger.error(error.message);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `error occurred(fetching avg magnitude)`));
    } else {

      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `avg magnitude received`, results[0].MAGNITUDE));
    }
  });
};
