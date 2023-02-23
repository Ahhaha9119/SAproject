CREATE DATABASE IF NOT EXISTS maindb;

ALTER DATABASE maindb DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE maindb;

DROP TABLE IF EXISTS keywordcache;
DROP TABLE IF EXISTS contentcache;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS sentiments;


CREATE TABLE keywords (
  keywordId  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  keyword    TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  CONSTRAINT pk_keywords PRIMARY KEY (keywordId)
);

CREATE TABLE contents (
  contentId  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  keywordId  INT UNSIGNED NOT NULL,
  content    TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,

  CONSTRAINT pk_contents PRIMARY KEY (contentId),
  CONSTRAINT fk_contentskeywords FOREIGN KEY (keywordId)
  REFERENCES keywords(keywordId)
);

CREATE TABLE sentiments (
  sentimentsId  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  contentId     INT UNSIGNED NOT NULL,
  score         FLOAT NOT NULL,
  magnitude     FLOAT NOT NULL,

  CONSTRAINT pk_sentiments PRIMARY KEY (sentimentsId),
  CONSTRAINT fk_sentimentscontents FOREIGN KEY (contentId)
  REFERENCES contents(contentId)
);

CREATE TABLE keywordcache (
  cachekeywordId  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  keyword         TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,

  CONSTRAINT pk_keywordcache PRIMARY KEY (cachekeywordId)
);

CREATE TABLE contentcache (
  cachecontentId  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  cachekeywordId  INT UNSIGNED NOT NULL,
  content         TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,

  CONSTRAINT pk_contentcache PRIMARY KEY (cachecontentId),
  CONSTRAINT fk_contentcachekeywords FOREIGN KEY (cachekeywordId)
  REFERENCES keywords(cachekeywordId)
);
