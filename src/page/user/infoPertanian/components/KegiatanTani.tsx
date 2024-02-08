import React from 'react';
import { Image } from '@mantine/core';
import { IoCalendar } from 'react-icons/io5';
import { FaClock } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import MainCard from '../../../../components/MainCard';
import { GetEventTani } from '../../../../infrastucture';
const KegiatanTani = () => {
  const [width, setWidth] = React.useState(0);
  const carousel = React.useRef(null);
  const [datas, setDatas] = React.useState([
    {
      namaKegiatan: 'Kegiatan a',
      fotoKegiatan:
        'https://cdn.idntimes.com/content-images/community/2021/08/photo-1521841313031-a1485f842d34-08019ae11deb84b03f6baff2c7b6601c-9715d48c6ead6920e0b69419f17bd601.jpg',
      tanggalAcara: '10 Desember 2023',
      waktuAcara: '09:00-14:00',
      tempat: 'ruang tak terbatas'
    },
    {
      namaKegiatan: 'Kegiatan b',
      fotoKegiatan:
        'https://cdn.idntimes.com/content-images/community/2021/08/photo-1521841313031-a1485f842d34-08019ae11deb84b03f6baff2c7b6601c-9715d48c6ead6920e0b69419f17bd601.jpg',
      tanggalAcara: '10 Desember 2023',
      waktuAcara: '09:00-14:00',
      tempat: 'ruang tak terbatas'
    },
    {
      namaKegiatan: 'Kegiatan c',
      fotoKegiatan:
        'https://cdn.idntimes.com/content-images/community/2021/08/photo-1521841313031-a1485f842d34-08019ae11deb84b03f6baff2c7b6601c-9715d48c6ead6920e0b69419f17bd601.jpg',
      tanggalAcara: '10 Desember 2023',
      waktuAcara: '09:00-14:00',
      tempat: 'ruang tak terbatas'
    },
    {
      namaKegiatan: 'Kegiatan d',
      fotoKegiatan:
        'https://cdn.idntimes.com/content-images/community/2021/08/photo-1521841313031-a1485f842d34-08019ae11deb84b03f6baff2c7b6601c-9715d48c6ead6920e0b69419f17bd601.jpg',
      tanggalAcara: '10 Desember 2023',
      waktuAcara: '09:00-14:00',
      tempat: 'ruang tak terbatas'
    },
    {
      namaKegiatan: 'Kegiatan e',
      fotoKegiatan:
        'https://cdn.idntimes.com/content-images/community/2021/08/photo-1521841313031-a1485f842d34-08019ae11deb84b03f6baff2c7b6601c-9715d48c6ead6920e0b69419f17bd601.jpg',
      tanggalAcara: '10 Desember 2023',
      waktuAcara: '09:00-14:00',
      tempat: 'ruang tak terbatas'
    }
  ]);
  React.useEffect(() => {
    GetEventTani().then((data) => {
      setDatas(data.infotani);
    });
  }, []);
  // React.useEffect(() => {
  //   getEventTani().then((data)=>setDatas(data))
  // }, [])
  // const formatedDate = (date)=>{
  //   const currentDate = new Date(date)
  //   return currentDate.getDate() + " " + currentDate.toLocaleString('id', { month: 'long' }) + " " + currentDate.getFullYear();
  // }
  React.useEffect(() => {
    if (carousel.current)
      setWidth(
        (carousel.current as HTMLDivElement)?.scrollWidth -
          (carousel.current as HTMLDivElement)?.offsetWidth
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carousel.current]);
  return (
    <div>
      <MainCard row transparent noPadding center className="flex-row">
        <motion.div className="carousel overflow-hidden cursor-grab" ref={carousel}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel inline-flex">
            {datas?.map((data, i) => (
              <div key={i} className="p-5 max-w-none min-w-fit border-t-2">
                <p className="text-md md:text-xl font-bold text-green-primary mb-3">
                  {data?.namaKegiatan}
                </p>
                <div className="flex">
                  <Image
                    className="h-28 w-28 rounded-md"
                    src={data.fotoKegiatan}
                    alt={data?.namaKegiatan}
                  />
                  <div className="pl-3 flex flex-col space-y-1">
                    <div className="flex flex-row space-x-2">
                      <IoCalendar size={18} className="fill-green-secondary" />
                      <p className="text-sm">{data.tanggalAcara?.split('T')[0]}</p>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <FaClock size={18} className="fill-green-secondary" />
                      <p className="text-sm">{data.waktuAcara}</p>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <FaBuilding size={18} className="fill-green-secondary" />
                      <p className="text-sm">{data.tempat}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </MainCard>
    </div>
  );
};

export default KegiatanTani;
