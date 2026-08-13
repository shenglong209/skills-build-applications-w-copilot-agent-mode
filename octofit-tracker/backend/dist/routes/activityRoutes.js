"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity_1.default.find().populate('userId', 'name email').sort({ date: -1 });
        res.json({ message: 'Activities endpoint', activities });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const activity = await Activity_1.default.create(req.body);
        res.status(201).json({ message: 'Activity logged', activity });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create activity', error });
    }
});
exports.default = router;
//# sourceMappingURL=activityRoutes.js.map