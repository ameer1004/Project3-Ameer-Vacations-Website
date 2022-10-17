import express, { Request, Response } from "express";
import { SQL } from "../databconfig";
import { hash } from "../helpers/hash";
import { User } from "../types";
export const userRouter = express.Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  try {
    const { firstName, lastName, username, password } = req.body;

    if (!username || !password || !firstName || !lastName) {
      return res
        .status(400)
        .send({ err: "make sure you enterd all the fields" });
    } else if (!passwordRegex.test(password)) {
      return res.status(400).send({
        err: "Password must be minimum 8 characters and include at least 1 letter, 1 number and 1 special character!",
      });
    }
    const hashedPassword = hash(password);
    const user = await SQL(`
          INSERT INTO users
          (firstName, lastName, username, password, isAdmin)
           VALUES
          ("${firstName}","${lastName}","${username}","${hashedPassword}", 0)
        `);

    req.session.username = username;
    res.json({ msg: `Welcome ${username}`, user: req.body });
  } catch (error) {
    console.log(error);
    res.send({ err: "username is taken / error 500", error });
  }
});

userRouter.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;

  const hashedPassword = hash(password);

  try {
    if (!username || !password) {
      return res.status(400).send({ err: "make sure you enterd all fields" });
    }

    const [user] = (await SQL(`
             SELECT * FROM vacationdb.users
             where username="${username}" and password= "${hashedPassword}";
        `)) as User[];
    if (!user) {
      return res.status(400).send({ err: "wrong username / password" });
    }

    req.session.username = username;
    req.session.isAdmin = user.isAdmin;
    req.session.user_id = user.userID;
    res.send({ msg: "user logged in, welcome " + username, user });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
userRouter.delete("/logout", (req: any, res: any) => {
  req.session.destroy();
  res.send({ msg: "bye bye" });
});
