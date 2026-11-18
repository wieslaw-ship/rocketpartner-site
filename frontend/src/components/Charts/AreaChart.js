import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const AreaChart = (props) => {
  const [linedata, setLineData] = useState([
    0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    setLineData(props.data);
  }, [props.data]);

  const labels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  //   const getData = async () => {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + props.authCtx.token,
  //       },
  //     };
  //     const response = await fetch(
  //       "https://backend.dankyshop.pl/api/order/areachart/",
  //       requestOptions
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       setLineData(data);
  //     }
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Liczba użytkowników",
        data: linedata,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default AreaChart;
