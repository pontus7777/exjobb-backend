import express, { Request, Response } from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from './auth/passport' // Import the configured passport instance
import steamRoutes from './routes/steamRoutes' // Import the Steam routes
import { setupSwagger } from './swagger'
import { CONFIG } from './config/enviroment'
import openDotaRoutes from './routes/openDotaRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true, // Allow cookies to be sent
  })
)

// Express middleware for sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your secret',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Register authentication routes
app.use('/api/v1/steam', steamRoutes)
app.use('/api/v1', openDotaRoutes)

// Swagger documentation
setupSwagger(app)

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl })
})

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${CONFIG.PORT}`)
  console.log(`API docs available at http://localhost:${CONFIG.PORT}/api-docs`)
})

// Export the server for cleanup in tests
export { server }

// Export the app instance for testing purposes
export default app
