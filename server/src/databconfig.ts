import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vacationdb",
});

con.connect((err: String) => {
  if (err) {
    return console.log("😡", err);
  }
  console.log("connected to mysql server 😊");
});

export const SQL = (q: any) => {
  return new Promise((resolve, reject) => {
    con.query(q, (err: String, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
