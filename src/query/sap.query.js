const QUERY = {
  SELECT_KEYWORDS:    'SELECT * FROM keywords',
  SELECT_CONTENTS:    'SELECT * FROM contents',
  SELECT_SENTIMENTS:  'SELECT * FROM sentiments',

  SELECT_KEYWORD:     'SELECT keyword FROM keywords WHERE keywordId = ?',
  SELECT_CONTENT:     'SELECT content FROM contents WHERE contentId = ?',
  SELECT_SENTIMENT:   'SELECT score, magnitude FROM sentiments WHERE sentimentId = ?',
  
  ADD_KEYWORD:        'INSERT INTO keywords(keyword) VALUES(?)',
  ADD_CONTENT:        'INSERT INTO contents(keywordId, content) VALUES(?, ?)',
  ADD_SENTIMENT:      'INSERT INTO sentiments(contentId, score, magnitude) VALUES(?, ?, ?)',

  DELETE_KEYWORD:     'DELETE FROM keywords WHERE keywordId = ?',
  DELETE_CONTENT:     'DELETE FROM contents WHERE contentId = ?',
  DELETE_SENTIMENT:   'DELETE FROM sentiments WHERE sentimentId = ?',

  SELECT_MAX_CONTENTID: 'SELECT MAX(contentId) AS latestId FROM contents',

  AVG_SCORE_MAGNITUDE:  'SELECT AVG(sentiments.score) AS SCORE, AVG(sentiments.magnitude) AS MAGNITUDE FROM sentiments INNER JOIN contents ON contents.contentId = sentiments.contentId INNER JOIN keywords ON keywords.keywordId = contents.keywordId WHERE keywords.keywordId = ?',
  
  DROP_KEYWORDCACHE:  'DROP TABLE keywordcache',
  DROP_CONTENTCACHE:  'DROP TABLE contentcache',

  CREATE_KEYWORDCACHE:'CREATE TABLE IF NOT EXISTS keywordcache',
  CREATE_CONTENTCACHE:'CREATE TABLE IF NOT EXISTS contentcache',

  CHECK_KEYWORDCACHE: 'SELECT EXISTS (SELECT 1 FROM keywordcache)',
  CHECK_CONTENTCACHE: 'SELECT EXISTS (SELECT 1 FROM contentcache)',

  ADD_CACHEKEYWORD:   'INSERT INTO keywordcache(keyword) VALUES (?)',
};

export default QUERY;
