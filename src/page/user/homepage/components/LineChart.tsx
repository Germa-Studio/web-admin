import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { GetStatistikTanamanPetani } from "../../../../infrastucture/statistic";
import { EKomoditas, TKomoditasResponse } from "../../../../types/statistik";
import { ResponseApiToDataChart } from "../../../../utils/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export default function LineChart({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  // data from api
  const [padiKonvensional, setPadiKonvensional] = React.useState<number[]>([]);
  const [padiRamahLingkungan, setPadiRamahLingkungan] = React.useState<
    number[]
  >([]);
  const [padiOrganik, setPadiOrganik] = React.useState<number[]>([]);
  const [jagung, setJagung] = React.useState<number[]>([]);
  const [kedelai, setKedelai] = React.useState<number[]>([]);
  const [ubiJalar, setUbiJalar] = React.useState<number[]>([]);
  const [ubiKayu, setUbiKayu] = React.useState<number[]>([]);
  const [kacangTanah, setKacangTanah] = React.useState<number[]>([]);
  const [kacangHijau, setKacangHijau] = React.useState<number[]>([]);

  const [labels] = React.useState<string[]>(
    Array.from(
      {
        length:
          month === new Date().getMonth() + 1 &&
          year === new Date().getFullYear()
            ? new Date().getDate()
            : new Date(year, month, 0).getDate(),
      },
      (_, i) => (i + 1).toString()
    )
  );
  // end of data from api

  const [data, setData] = React.useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
    }[];
  }>({
    labels: labels,
    datasets: [],
  });

  useEffect(() => {
    GetStatistikTanamanPetani(month, year).then((res) => {
      setPadiKonvensional(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["PADI KONVENSIONAL"],
          year,
          month
        )
      );
      setPadiRamahLingkungan(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["PADI RAMAH LINGKUNGAN"],
          year,
          month
        )
      );
      setPadiOrganik(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["PADI ORGANIK"],
          year,
          month
        )
      );
      setJagung(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["JAGUNG"],
          year,
          month
        )
      );
      setKedelai(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["KEDELAI"],
          year,
          month
        )
      );
      setUbiJalar(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["UBI JALAR"],
          year,
          month
        )
      );
      setUbiKayu(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["UBI KAYU"],
          year,
          month
        )
      );
      setKacangTanah(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["KACANG TANAH"],
          year,
          month
        )
      );
      setKacangHijau(
        ResponseApiToDataChart(
          res?.data.statistik ?? [],
          EKomoditas["KACANG HIJAU"],
          year,
          month
        )
      );
    });
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "Padi Konvensional",
          data: padiKonvensional,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.5,
        },
        {
          label: "Padi Ramah Lingkungan",
          data: padiRamahLingkungan,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.5,
        },
        {
          label: "Padi Organik",
          data: padiOrganik,
          borderColor: "rgb(255, 205, 86)",
          backgroundColor: "rgba(255, 205, 86, 0.5)",
          tension: 0.5,
        },
        {
          label: "Jagung",
          data: jagung,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.5,
        },
        {
          label: "Kedelai",
          data: kedelai,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          tension: 0.5,
        },
        {
          label: "Ubi Jalar",
          data: ubiJalar,
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          tension: 0.5,
        },
        {
          label: "Ubi Kayu",
          data: ubiKayu,
          borderColor: "rgb(201, 203, 207)",
          backgroundColor: "rgba(201, 203, 207, 0.5)",
          tension: 0.5,
        },
        {
          label: "Kacang Tanah",
          data: kacangTanah,
          borderColor: "rgb(255, 159, 64)",
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          tension: 0.5,
        },
        {
          label: "Kacang Hijau",
          data: kacangHijau,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.5,
        },
      ],
    }));
  }, [
    padiKonvensional,
    padiRamahLingkungan,
    padiOrganik,
    jagung,
    kedelai,
    ubiJalar,
    ubiKayu,
    kacangTanah,
    kacangHijau,
  ]);
  return <Line options={options} data={data} />;
}
