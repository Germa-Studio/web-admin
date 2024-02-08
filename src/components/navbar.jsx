import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Logout } from '../infrastucture';
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClik = () => {
    Logout();
  };

  return (
    <nav
      className={`w-full shadow fixed top-0 left-0 right-0 z-[99] px-6 md:px-0 ${isScrolled ? 'bg-white' : ''}`}>
      <div className="justify-between bg-white mx-auto lg:max-w-7xl md:items-center md:flex">
        <div className="bg-white">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <img
                className="hidden md:block"
                src="/image/logo-navbar.png"
                width={200}
                alt="Logo"
              />
              <img className="md:hidden" src="/image/logo-navbar.png" width={150} alt="Logo" />
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-600 focus:border-4"
                onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'}`}>
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {token && (
                <>
                  <li className="text-green-primary">
                    <a href="/data-tani/rekap-petani">
                      <button
                        onClick={() => toggleDropdown('data-tani')}
                        className="hover:underline underline-offset-auto">
                        Data Tani
                      </button>
                    </a>
                  </li>
                  <li className="text-green-primary">
                    <button
                      onClick={() => toggleDropdown('info-tani')}
                      className="hover:underline underline-offset-auto">
                      Info Tani
                    </button>
                    {activeDropdown === 'info-tani' && (
                      <ul className="absolute mt-2 py-2 w-36 bg-white border rounded-md shadow-lg px-2">
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/info-tani">Berita / Artikel Tani</a>
                        </li>
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/info-tani/tambah">Tambah Berita / Artikel Tani</a>
                        </li>
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/event-tani/tambah">Tambah Event Tani</a>
                        </li>
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/info-tani/event-tani">Lihat Semua Event</a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="text-green-primary">
                    <button
                      onClick={() => toggleDropdown('toko-tani')}
                      className="hover:underline underline-offset-auto">
                      Toko Tani
                    </button>
                    {activeDropdown === 'toko-tani' && (
                      <ul className="absolute mt-2 py-2 w-36 bg-white border rounded-md shadow-lg px-2">
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/toko-tani/tambah">Tambah Daftar Penjual</a>
                        </li>
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/toko-tani">Produk Tani</a>
                        </li>
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/toko-tani/produk-penyuluh">Produk Penyuluh</a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="text-green-primary">
                    <button
                      onClick={() => toggleDropdown('data-penyuluh')}
                      className="hover:underline underline-offset-auto">
                      Data Penyuluh
                    </button>
                    {activeDropdown === 'data-penyuluh' && (
                      <ul className="absolute mt-2 py-2 w-36 bg-white border rounded-md shadow-lg px-2">
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/data-penyuluh/tambah">Tambah Data Penyuluh</a>
                        </li>
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/data-penyuluh/presensi-kehadiran">Laporan Harian</a>
                        </li>
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/data-penyuluh/jurnal-kegiatan">Jurnal Kegiatan</a>
                        </li>
                        {/* <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/data-penyuluh/riwayat-chat">
                            Data Riwayat Chat
                          </a>
                        </li> */}
                        <li className="text-green-primary hover:text-green-primary hover:font-bold">
                          <a href="/data-penyuluh/rekap-penyuluh">Rekap Data Penyuluh</a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="text-white0 px-5 py-2 rounded-md box-shadow">
                    <a href="/notification">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="text-gray-500 hover:text-green-primary cursor-pointer"
                      />
                    </a>
                  </li>
                </>
              )}
              {token ? (
                <li
                  className="text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-md box-shadow"
                  onClick={handleClik}>
                  <a href="/login" className="pr-3">
                    Logout
                  </a>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </li>
              ) : (
                <li className="text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-md box-shadow">
                  <a href="/login">Login</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
