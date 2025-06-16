import express from 'express';
import { syncClerkUserToDB, getUserProfile } from '../controllers/AuthController.js';

const router = express.Router();

// Endpoint for syncing user data after Clerk sign-up/login
// The frontend will POST the Clerk user data to this endpoint.
// REMEMBER: THIS ROUTE IS INSECURE WITHOUT VERIFICATION.
router.post('/sync-user', syncClerkUserToDB);

// Endpoint to fetch a user's profile by Clerk ID (example)
// You might want to make this secure by requiring Clerk auth token
router.get('/profile/:clerkId', getUserProfile);

export default router;