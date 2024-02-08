import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { FaClock } from 'react-icons/fa6';
import { BsPersonCircle } from 'react-icons/bs';
import { IoCaretBackCircle } from 'react-icons/io5';
import { Image } from '@mantine/core';
import MainCard from '../../../components/MainCard';
import UserLayout from '../../../components/UserLayout';
import { GetInfoTaniById } from '../../../infrastucture';

export default function Berita() {
  const [datas, setDatas] = React.useState({
    judul: '',
    fotoBerita: '',
    createdBy: '',
    tanggal: '',
    isi: ''
  });
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    if (id) {
      GetInfoTaniById(id).then((data) => {
        setDatas(data.infotani);
      });
    }
  }, [id]);

  return (
    <UserLayout>
      <MainCard row transparent center gap="0" className="min-h-screen">
        <MainCard width="80%" radius="0" gap="0">
          <Link to="/info-pertanian">
            <IoCaretBackCircle size={40} className="fill-green-primary" />
          </Link>
          <MainCard transparent row>
            <Image
              className="h-min rounded-lg w-52"
              src={datas?.fotoBerita}
              alt="With default placeholder"
            />
            <MainCard transparent noPadding>
              <h1 className="font-bold text-base md:text-2xl tracking-[1px] text-green-primary">
                {datas?.judul}
              </h1>
              <div className="flex flex-row space-x-5">
                <div className="flex flex-row space-x-2 items-center justify-center">
                  <BsPersonCircle size={20} className="fill-gray-primary" />
                  <p className="text-xs sm:text-sm md:text-base text-gray-primary">
                    {datas?.createdBy}
                  </p>
                </div>
                <div className="flex flex-row space-x-2 items-center justify-center">
                  <FaClock size={20} className="fill-gray-primary" />
                  <p className="text-xs sm:text-sm md:text-base text-gray-primary">
                    {datas?.tanggal?.split('T')[0]}
                  </p>
                </div>
              </div>
              <div className="text-justify">
                <div
                  dangerouslySetInnerHTML={{
                    __html: datas?.isi
                  }}></div>
              </div>
            </MainCard>
          </MainCard>
        </MainCard>
      </MainCard>
    </UserLayout>
  );
}
