import { Router } from "express";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../controllers/movieController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

// La route /search doit être AVANT /:id pour ne pas être capturée comme un ID
router.get("/search", authenticate, getAllMovies);
router.get("/", authenticate, getAllMovies);
router.get("/:id", authenticate, getMovieById);
router.post("/", authenticate, createMovie);
router.put("/:id", authenticate, updateMovie);
router.delete("/:id", authenticate, deleteMovie);
export default router;
