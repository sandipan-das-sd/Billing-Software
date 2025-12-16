import express from 'express';
import { register, Login, getUsers,logout } from '../auth/auth.js';
import { protect } from '../middlewire/protect.js';

export const authrouter = express.Router();

authrouter.post('/register', register);
authrouter.post('/login', Login);
authrouter.get('/get-users', protect, getUsers);
authrouter.post('/logout', protect, logout);

