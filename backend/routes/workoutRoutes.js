const express = require("express");
const router = express.Router();
const {
    getAllWorkouts,
    createWorkout,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
} = require("../controllers/workoutController");

// Получить все тренировки
router.get("/", getAllWorkouts);

// Создать новую тренировку
router.post("/", createWorkout);

// Получить одну тренировку по ID
router.get("/:id", getWorkoutById);

// Обновить тренировку
router.put("/:id", updateWorkout);

// Удалить тренировку
router.delete("/:id", deleteWorkout);

module.exports = router;