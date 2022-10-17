import React, { useEffect, useState } from "react";
import Card from "./VacationCard";
import Box from "@mui/material/Box";

export default function MyVacations() {
  const [vacationsArr, setvacationsArr] = useState([]);
  const [update, setupdate] = useState(false);
  const [msg, setmsg] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/vacations/myvacations`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.err) {
        setmsg(data.err);
      } else {
        setvacationsArr(data);
        if (data.length < 1) {
          setmsg("You don`t follow any vacation");
        } else {
          setmsg("");
        }
      }
    })();
  }, [update]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <p>{msg}</p>
        {vacationsArr.map((vacation) => (
          <Card key={Math.random()} setupdate={setupdate} vacation={vacation} />
        ))}
      </Box>
    </div>
  );
}
