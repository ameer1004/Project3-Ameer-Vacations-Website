import express, { Request, Response } from "express";
import { SQL } from "../databconfig";
import { onlyUsers } from "../helpers/onlyUsers";
import { addFollow, checkIfFollow, removeFollow } from "../queries/follow";
import { Vacation } from "../types";

export const vacationRouter = express.Router();

//------חופשות לפי הסדר בהם עוקב היוזר ------
vacationRouter.get("/", async (req: any, res: any) => {
  try {
    console.log("vacationRouter /, userId:", req.session.user_id);
    const AllVacations = (await SQL(
      `SELECT * FROM vacationdb.vacations
       ORDER BY dateGo DESC
      ;`
    )) as Vacation[];

    res.json(AllVacations);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// -----------------------------------------------
//------רק החופשות אחריהן עוקב היוזר ------
vacationRouter.get("/myVacations", onlyUsers, async (req: any, res: any) => {
  try {
    const vacations = await SQL(`
        SELECT vacations_of_users.* , vacations.* 
        FROM vacationdb.vacations_of_users
        inner join vacations on vacations_of_users.vacation_id = vacations.vacationID
         WHERE vacations_of_users.user_id = ${req.session.user_id}
        `);
    res.send(vacations);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// -----------------------------------------------
//------חופשה ספציפית ------
vacationRouter.get("/:id", onlyUsers, async (req: Request, res: Response) => {
  try {
    const vacations = (await SQL(`
        SELECT vacations_of_users.* , vacations.* 
        FROM vacationdb.vacations_of_users
        inner join vacations on vacations_of_users.vacation_id = vacations.vacationID
         WHERE vacationID= ${req.params.id}
        `)) as Vacation[];
    console.table(vacations); //showing nice table at the terminal
    res.send(vacations);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// -----------------------------------------------

//-----הוספת או הורדת מעקב לחופשה ------
vacationRouter.put("/follow/:id", onlyUsers, async (req: any, res: any) => {
  console.log("follow vacation");
  console.log(req.session);
  try {
    await SQL(`
            update vacations
               set followersNum = followersNum +1
                where vacationID= "${req.params.id}"
            `);
    try {
      await SQL(`
            INSERT INTO vacations_of_users
            (user_id, vacation_id)
            VALUES
            ("${req.session.user_id}","${req.params.id}")
            `);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
    res.send({ msg: "thanks for follow" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

vacationRouter.put("/unfollow/:id", onlyUsers, async (req: any, res: any) => {
  try {
    await SQL(`
        delete from  vacationdb.vacations_of_users
        where user_id="${req.session.user_id}" and vacation_id="${req.params.id}";
        `);
    try {
      await SQL(`
            update vacations
               set followersNum = followersNum  - 1
                where vacationID= "${req.params.id}"
            `);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
    res.send({ msg: "unfollow" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// ---------------------------------------
vacationRouter.put(
  "/toggle/:id",
  onlyUsers,
  async (req: Request, res: Response) => {
    try {
      const isFollow = await checkIfFollow(req.session.user_id!, req.params.id);
      if (isFollow) {
        await removeFollow(req.session.user_id!, req.params.id);
      } else {
        await addFollow(req.session.user_id!, req.params.id);
      }

      res.send({ msg: "toggle follow" });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
