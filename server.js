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

	let sql = `SELECT * FROM User WHERE userID = ?`;
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
	const [firstName, lastName] = actor ? actor.split(' ') : ['', '']; // Split actor name into first and last name
  
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
  
	if (firstName) {
	  conditions.push(`a.first_name LIKE '%${firstName}%'`);
	}
  
	if (lastName) {
	  conditions.push(`a.last_name LIKE '%${lastName}%'`);
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

  app.post('/api/movieRecommendations', (req, res) => {
	const { movieTitle } = req.body;
	let connection = mysql.createConnection(config);
  
	// Get the lead actors of the given movie
	let getLeadActorsSql = `
	  SELECT a.first_name, a.last_name
	  FROM actors a
	  JOIN roles r ON a.id = r.actor_id
	  JOIN movies m ON r.movie_id = m.id
	  WHERE m.name = ?
	`;
  
	connection.query(getLeadActorsSql, [movieTitle], (error, results, fields) => {
	  if (error) {
		console.error(error.message);
		return res.status(500).send('Error retrieving lead actors');
	  }
  
	  const leadActors = results.map((actor) => `${actor.first_name} ${actor.last_name}`);
  
	  // Get movie recommendations based on lead actors
	  let getRecommendationsSql = `
      SELECT m.name AS movieTitle, m.id AS movie_id, GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name)) AS leadActors
      FROM movies m
      JOIN roles r ON m.id = r.movie_id
      JOIN actors a ON r.actor_id = a.id
      WHERE CONCAT(a.first_name, ' ', a.last_name) IN (?)
      AND m.name <> ?
      AND NOT EXISTS (
        SELECT 1
        FROM UserFeedback uf
        WHERE uf.movie_id = m.id
        AND uf.liked = 0
        AND uf.userID = 1 -- Replace this with the actual user ID
      )
      GROUP BY m.name, m.id
    `;
  
	  connection.query(getRecommendationsSql, [leadActors, movieTitle], (error, results, fields) => {
		if (error) {
		  console.error(error.message);
		  return res.status(500).send('Error retrieving movie recommendations');
		}
  
		const recommendations = results.map((movie) => ({
		  movie_id: movie.movie_id,
		  movieTitle: movie.movieTitle,
		  leadActors: movie.leadActors,
		  
		}));
  
		res.status(200).json(recommendations);
	  });
  
	  connection.end();
	});
  });
  
  app.post('/api/saveLike', (req, res) => {
	const { userID, movieID } = req.body;
  
	let connection = mysql.createConnection(config);
  
	let sql = 'INSERT INTO UserFeedback (userID, movie_id, liked) VALUES (?, ?, ?)';
	let data = [userID, movieID, 1]; // Assuming "1" represents "liked" in the `UserFeedback` table
  
	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		console.error('Error saving like:', error.message);
		return res.status(500).send('Error saving like');
	  } else {
		res.status(200).send('Like saved successfully');
	  }
	  connection.end();
	});
  });

  app.post('/api/saveDislike', (req, res) => {
	const { userID, movieID } = req.body;
  
	let connection = mysql.createConnection(config);
  
	let sql = 'INSERT INTO UserFeedback (userID, movie_id, liked) VALUES (?, ?, ?)';
	let data = [userID, movieID, 0]; // Assuming "1" represents "liked" in the `UserFeedback` table
  
	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		console.error('Error saving like:', error.message);
		return res.status(500).send('Error saving disike');
	  } else {
		res.status(200).send('Disike saved successfully');
	  }
	  connection.end();
	});
  });
  

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
