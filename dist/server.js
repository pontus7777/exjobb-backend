"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Initialize express app
const app = (0, express_1.default)();
// Load environment variables
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
// Example route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
