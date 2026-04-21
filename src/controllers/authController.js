import * as authService from "../services/authService.js";

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await authService.login({ email, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({
                message: "Email, name and password are required"
            });
        }

        const result = await authService.register({ email, name, password });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const result = await authService.getMe(req.userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export { login, register, getMe };