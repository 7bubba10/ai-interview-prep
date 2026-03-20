import { Router } from "express";
import { register, login } from "../controllers/authController";

// Router Instance
const router = Router();

// Routes
router.post('/register', register);

router.post('/login', login);

export default router;