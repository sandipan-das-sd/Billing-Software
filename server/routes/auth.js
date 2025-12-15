import express from 'express';
import { register, Login, getUsers } from '../auth/auth';
import { protect } from '../middlewire/protect';

export const authrouter = express.Router();

authrouter.post('/register', register);
authrouter.post('/login', Login);
authrouter.get('/get-users', protect, getUsers);
authrouter.post('/logout', protect, logout);

