-- DROP TABLE IF EXISTS users;
--DROP TABLE IF EXISTS posts;
-- DROP TABLE IF EXISTS comments;
-- DROP TABLE IF EXISTS ratings;
-- DROP TABLE IF EXISTS tags;
-- DROP TABLE IF EXISTS tags_post;

CREATE TABLE IF NOT EXISTS users (

	id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT,
	profilePic TEXT,
	age INTEGER,
	biography TEXT

);

CREATE TABLE IF NOT EXISTS posts (

	id SERIAL PRIMARY KEY,
	title TEXT,
	summary TEXT,
	displayImage TEXT,
	link TEXT,
	author_id INTEGER,
	dt TEXT,
	rating INTEGER,
	gameMaker BOOLEAN

);

CREATE TABLE IF NOT EXISTS comments (

	id SERIAL PRIMARY KEY,
	message TEXT,
	post_id INTEGER,
	user_id INTEGER,
	dt TEXT

);

CREATE TABLE IF NOT EXISTS ratings (

	id SERIAL PRIMARY KEY,
	rating INTEGER,
	post_id INTEGER,
	user_id INTEGER

);

CREATE TABLE IF NOT EXISTS tags (

	id SERIAL PRIMARY KEY,
	tag TEXT

);

CREATE TABLE IF NOT EXISTS tags_post (

	id SERIAL PRIMARY KEY,
	tag_id INTEGER,
	post_id INTEGER

);



