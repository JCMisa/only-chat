import express from 'express';
import { getAllUser, getUserById } from '../controllers/UserController.js';

const router = express.Router();

// Route to get all users (protected by auth middleware)
router.get('/get-all', getAllUser);

// to get user by passed clerkId
router.get('/:clerkId', getUserById);

export default router;