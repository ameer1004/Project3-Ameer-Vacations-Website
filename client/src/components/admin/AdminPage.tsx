import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";

export default function AdminPage() {
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
        <h1 className="headline">Admin Page</h1>
        <Typography variant="subtitle1" gutterBottom component="div">
          You can delete or edit vacations, In addition you can add a new
          vacation by clicking on the (+) button at "All Vacations" page
        </Typography>
        <ButtonGroup
          sx={{ m: 3 }}
          variant="contained"
          size="large"
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button>
            <Link
              to="/report"
              style={{ textDecoration: "none", color: "white" }}
            >
              Report
            </Link>
          </Button>
          <Button>
            <Link
              to="/Vacations"
              style={{ textDecoration: "none", color: "white" }}
            >
              All Vacations
            </Link>
          </Button>
        </ButtonGroup>
        <Typography variant="subtitle1" gutterBottom component="div">
          The report represents the number of followers of each vacation
        </Typography>
      </Box>
    </div>
  );
}
