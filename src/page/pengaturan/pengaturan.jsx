import { clsx } from 'clsx';
import { useState } from 'react';
import UbahLogo from './ubahLogo';
import UbahDesain from './ubahDesain';
import UbahFooter from './ubahFooter';
import UbahSocmed from './ubahSocmed';

export default function Pengaturan() {
  const menu =
    'w-[100%] p-5 rounded-lg bg-white text-start text-[#307B28] font-bold hover:bg-green-sidebar-hover transition-all duration-200 ease-in-out';
  const active =
    'w-[100%] p-5 rounded-lg bg-[#307B28] text-start text-white font-bold hover:bg-green-sidebar-hover transition-all duration-200 ease-in-out';
  const [filter, setFilter] = useState('logo');
  const handleClick = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div>
      <div className="font-bold text-white mb-7">
        Dashboard / <span className="font-normal">Pengaturan</span>
      </div>
      <div className="flex justify-between">
        <ul className="w-[30%] flex flex-col gap-2">
          <li className='w-[100%] p-5 rounded-lg bg-green-primary text-white text-lg font-bold'>
            PENGATURAN WEBSITE
          </li>
          <li>
            <button
              className={clsx(filter === 'logo' ? active : menu)}
              onClick={handleClick}
              value={'logo'}>
              Ubah Logo Website
            </button>
          </li>
          <li>
            <button
              className={clsx(filter === 'desain' ? active : menu)}
              onClick={handleClick}
              value={'desain'}>
              Ubah Desain Website
            </button>
          </li>
          <li>
            <button
              className={clsx(filter === 'footer' ? active : menu)}
              onClick={handleClick}
              value={'footer'}>
              Ubah Footer Website
            </button>
          </li>
          <li>
            <button
              className={clsx(filter === 'social media' ? active : menu)}
              onClick={handleClick}
              value={'social media'}>
              Ubah Social Media Website
            </button>
          </li>
        </ul>
        <div className="w-[68%]">
          <div className='w-[100%] p-5 rounded-lg bg-green-primary text-white text-lg font-bold capitalize mb-2'>
            Ubah {filter} Website
          </div>
          <div className='bg-white rounded-lg p-7'>
            {filter === 'logo' && <UbahLogo />}
            {filter === 'desain' && <UbahDesain />}
            {filter === 'footer' && <UbahFooter />}
            {filter === 'social media' && <UbahSocmed />}
          </div>
        </div>
      </div>
    </div>
  );
}
