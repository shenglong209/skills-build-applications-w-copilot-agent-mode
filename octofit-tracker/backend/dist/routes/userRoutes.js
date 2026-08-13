"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await User_1.default.find().sort({ createdAt: 1 });
        res.json({ message: 'Users endpoint', users });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await User_1.default.create(req.body);
        res.status(201).json({ message: 'User created', user });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map