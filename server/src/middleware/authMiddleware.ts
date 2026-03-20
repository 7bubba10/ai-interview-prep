import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

// Extend Express's Request type to include the decoded JWT payload
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware to protect routes by validating the Bearer token in the Authorization header
export const authMiddleware = (req:Request, res:Response, next:NextFunction) =>{

    // Extract token from "Authorization: Bearer <token>" header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    // Reject requests with no token
    if (!token) return res.status(401).json({message: 'Invalid'});

    // Verify the token signature and decode the payload
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach decoded user payload to the request for downstream handlers
    req.user = verifiedToken;
    next();

}
