import React, { useEffect, useState } from "react";
import VacationCard from "./VacationCard";
import Box from "@mui/material/Box";
import Login from "./LoginPage";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import AddVacation from "./admin/AddVacation";
import { isAdmin } from "../utils/is-admin";


export default function Vacations() {
  const [vacationsArr, setvacationsArr] = useState([]);
  const [msg, setmsg] = useState("");
  const [update, setupdate] = useState(false);

  //------ popover-------
  //The Menu attribute - anchorEl, is responsible for passing the location of the button that called it. In this way, you should refer whenever there is a click.
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget as any);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // ------------------------

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/vacations`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.err) {
        setmsg(data.err);
      } else {
        setvacationsArr(data);
        setmsg("");
      }
    })();
  }, [update]);

  return (
    <div>
      <h1 className="Vacations-Admin">Vacations Website</h1>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          m: 2,
        }}
      >
        {msg.length > 1 ? (
          <Login />
        ) : (
          vacationsArr.map((vacation) => (
            <VacationCard
              key={Math.random()}
              setupdate={setupdate}
              vacation={vacation}
            />
          ))
        )}
        {isAdmin() ? (
          <Fab //A floating action button
            color="secondary"
            aria-label="add"
            sx={{
              position: "fixed",
              top: 80,
              right: 16,
            }}
          >
            <AddIcon aria-describedby={id} onClick={handleClick} />
          </Fab>
        ) : (
          <p></p>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <AddVacation setupdate={setupdate} />
        </Popover>
      </Box>
    </div>
  );
}
