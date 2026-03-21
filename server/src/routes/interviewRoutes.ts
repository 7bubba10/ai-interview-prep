import { Router } from "express";
import {authMiddleware} from '../middleware/authMiddleware'
import { interviewPrompt } from "../controllers/interviewController";

// Router Instance
const router = Router()

// Route
router.post('/generate', authMiddleware, interviewPrompt);

export default router