import { Image } from '@mantine/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { MdWhatsapp, MdAttachEmail, MdOutlineFax } from 'react-icons/md';
import { GiRotaryPhone } from 'react-icons/gi';
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// const socialMedia = [
//   {
//     name: 'Tiktok',
//     url: 'https://tiktok.com',
//     icon: '/icons/brand/tiktok.svg'
//   },
//   {
//     name: 'Facebook',
//     url: 'https://facebook.com',
//     icon: '/icons/brand/facebook.svg'
//   },
//   {
//     name: 'Instagram',
//     url: 'https://instagram.com',
//     icon: '/icons/brand/instagram.svg'
//   },
//   {
//     name: 'Twitter',
//     url: 'https://twitter.com',
//     icon: '/icons/brand/x-twitter.svg'
//   },
//   {
//     name: 'Youtube',
//     url: 'https://youtube.com',
//     icon: '/icons/brand/youtube.svg'
//   }
// ];

// const menuPage = [
//   {
//     name: 'FAQ',
//     url: '/faq'
//   },
//   {
//     name: 'Term of use',
//     url: '/term-of-use'
//   },
//   {
//     name: 'Privacy Policy',
//     url: '/privacy-policy'
//   },
//   {
//     name: 'About Us',
//     url: '/about-us'
//   },
//   {
//     name: 'Contact',
//     url: '/contact'
//   }
// ];

// const feature = [
//   {
//     name: 'Statistik Pertanian',
//     url: '/statistik-pertanian'
//   },
//   {
//     name: 'Data Pertanian',
//     url: '/data-pertanian'
//   },
//   {
//     name: 'Info Pertanian',
//     url: '/info-pertanian'
//   },
//   {
//     name: 'Toko Pertanian',
//     url: '/toko-pertanian'
//   },
//   {
//     name: 'Info Penyuluh',
//     url: '/info-penyuluh'
//   },
//   {
//     name: 'Hak Akses User',
//     url: '/hak-akses-user'
//   },
//   {
//     name: 'Riwayat Aktivitas',
//     url: '/riwayat-aktivitas'
//   },
//   {
//     name: 'List Data Operator',
//     url: '/list-data-operator'
//   }
// ];

// const GetFeatures = () => {
//   // round up the size
//   const size = Math.ceil(feature.length / 2);
//   return (
//     <div className="grid grid-cols-2">
//       <ol className="list-decimal mx-4">
//         {feature.slice(0, size).map((item, index) => {
//           return (
//             <li key={index}>
//               <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-bold">
//                 {item.name}
//               </a>
//             </li>
//           );
//         })}
//       </ol>
//       <ol className="list-decimal mx-4" start={size + 1}>
//         {feature.slice(size).map((item, index) => {
//           return (
//             <li key={index}>
//               <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-bold">
//                 {item.name}
//               </a>
//             </li>
//           );
//         })}
//       </ol>
//     </div>
//   );
// };

const Footer = ({ sidebarOpen, isFull = false }) => {
  return (
    <footer className="relative left-0 right-0 z-[999999999] w-full flex justify-end">
      <div
        className={clsx(
          !isFull
            ? sidebarOpen
              ? 'w-[calc(100%_-_320px)]'
              : 'w-[calc(100%_-_96.36px)]'
            : 'w-full',
          'bg-green-primary px-2 py-8'
        )}>
        <div className="flex flex-row justify-between text-white">
          <div className="flex flex-col w-[30%] justify-between mr-15">
            <Image src="/image/logo-navbar.png" alt="Logo Siketan" width={250} />
            <p className="text-[10px] text-justify">
              Sebuah inovasi website penyuluhan pertanian. Berbagi wawasan terbaru, praktik terbaik,
              dan solusi agraris. Antarmuka intuitif untuk akses mudah dan pembaruan informasi yang
              akurat. Mendorong pertumbuhan sektor pertanian melalui pendekatan digital yang
              terjangkau.
            </p>
          </div>
          <div className="flex flex-col w-[10%] space-y-3">
            <div className="text-sm font-bold">Bantuan</div>
            <ul className="text-xs">
              <li>FAQ</li>
              <li>Term of Use</li>
              <li>Privacy Policy</li>
              <li>About Us</li>
            </ul>
          </div>
          <div className="flex flex-col w-[32%] space-y-3">
            <div className="text-sm font-bold">Hubungan Kami</div>
            <div className="grid grid-rows-2 grid-flow-col gap-5">
              <div className="flex flex-row gap-3 items-center">
                <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                  <MdWhatsapp size={25} className="fill-green-primary" />
                </div>
                <div className="text-white text-xs">081252232644</div>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                  <GiRotaryPhone size={25} className="fill-green-primary" />
                </div>
                <div className="text-white text-xs">(0351) 749026</div>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                  <MdAttachEmail size={25} className="fill-green-primary" />
                </div>
                <div className="text-white text-xs">Pertanian@ngawikab.go.id</div>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                  <MdOutlineFax size={25} className="fill-green-primary" />
                </div>
                <div className="text-white text-xs">(0351) 749026</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[15%] space-y-3">
            <div className="text-sm">Kunjungi Kami</div>
            <div className="grid grid-rows-2 grid-flow-col w-fit gap-3">
              <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                <FaInstagram size={25} className="fill-green-primary" />
              </div>
              <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                <FaFacebook size={25} className="fill-green-primary" />
              </div>
              <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                <FaYoutube size={25} className="fill-green-primary" />
              </div>
              <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                <FaXTwitter size={25} className="fill-green-primary" />
              </div>
              <div className="w-8 h-8 bg-white rounded-md content-center flex items-center justify-center">
                <FaTiktok size={25} className="fill-green-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

Footer.propTypes = {
  sidebarOpen: PropTypes.bool,
  isFull: PropTypes.bool
};
