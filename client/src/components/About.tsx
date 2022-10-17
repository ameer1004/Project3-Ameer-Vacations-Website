import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

export default function About() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 className="Header-about">My Vacation Project</h1>
        <p>Hello, I`m Ameer Emran. I am a Full Stack Developer.</p>
        <h3>This Project includes:</h3>
        <Typography variant="subtitle1" gutterBottom component="div">
          Node Js, Express,React Js, MySQL server, MUI Css, Scss, Session,
          Router...
        </Typography>
        <h3>What You Can Do?</h3>
        <Typography variant="subtitle1" gutterBottom component="div">
          <SentimentSatisfiedAltIcon /> Register or Login as a regular user:
          user can see all the vacations cards and put a follow star.
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          <SentimentSatisfiedAltIcon /> The order of the vacations in the page
          is by what the login user is following.
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          <SentimentSatisfiedAltIcon /> Furthermore, the user can see in a
          different page only the vacations he follows.
        </Typography>

        <Typography variant="subtitle1" gutterBottom component="div">
          <SentimentSatisfiedAltIcon /> Login as an Admin: admin can see all the
          vacations cards and he can edit or delete or add vacations.
        </Typography>

        <Typography variant="subtitle1" gutterBottom component="div">
          <SentimentSatisfiedAltIcon />
          Admin can see a Report of all the vacations that have more than one
          follower.
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          <SentimentSatisfiedAltIcon />
          The report represents the number of followers of each vacation
        </Typography>
      </Box>
    </div>
  );
}
