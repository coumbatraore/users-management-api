import prisma from "../models/prisma.js";
import { hashPassword } from "../utils/passwords.js";

// Champs à sélectionner (on exclut toujours le password)
const userSelect = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
};

const getAllUsers = async ({ page = 1, limit = 10 } = {}) => {
    const skip = (Number(page) - 1) * Number(limit);

    const [usersList, usersCount] = await Promise.all([
        prisma.user.findMany({
            select: userSelect,
            skip,
            take: Number(limit),
        }),
        prisma.user.count(),
    ]);

    return {
        data: usersList,
        total: usersCount,
        page: Number(page),
        limit: Number(limit),
    };
};

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: userSelect,
    });

    return { data: user };
};

const createUser = async (userData) => {
    const createdUser = await prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name,
            password: await hashPassword(userData.password),
        },
        select: userSelect,
    });
    return { data: createdUser };
};

const updateUser = async (id, userData) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            ...(userData.email && { email: userData.email }),
            ...(userData.name && { name: userData.name }),
        },
        select: userSelect,
    });

    return { data: updatedUser };
};

const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (user.data) {
        return prisma.user.delete({ where: { id } });
    }
    return false;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };