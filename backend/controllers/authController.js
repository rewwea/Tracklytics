const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prismaClient");
require("dotenv").config();

// Регистрация пользователя
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Проверка, существует ли пользователь
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание пользователя
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Авторизация пользователя
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Поиск пользователя
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Создание JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};