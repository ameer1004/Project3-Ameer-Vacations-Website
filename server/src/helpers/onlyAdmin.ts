import { NextFunction, Request, Response } from "express";

export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.username) {
    return res.status(401).send({ err: "you need to log in" });
  }
  if (req.session.isAdmin == 0) {
    return res.status(401).send({ err: "only for admin" });
  }
  next();
};
