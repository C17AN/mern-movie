const Movie = require("../model/movieSchema");

createMovie = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "To create : Data is required",
    });
  }

  const movie = new Movie(body);
  if (!movie) {
    return res.status(400).json({ success: false, error: err });
  }
  // model.save() 는 컬렉션에 도큐먼트를 추가함.
  movie
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: movie._id, // _id는 스키마가 가진 기본적인 고유값임
        message: "Movie data added",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        err,
        message: "Failed to create movie data",
      });
    });
};

updateMovie = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "To update : Data is required",
    });
  }
  // findOne의 콜백 인자의 두 번째 값은 동작 수행 결과가 담긴다.
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Movie not found",
      });
    }
    movie.name = body.name;
    movie.time = body.time;
    movie.rating = body.rating;
    movie
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: movie._id,
          message: "Movie data updated",
        });
      })
      .catch((err) => {
        return res.status(404).json({
          err,
          message: "Failed to update Data",
        });
      });
  });
};

deleteMovie = async (req, res) => {
  await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, error: "Movie data not found" });
    }
    return res.status(200).json({ success: true, data: movie });
  }).catch((err) => console.log(err));
};

getMovieById = async (req, res) => {
  await Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, error: "Movie data not found" });
    }
    return res.status(200).json({ success: true, data: movie });
  }).catch((error) => console.log(error));
};

getMovies = async (req, res) => {
  // 모든 도큐먼트를 검색할 때는 조건 객체를 빈 객체로 설정한다.
  await Movie.find({}, (err, movies) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    // 영화 목록이 비었을 때
    if (!movies.length) {
      return res.status(404).json({ success: false, error: "No Movies found" });
    }
    return res.status(200).json({ success: true, data: movies });
  }).catch((err) => console.log(err));
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovieById,
};
