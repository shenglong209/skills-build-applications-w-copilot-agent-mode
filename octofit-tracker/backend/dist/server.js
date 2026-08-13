"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const leaderboardRoutes_1 = __importDefault(require("./routes/leaderboardRoutes"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/users', userRoutes_1.default);
app.use('/api/teams', teamRoutes_1.default);
app.use('/api/activities', activityRoutes_1.default);
app.use('/api/leaderboard', leaderboardRoutes_1.default);
app.use('/api/workouts', workoutRoutes_1.default);
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'Octofit Tracker API is running',
        apiBaseUrl,
    });
});
app.get('/', (_req, res) => {
    res.json({
        name: 'Octofit Tracker API',
        version: '1.0.0',
        apiBaseUrl,
    });
});
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log('✓ Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`✓ Server running on ${apiBaseUrl}`);
        console.log(`✓ Frontend will run on http://localhost:5173`);
        console.log(`✓ MongoDB listening on ${MONGODB_URI}`);
    });
})
    .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map