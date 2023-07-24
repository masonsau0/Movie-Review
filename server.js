import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';
import { lutimes } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/addReview', (req, res) => {
	let { movie, title, review, rating, userID, movieID } = req.body;

	let connection = mysql.createConnection(config);

	let sql = 'INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movie_id) VALUES (?, ?, ?, ?, ?)';
	let data = [title, review, rating, userID, movieID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			console.error(error.message);
		} else {
			let reviewData = {
				movie,
				title,
				review,
				rating,
				movieID
			};
			res.status(200).send({ reviewData });
			console.log(reviewData);
		}
		connection.end();
	});
});

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM movies`;

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/searchMovies', (req, res) => {
	const { title, actor, director } = req.body;
  
	let sql = `
	  SELECT m.name AS movieTitle, CONCAT(d.first_name, ' ', d.last_name) AS director,
			 r.reviewContent, AVG(r.reviewScore) AS avgReviewScore
	  FROM movies m
	  LEFT JOIN Review r ON m.id = r.movie_id
	  LEFT JOIN movies_directors md ON m.id = md.movie_id
	  LEFT JOIN directors d ON md.director_id = d.id
	  LEFT JOIN roles roles1 ON m.id = roles1.movie_id
	  LEFT JOIN actors a ON roles1.actor_id = a.id
	  WHERE 1
	`;
  
	const conditions = [];
  
	if (title) {
	  conditions.push(`m.name LIKE '%${title}%'`);
	}
  
	if (actor) {
	  conditions.push(`CONCAT(a.first_name, ' ', a.last_name) LIKE '%${actor}%'`);
	}
  
	if (director) {
	  conditions.push(`CONCAT(d.first_name, ' ', d.last_name) LIKE '%${director}%'`);
	}
  
	if (conditions.length > 0) {
	  sql += ' AND ' + conditions.join(' AND ');
	}
  
	sql += ' GROUP BY m.name, director, r.reviewContent';
  
	const connection = mysql.createConnection(config);
  
	connection.query(sql, (error, results, fields) => {
	  if (error) {
		console.error(error.message);
		return res.status(500).send('Error retrieving movie data');
	  }
  
	  const movieData = results.map((result) => ({
		movieTitle: result.movieTitle,
		director: result.director,
		reviewContent: result.reviewContent,
		avgReviewScore: result.avgReviewScore,
	  }));
  
	  res.status(200).json(movieData);
	});
  
	connection.end();
  });


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
