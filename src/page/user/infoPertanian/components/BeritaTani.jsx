import React from 'react';
// import LinesEllipsis from "react-lines-ellipsis";
import { FaClock } from 'react-icons/fa6';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import MainCard from '../../../../components/MainCard';
import { GetInfoTani } from '../../../../infrastucture';
const BeritaTani = () => {
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    GetInfoTani().then((data) => {
      setDatas(data.infotani);
      console.log(data);
    });
  }, []);
  return (
    <>
      {datas?.map((item, i) => (
        <MainCard row transparent center gap={0} key={i}>
          <MainCard width="80%" radius={0} gap={0}>
            <MainCard transparent row>
              <img
                className="h-min rounded-lg w-52"
                src={item?.fotoBerita}
                alt="With default placeholder"
              />
              <MainCard transparent noPadding>
                <h1 className="font-bold text-base md:text-2xl tracking-[1px] text-green-primary">
                  {item?.judul}
                </h1>
                <div className="flex flex-row space-x-5">
                  <div className="flex flex-row space-x-2 items-center justify-center">
                    <BsPersonCircle size={20} className="fill-gray-primary" />
                    <p className="text-xs sm:text-sm md:text-base text-gray-primary">
                      {item?.createdBy}
                    </p>
                  </div>
                  <div className="flex flex-row space-x-2 items-center justify-center">
                    <FaClock size={20} className="fill-gray-primary" />
                    <p className="text-xs sm:text-sm md:text-base text-gray-primary">
                      {item?.tanggal?.split('T')[0]}
                    </p>
                  </div>
                </div>
                <div className="text-justify text-sm md:text-base line-clamp-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item?.isi
                    }}></div>
                </div>
                <Link
                  to={'/info-pertanian/' + item.id}
                  className="text-sm md:text-base hover:text-green-600">
                  Read More &gt;{' '}
                </Link>
              </MainCard>
            </MainCard>
          </MainCard>
        </MainCard>
      ))}
    </>
  );
};

export default BeritaTani;
