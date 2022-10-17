import { NextFunction, Request, Response } from "express";

export const onlyUsers = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.username) {
    return res.status(401).send({ err: "you need to log in" });
  }
  next();
};
