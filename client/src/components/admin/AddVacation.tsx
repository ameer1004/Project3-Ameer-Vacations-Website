import React, { useState, FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface AddVacationProps {
  setupdate: CallableFunction;
}
const AddVacation: FC<AddVacationProps> = ({ setupdate }) => {
  const [description, setDescription] = useState(""); // תיאור חופשה
  const [picture, setPicture] = useState(""); //תמונה
  const [location, setLocation] = useState(""); // יעד החופשה
  const [price, setPrice] = useState(""); // מחיר החופשה
  const [dateGo, setDateGo] = useState(""); // תאריך הלוך
  const [dateBack, setDateBack] = useState(""); // תאריך חזור
  const [msg, setmsg] = useState("");

  const AddVac = async () => {
    console.log("in update");

    const response = await fetch(`http://localhost:4000/adminpage/add`, {
      method: "post",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      credentials: "include",
      body: JSON.stringify({
        description,
        location,
        picture,
        dateGo,
        dateBack,
        price,
      }),
    });
    const dataU = await response.json();
    console.log(dataU);
    if (dataU.err) {
      setmsg(dataU.err);
    } else {
      setmsg("added");
      setupdate((update: any) => !update);
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="headline">Add New Vacation</h1>
        <TextField
          sx={{ m: 0.5 }}
          id="outlined-basic"
          placeholder={location.toString()}
          label="Location"
          variant="outlined"
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          sx={{ m: 0.5 }}
          id="outlined-basic"
          placeholder={description.toString()}
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          sx={{ m: 0.5 }}
          id="outlined-basic"
          placeholder={picture.toString()}
          label="Picture"
          variant="outlined"
          onChange={(e) => setPicture(e.target.value)}
        />
        <TextField
          sx={{ m: 0.5 }}
          type="number"
          id="outlined-basic"
          placeholder={price.toString()}
          label="Price"
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          sx={{ m: 0.5, p: 2 }}
          type="date"
          id="outlined-basic"
          placeholder={dateGo}
          label="Go"
          variant="outlined"
          onChange={(e) => setDateGo(e.target.value)}
        />
        <TextField
          sx={{ m: 0.5, p: 2 }}
          type="date"
          id="outlined-basic"
          placeholder={dateBack}
          label="Back"
          variant="outlined"
          onChange={(e) => setDateBack(e.target.value)}
        />

        <Button variant="contained" onClick={AddVac}>
          Add Vacation
        </Button>
        <p>{msg}</p>
      </Box>
    </div>
  );
};
export default AddVacation;
