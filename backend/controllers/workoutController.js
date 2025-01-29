const prisma = require("../models/prismaClient");

// Получить все тренировки
exports.getAllWorkouts = async (req, res) => {
    try {
        const workouts = await prisma.workout.findMany();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Создать новую тренировку
exports.createWorkout = async (req, res) => {
    try {
        const { name, type, duration, distance, averageHeartRate, averagePower } = req.body;
        const workout = await prisma.workout.create({
            data: {
                name,
                type,
                duration,
                distance,
                averageHeartRate,
                averagePower,
            },
        });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ message: "Invalid data" });
    }
};

// Получить одну тренировку по ID
exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await prisma.workout.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!workout) return res.status(404).json({ message: "Workout not found" });
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Обновить тренировку
exports.updateWorkout = async (req, res) => {
    try {
        const { name, type, duration, distance, averageHeartRate, averagePower } = req.body;
        const workout = await prisma.workout.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name,
                type,
                duration,
                distance,
                averageHeartRate,
                averagePower,
            },
        });
        res.json(workout);
    } catch (error) {
        res.status(400).json({ message: "Invalid data" });
    }
};

// Удалить тренировку
exports.deleteWorkout = async (req, res) => {
    try {
        await prisma.workout.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json({ message: "Workout deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};