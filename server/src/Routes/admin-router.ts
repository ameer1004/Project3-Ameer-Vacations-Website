import express, { Request, Response } from "express";
import { onlyAdmin } from "../helpers/onlyAdmin";
import { SQL } from "../databconfig";
import fs from "fs";
import path from "path";
import multer from "multer";

export const adminRouter = express.Router();

// --- דוחות חופשה וכמות עוקבים----
adminRouter.get("/report", onlyAdmin, async (req: Request, res: Response) => {
  try {
    const forreport = await SQL(`
        SELECT * FROM vacationdb.vacations
        where followersNum > 0
        `);
    console.table(forreport); //showing nice table at the terminal
    res.send(forreport);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// ---------------------------
//----הוספת חופשה---
adminRouter.post("/add", onlyAdmin, async (req: Request, res: Response) => {
  try {
    const { description, location, picture, dateGo, dateBack, price } =
      req.body;
    if (
      !location ||
      !description ||
      !picture ||
      !dateGo ||
      !dateBack ||
      !price
    ) {
      return res.send({ err: "missing information" });
    }
    await SQL(`
        INSERT INTO vacationdb.vacations
         (description, location, picture, dateGo, dateBack, price )
         VALUES
        ("${description}","${location}","${picture}","${dateGo}","${dateBack}",${price})        
            `);
    res.send({ msg: "added vac" });
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
});

const finalDir = path.join(__dirname, "./uploads/");
const tempDir = path.join(finalDir, "temp");
const upload = multer({ dest: tempDir });

adminRouter.post("/upload", upload.single("image"), (req: any, res) => {
  console.log(req.body);
  console.log(req.file.fieldname); // image
  console.log(req.file.originalname); // my-image.png
  console.log(req.file.path); // temporary path

  fs.renameSync(req.file.path, path.join(finalDir, req.file.originalname));
  res.send("success");
});
//----עריכת חופשה---
adminRouter.put(
  "/update/:id",
  onlyAdmin,
  async (req: Request, res: Response) => {
    try {
      const { description, location, picture, dateGo, dateBack, price } =
        req.body;

      await SQL(`UPDATE vacations
        SET description="${description}", location="${location}",
        picture="${picture}", price=${price}
        WHERE vacationID=${req.params.id}`);

      if (dateGo) {
        await SQL(`UPDATE vacations
            SET dateGo="${dateGo}"
            WHERE vacationID=${req.params.id}`);
      }
      if (dateBack) {
        await SQL(`UPDATE vacations
            SET dateBack="${dateBack}"
            WHERE vacationID=${req.params.id}`);
      }

      res.send({ msg: "updated vac" });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
//----מחיקת חופשה---
adminRouter.delete(
  "/delete/:id",
  onlyAdmin,
  async (req: Request, res: Response) => {
    try {
      await SQL(`
        DELETE FROM vacationdb.vacations_of_users
        WHERE vacation_id=${req.params.id} ; 
         `);

      await SQL(`
        DELETE FROM vacationdb.vacations
        WHERE vacationID=${req.params.id} ;   
         `);
      res.send({ msg: "deleted vac" });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
