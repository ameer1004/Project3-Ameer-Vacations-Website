import React from "react";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Card from "@mui/material/Card";
import { red } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateVacation from "./admin/UpdateVacation";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@mui/material/Popover";
import { isAdmin } from "../utils/is-admin";
import { Vacationtype } from "../utils/Types";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function VacationCard({
  vacation,
  setupdate,
}: {
  vacation: Vacationtype;
  setupdate: CallableFunction;
}) {
  //------ popover-------
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
  const follow = async () => {
    await fetch(
      `http://localhost:4000/vacations/toggle/${vacation.vacationID}`,
      {
        method: "put",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }
    );
    setupdate((up: string) => !up);
  };

  const deleteVac = async () => {
    let text = `Are you sure to delete one vacation in ${vacation.location}`;
    if (window.confirm(text)) {
      await fetch(
        `http://localhost:4000/adminpage/delete/${vacation.vacationID}`,
        {
          method: "delete",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          credentials: "include",
        }
      );
      setupdate((up: string) => !up);
    } else {
      text = "You canceled!";
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: 350,
          m: 2,
          padding: 1,
          position: "relative",
        }}
      >
        <div className="vinfo">
          {isAdmin() ? (
            <span>
              <EditIcon aria-describedby={id} onClick={handleClick} />
              <DeleteIcon onClick={deleteVac} />
            </span>
          ) : (
            <span>
              <Checkbox
                {...label}
                onClick={follow}
                checked={!!vacation.isFollowing}
                sx={{ color: red[500] }}
                icon={
                  <Badge
                    badgeContent={vacation.followersNum}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    color="primary"
                  >
                    <StarBorderIcon />
                  </Badge>
                }
                checkedIcon={
                  <Badge
                    badgeContent={vacation.followersNum}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    color="primary"
                  >
                    <StarIcon sx={{ color: red[500] }} />
                  </Badge>
                }
              />
            </span>
          )}

          <h1>{vacation.location}</h1>
          <div className="cardImg">
            <img src={vacation.picture} alt={vacation.description} />
          </div>
          <h1>{vacation.description}</h1>
          <p>from: {new Date(vacation.dateGo).toLocaleDateString("he-IL")} </p>
          <p>to: {new Date(vacation.dateBack).toLocaleDateString("he-IL")} </p>
          <p>{vacation.price}$</p>
        </div>
      </Card>
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
        <UpdateVacation vacation={vacation} setupdate={setupdate} />
      </Popover>
    </div>
  );
}
