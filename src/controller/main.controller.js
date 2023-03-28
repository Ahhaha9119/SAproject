import fs from 'fs';
import express from 'express';
import language from '@google-cloud/language';
import {loadJsonFile} from 'load-json-file';

import HttpStatus from './HttpStatus.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';


function sentimentAnalyze(text) {

  const client = new language.LanguageServiceClient();

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  
  const [result] = client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  console.log(sentiment);
}

export const postKeyword = (req, res) => {
  console.log(Object.values(req.body));
};

export const getPackages = (req, res) => {
  
  /*
  fs.readFile('../packages/data.json', (err, obj) => {
    
    obj = JSON.parse(obj);
    console.log(obj);
  });
  */
  //console.log(loadJsonFile('../data/justdata.json'));

  res.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `packages fetched`, data));
};

//sentimentAnalyze("hello there~");
