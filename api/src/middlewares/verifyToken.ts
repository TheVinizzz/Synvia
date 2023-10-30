import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const secretPassword = process.env.SECRET_KEY_JWT || ''
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ message: 'No token provided' });
    jwt.verify(token, secretPassword, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      req.body.userId = decoded.id;
      next();
    });
}

export default verifyToken