import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TKomoditasResponse } from '../../../../types/statistik';
import { ResponseApiToDataChart } from '../../../../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      }
    }
  }
};

export default function LineChart({
  apiData,
  month,
  year
}: {
  apiData: TKomoditasResponse[];
  month: number;
  year: number;
}) {
  const [padiKonvensional, setPadiKonvensional] = React.useState<number[]>([]);
  const [padiRamahLingkungan, setPadiRamahLingkungan] = React.useState<number[]>([]);
  const [padiOrganik, setPadiOrganik] = React.useState<number[]>([]);
  const [jagung, setJagung] = React.useState<number[]>([]);
  const [kedelai, setKedelai] = React.useState<number[]>([]);
  const [ubiJalar, setUbiJalar] = React.useState<number[]>([]);
  const [ubiKayu, setUbiKayu] = React.useState<number[]>([]);
  const [kacangTanah, setKacangTanah] = React.useState<number[]>([]);
  const [kacangHijau, setKacangHijau] = React.useState<number[]>([]);

  const [labels, setLabels] = React.useState<string[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const selectedDate = new Date(year, month, 0);

    setLabels(
      Array.from(
        {
          length:
            currentDate > selectedDate ? new Date(year, month, 0).getDate() : new Date().getDate()
        },
        (_, i) => (i + 1).toString()
      )
    );
  }, [year, month]);

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
    datasets: []
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      labels: labels
    }));
  }, [labels]);

  useEffect(() => {
    setPadiKonvensional(ResponseApiToDataChart(apiData ?? [], 'PADI KONVENSIONAL', year, month));
    setPadiRamahLingkungan(
      ResponseApiToDataChart(apiData ?? [], 'PADI RAMAH LINGKUNGAN', year, month)
    );
    setPadiOrganik(ResponseApiToDataChart(apiData ?? [], 'PADI ORGANIK', year, month));
    setJagung(ResponseApiToDataChart(apiData ?? [], 'JAGUNG', year, month));
    setKedelai(ResponseApiToDataChart(apiData ?? [], 'KEDELAI', year, month));
    setUbiJalar(ResponseApiToDataChart(apiData ?? [], 'UBI JALAR', year, month));
    setUbiKayu(ResponseApiToDataChart(apiData ?? [], 'UBI KAYU', year, month));
    setKacangTanah(ResponseApiToDataChart(apiData ?? [], 'KACANG TANAH', year, month));
    setKacangHijau(ResponseApiToDataChart(apiData ?? [], 'KACANG HIJAU', year, month));
  }, [apiData, month, year]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      datasets: [
        {
          label: 'Padi Konvensional',
          data: padiKonvensional,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.5
        },
        {
          label: 'Padi Ramah Lingkungan',
          data: padiRamahLingkungan,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.5
        },
        {
          label: 'Padi Organik',
          data: padiOrganik,
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.5)',
          tension: 0.5
        },
        {
          label: 'Jagung',
          data: jagung,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.5
        },
        {
          label: 'Kedelai',
          data: kedelai,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          tension: 0.5
        },
        {
          label: 'Ubi Jalar',
          data: ubiJalar,
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          tension: 0.5
        },
        {
          label: 'Ubi Kayu',
          data: ubiKayu,
          borderColor: 'rgb(201, 203, 207)',
          backgroundColor: 'rgba(201, 203, 207, 0.5)',
          tension: 0.5
        },
        {
          label: 'Kacang Tanah',
          data: kacangTanah,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          tension: 0.5
        },
        {
          label: 'Kacang Hijau',
          data: kacangHijau,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.5
        }
      ]
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
    kacangHijau
  ]);
  return <Line options={options} data={data} />;
}
