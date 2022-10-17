import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await fetch("http://localhost:4000/users/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    const data = await response.json();
    if (data.err) {
      setmsg(data.err);
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    }
    console.log(data);
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
          background: "#80cbc4",
          height: "91vh",
        }}
      >
        <h1 className="header-rl">Login Page</h1>

        <TextField
          sx={{ m: 1 }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setusername(e.target.value)}
        />

        <TextField
          sx={{ m: 1 }}
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setpassword(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ m: 4 }}
          color="secondary"
          onClick={handleClick}
        >
          Login
        </Button>
        <p>{msg}</p>
        <p className="para-register">
          Don`t you have an account?{" "}
          <Link className="para-register" to="/register">
            Please Click here to register!
          </Link>
        </p>
      </Box>
    </div>
  );
}
