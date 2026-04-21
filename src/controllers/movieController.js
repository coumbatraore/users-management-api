import * as movieService from "../services/movieService.js";

const getAllMovies = async (req, res, next) => {
    try {
        const { page, limit, title, genre } = req.query;
        const result = await movieService.getAllMovies({ page, limit, title, genre });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getMovieById = async (req, res, next) => {
    try {
        const result = await movieService.getMovieById(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const createMovie = async (req, res, next) => {
    try {
        const { title, releaseYear, genre, director } = req.body;

        if (!title || !releaseYear || !genre || !director) {
            return res.status(400).json({
                message: "title, releaseYear, genre and director are required"
            });
        }

        const result = await movieService.createMovie(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const updateMovie = async (req, res, next) => {
    try {
        const result = await movieService.updateMovie(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        await movieService.deleteMovie(req.params.id);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
