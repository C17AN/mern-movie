const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie-controller");

router.post("/movie", movieController.createMovie);
router.get("/movie/:id", movieController.getMovieById);
router.get("/movies", movieController.getMovies);
router.put("/movie/:id", movieController.updateMovie);
router.delete("/movie/:id", movieController.deleteMovie);

module.exports = router;
