import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { TSummaryKategoriResponse } from '../../../../types/statistik';

ChartJS.register(ArcElement, Tooltip, Legend);

const dummyData = {
  labels: ['HOLTIKULTURA', 'TANAMAN PANGAN', 'TANAMAN PERKEBUNAN'],
  datasets: [
    {
      label: 'Jumlah Komoditas',
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1
    }
  ]
};

export default function PieChart({ apiData }: { apiData: TSummaryKategoriResponse[] }) {
  const [data, setData] = React.useState(dummyData);
  useEffect(() => {
    setData((prev) => ({
      labels: apiData.map((item) => item.kategori),
      datasets: [
        {
          ...prev.datasets[0],
          data: apiData.map((item) => item.count)
        }
      ]
    }));
  }, [apiData]);
  return <Pie data={data} />;
}
