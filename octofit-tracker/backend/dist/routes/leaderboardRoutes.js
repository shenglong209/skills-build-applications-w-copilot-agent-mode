"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find().sort({ points: -1, rank: 1 });
        res.json({ message: 'Leaderboard endpoint', leaderboard });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboardRoutes.js.map