import cors from "cors";
import express, { Request, Response } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";


import { adminRouter } from "./Routes/admin-router";
import { userRouter } from "./Routes/users";
import { vacationRouter } from "./Routes/vacations";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "Ameeremranslxeman",
    name: "ameer",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, //year
    },
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send({
    msg: "work successfuly",
    docsUrl: "http://localhost:4000/vacations",
  });
});

app.use("/adminpage", adminRouter);
app.use("/users", userRouter);
app.use("/vacations", vacationRouter);

app.listen(PORT, () => console.log(`rocking ${PORT}`));
