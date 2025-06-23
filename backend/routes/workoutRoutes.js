const express = require("express");
const router = express.Router();
const {
    getAllWorkouts,
    createWorkout,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
} = require("../controllers/workoutController");

const auth = require("../middleware/authMiddleware");

// Все маршруты защищены авторизацией
router.get("/", auth, getAllWorkouts);
router.post("/", auth, createWorkout);
router.get("/:id", auth, getWorkoutById);
router.put("/:id", auth, updateWorkout);
router.delete("/:id", auth, deleteWorkout);

module.exports = router;