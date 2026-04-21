import prisma from "../models/prisma.js";

const getAllMovies = async ({ page = 1, limit = 10, title, genre } = {}) => {
    const where = {};
    if (title) where.title = { contains: title, mode: "insensitive" };
    if (genre) where.genre = { contains: genre, mode: "insensitive" };

    const skip = (Number(page) - 1) * Number(limit);

    const [movies, total] = await Promise.all([
        prisma.movie.findMany({ where, skip, take: Number(limit) }),
        prisma.movie.count({ where }),
    ]);

    return {
        data: movies,
        total,
        page: Number(page),
        limit: Number(limit),
    };
};

const getMovieById = async (id) => {
    const movie = await prisma.movie.findUnique({ where: { id } });
    return { data: movie };
};

const createMovie = async (movieData) => {
    const movie = await prisma.movie.create({ data: movieData });
    return { data: movie };
};

const updateMovie = async (id, movieData) => {
    const movie = await prisma.movie.update({
        where: { id },
        data: movieData,
    });
    return { data: movie };
};

const deleteMovie = async (id) => {
    return prisma.movie.delete({ where: { id } });
};

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };