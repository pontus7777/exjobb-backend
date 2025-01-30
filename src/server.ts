import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "./auth/passport"; // Import the configured passport instance
import { CONFIG } from "./config/enviroment";
import mongoDbRoutes from "./routes/mongoDbRoutes";
import openDotaRoutes from "./routes/openDotaRoutes";
import steamRoutes from "./routes/steamRoutes"; // Import the Steam routes
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true, // Allow cookies to be sent
  })
);

// Express middleware for sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Register authentication routes
app.use("/api/v1/steam", steamRoutes);
app.use("/api/v1/", openDotaRoutes);
app.use("/api/v1/", mongoDbRoutes);

// Swagger documentation
setupSwagger(app);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${CONFIG.PORT}`);
  console.log(`API docs available at http://localhost:${CONFIG.PORT}/api-docs`);
});

// Export the server for cleanup in tests
export { server };

// Export the app instance for testing purposes
export default app;
