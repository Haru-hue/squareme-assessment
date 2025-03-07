"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Box, Stack } from "@chakra-ui/react";

export interface ChartData {
  month: string;
  amount: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false, // Removes grid lines on Y-axis
      },
    },
    y: {
      min: 100000, // Set minimum range to 100K
      max: 500000,
      grid: {
        display: false, // Removes grid lines on Y-axis
      },
      ticks: {
        stepSize: 100000, // Set step size to 100K
        callback: function (tickValue: string | number) {
          if (typeof tickValue === "number") {
            return tickValue / 1000 + "K"; // Convert to "K" format
          }
          return tickValue;
        },
      },
    },
  },
  width: 936,
  plugins: {
    // legend: {
    //   position: 'top' as const,
    // },
  },
};

const defaultLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getBarThickness = () => (window.innerWidth < 768 ? 14 : 20);

export function BarChart({ value }: { value: ChartData[] }) {
  const labels = value?.length > 0 ? value?.map(
    (item: { month: string; amount: number }) => item.month
  ) : defaultLabels;

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: value?.length > 0 ? value?.map((item: { amount: number }) => item.amount) : labels.map(() => faker.number.int({ min: 100000, max: 500000 })),
        backgroundColor: "#FFC145",
        barThickness: getBarThickness(),
        borderRadius: 2,
        categoryPercentage: 5,
      },
    ],
  };

  return (
    <>
      <Stack w='full' h='full' display={{ base: "flex", lg: "none" }}>
        <Bar
          options={options}
          data={data}
          width='100%'
          height='100%'
          style={{
            maxHeight: '20rem'
          }}
        />
      </Stack>
      <Stack w='full' h='full' maxW='full' display={{ base: "none", lg: "block" }}>
        <Bar
          options={options}
          data={data}
          width='100%'
          height='100%'
          style={{
            maxHeight: '17.5rem'
          }}
        />
      </Stack>
    </>
  );
}

