import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    user: string;
  }
}
const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded: any = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    );
    if (decoded) {
      req.user = decoded.id;
      next();
    } else {
      res.status(401).json({ error: true, message: "Un-Authorize User" });
    }
  } catch (err: any) {
    res.status(401).json({ error: true, message: "Un-Authorize User" });
  }
};
interface IauthUser {
  id: string;
  iat: number;
  exp: number;
}
export default authUser;
