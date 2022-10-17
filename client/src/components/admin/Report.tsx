import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Box from "@mui/material/Box";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface Vacation {
  vacationID: number;
  description: string;
  location: string;
  picture: string;
  dateGo: string;
  dateBack: string;
  price: number;
  followersNum: number;
}

export default function Report() {
  const [vacations, setVacations] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/adminpage/report`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.err) {
        setMsg(data.err);
      } else {
        setVacations(data);
        setMsg("");
      }
    })();
  }, []);

  return (
    <div>
      {msg.length > 1 ? (
        <p>{msg}</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            m: 2,
            p: 2,
          }}
        >
          <Bar
            data={{
              labels: vacations.map((v: Vacation) => v.location),
              datasets: [
                {
                  label: "Followers number",
                  data: vacations.map((v: Vacation) => v.followersNum),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={300}
            width={500}
          />
        </Box>
      )}
    </div>
  );
}
