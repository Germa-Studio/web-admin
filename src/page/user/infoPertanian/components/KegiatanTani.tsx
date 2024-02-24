import React from 'react';
import { Button, Image, Modal } from '@mantine/core';
import { IoCalendar } from 'react-icons/io5';
import { FaClock } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import MainCard from '../../../../components/MainCard';
import { GetEventTani } from '../../../../infrastucture';
import { useDisclosure } from '@mantine/hooks';
import ShareModal from '../../../../components/ShareModal';
import { FaShareAlt } from 'react-icons/fa';
import { TEventTani } from '../../../../types/eventtani';

const KegiatanTani = () => {
  const [width, setWidth] = React.useState(0);
  const [shareUrl, setShareUrl] = React.useState('');
  const [title, setTitle] = React.useState('');

  const [opened, { open, close }] = useDisclosure(false);

  const carousel = React.useRef(null);
  const [datas, setDatas] = React.useState<TEventTani[] | null>(null);
  React.useEffect(() => {
    GetEventTani().then((data) => {
      console.log('data', { data });
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
      <Modal opened={opened} onClose={close} title="Bagikan Info Pertanian" centered>
        <ShareModal url={shareUrl} title={title} />
      </Modal>
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
                    <div className="border w-fit rounded-lg border-blue-300">
                      <Button
                        variant="light"
                        onClick={() => {
                          open();
                          setTitle(
                            `Nama\t: ${data.namaKegiatan}\nWaktu\t: ${new Date(
                              data.tanggalAcara
                            ).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}\nTempat\t: ${data.tempat}`
                          );
                          setShareUrl(window.location.origin + '/info-pertanian');
                        }}>
                        <FaShareAlt />
                      </Button>
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
