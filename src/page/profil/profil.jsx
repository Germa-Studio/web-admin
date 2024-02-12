import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import DataInduk from './ubahDataInduk';
import DataProfil from './ubahDataProfil';
import DataKontak from './ubahDataKontak';
import DataPassword from './ubahDataPassword';
import DataBinaan from './ubahDataBinaan';
import { GetDetailProfile } from '../../infrastucture';

export default function Profil() {
  const menu =
    'w-[100%] p-5 rounded-lg bg-white text-start text-[#307B28] font-bold hover:bg-green-sidebar-hover transition-all duration-200 ease-in-out';
  const active =
    'w-[100%] p-5 rounded-lg bg-[#307B28] text-start text-white font-bold hover:bg-green-sidebar-hover transition-all duration-200 ease-in-out';
  const [filter, setFilter] = useState('induk');
  const handleClick = (e) => {
    setFilter(e.target.value);
  };

  const [data, setData] = useState()

  useEffect(() => {
    GetDetailProfile().then((data) => {
      setData(data);
    });
    console.log(data)
  }, []);

  return (
    <div>
      <div className="font-bold text-white mb-7">
        Dashboard / <span className="font-normal">Profile</span>
      </div>
      <div className="flex justify-between">
        <ul className="w-[30%] flex flex-col gap-2">
          <li>
            <button
              className={clsx(filter === 'induk' ? active : menu)}
              onClick={handleClick}
              value={'induk'}>
              Ubah Data Induk
            </button>
          </li>
          <li>
            <button
              className={clsx(filter === 'profil' ? active : menu)}
              onClick={handleClick}
              value={'profil'}>
              Ubah Data Profil
            </button>
          </li>
          <li>
            <button
              className={clsx(filter === 'kontak' ? active : menu)}
              onClick={handleClick}
              value={'kontak'}>
              Ubah Data Kontak
            </button>
          </li>
          <li>
            <button
              className={clsx(filter === 'password' ? active : menu)}
              onClick={handleClick}
              value={'password'}>
              Ubah Data Password
            </button>
          </li>
          <li>
            <button
              className={clsx(filter === 'binaan' ? active : menu)}
              onClick={handleClick}
              value={'binaan'}>
              Ubah Data Binaan
            </button>
          </li>
        </ul>
        <div className="w-[68%] p-7 h-fit bg-white rounded-lg">
          {filter === 'induk' && <DataInduk />}
          {filter === 'profil' && <DataProfil />}
          {filter === 'kontak' && <DataKontak />}
          {filter === 'password' && <DataPassword />}
          {filter === 'binaan' && <DataBinaan />}
        </div>
      </div>
    </div>
  );
}
