const express = require("express");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Маршруты
app.use("/api/workouts", workoutRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});