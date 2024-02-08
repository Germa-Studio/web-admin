// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import UserLayout from '../../../components/UserLayout';
import MainCard from '../../../components/MainCard';
import Slider from './components/Slider';
import KegiatanTani from './components/KegiatanTani';
import BeritaTani from './components/BeritaTani';

export default function index() {
  return (
    <UserLayout>
      <section className="pb-5 max-w-[90%] mx-auto">
        <MainCard row transparent center>
          <MainCard width="80%">
            {/* <Image src="/image/icon-sawah.png" alt="Icon Sawah" /> */}
            <Slider />
          </MainCard>
        </MainCard>
        <MainCard transparent center>
          <MainCard width="80%">
            <p className="text-center text-xl md:text-2xl font-bold text-green-primary ">
              ACARA KEGIATAN PERTANIAN
            </p>
            <KegiatanTani />
          </MainCard>
        </MainCard>
        <BeritaTani />
      </section>
    </UserLayout>
  );
}
