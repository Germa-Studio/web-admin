import React from 'react';
import MainCard from '../../../components/MainCard';
import UserLayout from '../../../components/UserLayout';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import Tabel from './components/Tabel';
import { GetStatistikTanamanPetani } from '../../../infrastucture/statistic';
import { TTanamanPetani } from '../../../types/tanamanPetani';
import { TKomoditasResponse, TSummaryKategoriResponse } from '../../../types/statistik';
import { NumberInput, Select } from '@mantine/core';

export default function Homepage() {
  const [time, setTime] = React.useState(new Date());
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [respData, setRespData] = React.useState<
    | {
        latest: TTanamanPetani[];
        statistik: TKomoditasResponse[];
        summary: TSummaryKategoriResponse[];
      }
    | undefined
  >(undefined);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    GetStatistikTanamanPetani(month, year).then((res) => {
      setRespData(res?.data);
    });
  }, [month, year]);
  return (
    <UserLayout>
      <section className="pb-5 max-w-[90%] mx-auto">
        <div className="container mb-8 px-20">
          <h1 className="text-xl text-center font-bold">Statistik Pertanian</h1>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Select
                data={[
                  { label: 'Januari', value: '1' },
                  { label: 'Februari', value: '2' },
                  { label: 'Maret', value: '3' },
                  { label: 'April', value: '4' },
                  { label: 'Mei', value: '5' },
                  { label: 'Juni', value: '6' },
                  { label: 'Juli', value: '7' },
                  { label: 'Agustus', value: '8' },
                  { label: 'September', value: '9' },
                  { label: 'Oktober', value: '10' },
                  { label: 'November', value: '11' },
                  { label: 'Desember', value: '12' }
                ]}
                value={month.toString()}
                onChange={(e) => {
                  setMonth(parseInt(e ?? ''));
                }}
              />
              <NumberInput
                value={year}
                onChange={(e) => {
                  setYear(Number(e));
                }}
                min={2021}
                max={new Date().getFullYear()}
              />
            </div>
            <h5>
              {time.toLocaleString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              })}
            </h5>
          </div>
        </div>
        <MainCard transparent noPadding>
          <MainCard transparent noPadding row center>
            <MainCard transparent width="30%">
              <h2 className="text-center">Musim Tanam Seluruh Komoditas</h2>
              <PieChart apiData={respData?.summary ?? []} />
            </MainCard>
            <MainCard transparent width="60%">
              <h2 className="text-center">STATISTIK PERTUMBUHAN PERTANIAN</h2>
              <LineChart apiData={respData?.statistik ?? []} month={month} year={year} />
            </MainCard>
          </MainCard>
          <MainCard transparent noPadding row center>
            <Tabel apiData={respData?.latest ?? []} />
          </MainCard>
        </MainCard>
      </section>
    </UserLayout>
  );
}
