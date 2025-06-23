const express = require("express");
const cors = require("cors");
require("dotenv").config();

const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors()); // Разрешаем запросы с фронта
app.use(express.json()); // Для JSON-запросов

// Роуты
app.use("/api", authRoutes); // /api/register, /api/login
app.use("/api/workouts", workoutRoutes); // /api/workouts/*

// Запуск сервера
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});