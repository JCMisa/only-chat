import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import userRoutes from './routes/UserRoute.js';

// --- 1. Load Environment Variables ---
dotenv.config();

// --- 2. Get Configuration Variables ---
const port = process.env.PORT || 3001; 
const databaseURL = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_KEY;

// --- 3. Basic Environment Variable Checks (Highly Recommended) ---
if (!databaseURL) {
  console.error("FATAL ERROR: DATABASE_URL is not defined in your .env file.");
  process.exit(1); 
}

if (!jwtSecret) {
  console.error("FATAL ERROR: JWT_KEY is not defined in your .env file.");
  process.exit(1);
}

// --- 4. Initialize Express App ---
const app = express();

// --- 5. Apply Global Middleware ---
// These middleware functions will apply to all routes

// Enable CORS for cross-origin requests
app.use(cors({
  origin: process.env.ORIGIN, // Use your frontend URL from .env
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true // Allow cookies to be sent across origins
}));

// Parse JSON request bodies (e.g., from POST/PUT requests)
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

// --- 6. Define Routes (Example) ---
// You'll add your API routes here or import them from separate files

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the Node.js Express Backend!");
});

// Example health check endpoint
app.get("/health", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).json({ status: "ok", database: "connected" });
  } else {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

// --- 7. Connect to MongoDB Atlas and Start the Server ---
mongoose.connect(databaseURL, {
  dbName: 'OnlyChat', 
})
  .then(() => {
    console.log("MongoDB Atlas Connected!");

    // Start the Express server only after the database connection is successful
    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      // In Codespaces, this will be the public URL
      console.log(`Open your frontend at: ${process.env.ORIGIN}`);
    });

    // Optional: Handle server shutdown gracefully
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        mongoose.disconnect(() => {
          console.log('MongoDB disconnected');
          process.exit(0);
        });
      });
    });

  })
  .catch((err) => {
    console.error("MongoDB Atlas connection error:", err);
    process.exit(1); // Exit the process if DB connection fails
  });