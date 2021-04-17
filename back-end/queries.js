const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "music",
  password: "postgres",
  port: 5432,
});

const getSongs = (request, response) => {
  pool.query("SELECT * FROM songs", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(response);
    response.status(200).json(results.rows);
  });
};

const getArtists = (request, response) => {
  pool.query("SELECT * FROM artists", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addSongs = (request, response) => {
  const { song_name, downloads } = request.body;
  pool.query(
    `INSERT INTO songs (song_name, downloads) VALUES ($1, $2)`,
    [song_name, downloads],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addArtists = (request, response) => {
  const { artist_name, genre, age } = request.body;
  pool.query(
    `INSERT INTO artists (artist_name, genre, age) VALUES ($1, $2, $3)`,
    [artist_name, genre, age],
    (error, results) => {
      if (error) {
        throw error;
      }
      respoonse.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getSongs,
  addSongs,
  getArtists,
  addArtists
};
