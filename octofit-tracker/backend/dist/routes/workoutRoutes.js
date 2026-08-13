"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_1.default.find().sort({ createdAt: 1 });
        res.json({ message: 'Workouts endpoint', workouts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = await Workout_1.default.create(req.body);
        res.status(201).json({ message: 'Workout suggestion created', workout });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create workout', error });
    }
});
exports.default = router;
//# sourceMappingURL=workoutRoutes.js.map