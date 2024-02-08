import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  TambahDataTani,
  RekapDataPetani,
  ViewDetailDataPetani,
  LaporanPetani,
  InfoTani,
  TambahInfoTani,
  EventTani,
  TambahEventTani,
  LiveChat,
  RatingPetugas,
  DataRiwayatChat,
  JurnalKegiatan,
  PresensiKehadiran,
  FormJurnalKegiatan,
  Login,
  Register,
  NotFoundPage,
  Notification,
  RekapDataPenyuluh,
  DetailInfoTani,
  DetailEventTani,
  EditInfoTani,
  DetailRekapPetani,
  EditEventTani,
  EditRekapPetani,
  TambahTanamanPetani,
  EditTanamanPetani,
  // DetailTanamanPetani,
  TambahOperator,
  // DetailDataTanamanPetani,
  EditLaporanTanam,
  TambahLaporanTanam,
  TambahLaporanAhir,
  EditPenyuluhan,
  VerifikasiUser,
  DataSampah
} from './page';
import { clsx } from 'clsx';

import Footer from './components/footer';
import ProtectedRoute from './page/protectedRoute';
import { Image, Menu, Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import { IoMailUnreadOutline, IoCaretDownOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './infrastucture/redux/state/stateSlice';
import { RootState } from './infrastucture/redux/store';
import { GetProfile, Logout } from './infrastucture';
import Statistik from './page/statistik';
import TambahStatistik from './page/statistik/tambah';
import EditStatistik from './page/statistik/edit';
import Dashboard from './page/dashboard';
import Homepage from './page/user/homepage';
import TokoPertanian from './page/user/tokoPertanian';
import InfoPertanian from './page/user/infoPertanian';
import Berita from './page/user/berita';
import RealisasiStatistik from './page/statistik/realisasi';
import DetailStatistik from './page/statistik/detail';
import DetailDataTanaman from './page/dataTani/dataPertanian/tanamanPetani/detail';
import ExportTable from './page/statistik/export';
import ExportTableDataPertanian from './page/dataTani/dataPertanian/tanamanPetani/export';
import LogActivity from './page/logAktivitas';
import IndexOperator from './page/operator';
import EditOperator from './page/operator/edit';
import DetailOperator from './page/operator/detail';
import Profil from './page/profil/profil';
import Pengaturan from './page/pengaturan/pengaturan';
import DetailJurnalKegiatan from './page/penyuluhanTani/detailPenyuluh/detail';
import EditFormJurnalKegiatan from './page/penyuluhanTani/detailPenyuluh/editJurnal';
import TokoTani from './page/tokoTani';
import TambahTokoTani from './page/tokoTani/tambah';
import DetailTokoTani from './page/tokoTani/detail';
import EditTokoTani from './page/tokoTani/edit';

const menu = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: '/icons/dashboard.svg',
    path: '/dashboard'
  },
  {
    id: 'statistik',
    name: 'Statistik',
    icon: '/icons/statistik.svg',
    sub: [
      {
        name: 'Tambah Data Statistik',
        icon: '/icons/tambah.svg',
        path: '/statistik/tambah'
      },
      {
        name: 'Lihat Tabel Statistik',
        icon: '/icons/users.svg',
        path: '/statistik'
      }
    ]
  },
  {
    id: 'data-petani',
    name: 'Data Pertanian',
    icon: '/icons/data-tani.svg',
    sub: [
      {
        name: 'Tambah Data Tanam',
        icon: '/icons/users.svg',
        path: '/tanaman-petani/add'
      },
      {
        name: 'Lihat Tabel Tanam',
        icon: '/icons/users.svg',
        path: '/tanaman-petani'
      },
      {
        name: 'Daftar User Petani',
        icon: '/icons/users.svg',
        path: '/data-tani/rekap-petani'
      }
    ]
  },
  {
    id: 'info-tani',
    name: 'Info Pertanian',
    icon: '/icons/info-tani.svg',
    sub: [
      {
        name: 'Tambah Berita Tani',
        icon: '/icons/users.svg',
        path: '/info-tani/tambah'
      },
      {
        name: 'Lihat Berita Tani',
        icon: '/icons/berita.svg',
        path: '/info-tani'
      },
      {
        name: 'Tambah Acara Tani',
        icon: '/icons/users.svg',
        path: '/event-tani/tambah'
      },
      {
        name: 'Lihat Acara Tani',
        icon: '/icons/kalender.svg',
        path: '/info-tani/event-tani'
      }
    ]
  },
  {
    id: 'toko-tani',
    name: 'Toko Pertanian',
    icon: '/icons/toko-tani.svg',
    sub: [
      {
        name: 'Tambah Toko Tani',
        icon: '/icons/tambah.svg',
        path: '/toko-tani/tambah'
      },
      {
        name: 'Lihat Daftar Toko Tani',
        icon: '/icons/toko.svg',
        path: '/toko-tani'
      }
    ]
  },
  {
    id: 'info-penyuluh',
    name: 'Info Penyuluh',
    icon: '/icons/data-penyuluh.svg',
    sub: [
      {
        name: 'Tambah Penyuluh',
        icon: '/icons/tambah.svg',
        path: '/data-penyuluh/tambah'
      },
      {
        name: 'Rekap Data Penyuluh',
        icon: '/icons/penyuluh.svg',
        path: '/data-penyuluh/rekap-penyuluh'
      },
      {
        name: 'Tambah Jurnal Petugas',
        icon: '/icons/tambah.svg',
        path: '/data-penyuluh/jurnal-kegiatan/form'
      },
      {
        name: 'Lihat Jurnal Petugas',
        icon: '/icons/pensil.svg',
        path: '/data-penyuluh/jurnal-kegiatan'
      }
    ]
  },
  {
    id: 'hak-akses',
    name: 'Hak Akses',
    icon: '/icons/hak-akses.svg',
    sub: [
      {
        name: 'Verifikasi User',
        icon: '/icons/globe.svg',
        path: '/verifikasi'
      },
      {
        name: 'Ubah Akses User',
        icon: '/icons/edit-menu.svg',
        path: '/hak-akses/ubah'
      }
    ]
  },
  {
    id: 'log-aktivitas',
    name: 'Log Aktivitas',
    icon: '/icons/log-aktivitas.svg',
    sub: [
      {
        name: 'Aktivitas User',
        icon: '/icons/log-aktivitas.svg',
        path: '/log-aktivitas'
      },
      {
        name: 'Data Sampah',
        icon: '/icons/log-aktivitas.svg',
        path: '/log-aktivitas/data-sampah'
      }
    ]
  },
  {
    id: 'list-operator',
    name: 'Info Operator',
    icon: '/icons/users.svg',
    sub: [
      {
        name: 'Tambah Operator',
        icon: '/icons/tambah.svg',
        path: '/list-operator/tambah'
      },
      {
        name: 'Data Operator',
        icon: '/icons/edit-menu.svg',
        path: '/list-operator'
      }
    ]
  }
];

const dropdownMenu = [
  {
    name: 'Profil',
    icon: '/icons/profil.svg',
    path: '/profil'
  },
  {
    name: 'Pengaturan',
    icon: '/icons/pengaturan.svg',
    path: '/pengaturan'
  }
];
const Path = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeMenu, setActiveMenu] = React.useState('');
  const activePage = window.location.pathname.split('/')[1];

  const sidebar = React.useRef(null);
  const mainMenuClasses =
    'flex items-center p-2 w-full bg-white-primary text-green-primary hover:bg-green-sidebar-hover transition-all duration-200 ease-in-out';
  const activeClasses = 'bg-green-primary bg-opacity-50';
  const textMenuClasses =
    'ml-3 transition-all duration-200 text-left whitespace-nowrap font-bold text-lg capitalize';
  const stackedMenuClasses = clsx('w-full transition duration-75 group', mainMenuClasses);
  const subMenuClasses = stackedMenuClasses;

  const user = useSelector((state: RootState) => state.state.user);
  const dispatch = useDispatch();
  const [role, setRole] = React.useState('' as string);

  const token = window.localStorage.getItem('token');
  const isAuthPage =
    window.location.pathname === '/login' || window.location.pathname === '/register';

  const isWebVidePage =
    window.location.pathname === '/' ||
    window.location.pathname.includes('info-pertanian') ||
    window.location.pathname === '/toko-pertanian';

  useEffect(() => {
    if (token) {
      GetProfile()
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUser(res.data.user));
            setRole(res.data.user.role);
          }
        })
        .catch((err) => {
          console.log({ err });
          window.localStorage.removeItem('token');
          if (!isAuthPage && !isWebVidePage) {
            window.location.href = '/login';
          }
        });
    }
  }, [token, isAuthPage, dispatch, isWebVidePage]);

  if (isAuthPage || isWebVidePage) return <RoutesPath />;

  return (
    <div className="bg-green-primary bg-opacity-70">
      <div className="flex">
        <aside
          ref={sidebar}
          className={clsx(
            'fixed left-0 top-0 z-20 flex h-screen flex-col justify-between bg-green-primary pb-8 shadow-lg duration-300 lg:translate-x-0 text-white',
            sidebarOpen ? 'w-80' : 'w-[6%]'
          )}>
          <div className={clsx('bg-green-secondary bg-opacity-50', !sidebarOpen && 'p-4')}>
            <Image
              src="/image/logo-navbar.png"
              height={80}
              alt="Logo Siketan"
              className={sidebarOpen ? 'block' : 'hidden'}
            />
          </div>
          <div className="h-full px-6 py-2 overflow-y-auto">
            <ul className="space-y-1.5 font-medium">
              {menu.map((item, index) => (
                <li key={index} className="divide-y divide-gray-500">
                  {item.path ? (
                    <a
                      href={item.path}
                      className={clsx(mainMenuClasses, activePage === item.id && activeClasses)}>
                      <Image src={item.icon} alt={item.name} w={24} />
                      <span className={clsx(textMenuClasses, sidebarOpen ? 'block' : 'hidden')}>
                        {item.name}
                      </span>
                    </a>
                  ) : (
                    <button
                      className={clsx(mainMenuClasses, activePage === item.id && activeClasses)}
                      onClick={() => {
                        if (activeMenu === item.id) setActiveMenu('');
                        else setActiveMenu(item.id);
                      }}>
                      <Image src={item.icon} alt={item.name} w={24} />
                      <span className={clsx(textMenuClasses, sidebarOpen ? 'block' : 'hidden')}>
                        {item.name}
                      </span>
                    </button>
                  )}

                  {activeMenu === item.id && (
                    <ul className="divide-y divide-gray-500">
                      {item.sub?.map((sub, index) => (
                        <li key={index}>
                          <a
                            href={sub.path}
                            className={clsx(
                              subMenuClasses,
                              activePage === 'bpup' && activeClasses
                            )}>
                            <Image src={sub.icon} alt={sub.name} width={24} />
                            <span
                              className={clsx(textMenuClasses, sidebarOpen ? 'block' : 'hidden')}>
                              {sub.name}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div
          className={clsx(
            'box-border h-full min-h-screen w-full transition-all duration-300 ease-in-out relative overflow-hidden',
            sidebarOpen ? 'lg:ml-80' : 'lg:ml-20'
          )}>
          <nav className="p-5 flex justify-between text-white bg-green-primary">
            <div className="flex gap-4 items-center text-xl">
              <button
                onClick={() => {
                  setSidebarOpen(!sidebarOpen);
                }}>
                <IconMenu2 />
              </button>
              <h2 className="font-bold">All Data</h2>
            </div>
            <div className="flex gap-4 items-center">
              <IoMailUnreadOutline size={24} />
              <FaRegBell size={24} />
              <Menu
                styles={{
                  dropdown: {
                    background: 'linear-gradient(180deg, #22571C 0%, #194115 100%);'
                  },
                  item: {
                    color: 'white',
                    textTransform: 'uppercase'
                  }
                }}>
                <Menu.Target>
                  <UnstyledButton className="text-white">
                    <Group>
                      <div style={{ flex: 1 }}>
                        <Text fw={700}>{user?.nama}</Text>

                        <Text size="xs">{user?.peran}</Text>
                      </div>
                      <Avatar radius="xl" src={user?.foto} />
                      <IoCaretDownOutline />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {dropdownMenu.map((item, index) => (
                    <Menu.Item
                      className="hover:bg-green-primary"
                      component="a"
                      key={index}
                      href={item.path}
                      style={{
                        ':hover': {
                          background:
                            'linear-gradient(180deg, #86BA34 0%, rgba(111, 163, 29, 0.50) 100%)'
                        }
                      }}>
                      <div className="flex gap-2 items-center text-black hover:text-white">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          className="inline-block"
                          width={24}
                        />
                        {item.name}
                      </div>
                    </Menu.Item>
                  ))}
                  <Menu.Item
                    className="hover:bg-green-primary"
                    component="b"
                    onClick={() => {
                      Logout();
                    }}>
                    <div className="flex gap-2 items-center text-black hover:text-white ">
                      <Image
                        src="/icons/keluar.svg"
                        alt="Keluar"
                        className="inline-block"
                        width={24}
                      />
                      Keluar
                    </div>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </nav>
          <div
            className="p-6 overflow-hidden"
            // style={{
            //     width: `calc(100% - ${sidebarOpen ? 18 : 7}rem)`,
            // }}
          >
            <RoutesPath />
          </div>
        </div>
      </div>
      <Footer sidebarOpen={sidebarOpen} />
    </div>
  );
};

const RoutesPath = () => {
  const userRole = useSelector((state: RootState) => state.state.user?.peran);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/toko-pertanian" element={<TokoPertanian />} />
        <Route path="/info-pertanian" element={<InfoPertanian />} />
        <Route path="/info-pertanian/:id" element={<Berita />} />
        <Route element={<ProtectedRoute />}>
          {/*if  user is operator, show this route else hide it*/}
          {userRole === 'operators super admin' || userRole === 'super admin' ? (
            // <Route path="/live-chat" element={<LiveChat />} />
            <Route path="/verifikasi" element={<VerifikasiUser />} />
          ) : (
            ''
          )}
          {/* <Route index element={<Dashboard />}></Route> */}
          {/* Statistik */}
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/statistik/export" element={<ExportTable />} />
          <Route path="/statistik/tambah" element={<TambahStatistik />} />
          <Route path="/statistik/edit/:id" element={<EditStatistik />} />
          <Route path="/statistik/:id" element={<DetailStatistik />} />
          <Route path="/statistik/:id/realisasi" element={<RealisasiStatistik />} />
          {/* ENd of Statistik */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notification" element={<Notification />} />
          {/* Data Tani */}
          <Route path="/rekap-data-tani/edit/:id" element={<EditRekapPetani />} />
          <Route path="/data-tani/tambah" element={<TambahDataTani />} />
          <Route path="/data-tani/laporan-tanam" element={<LaporanPetani />} />
          <Route path="/data-tani/rekap-petani" element={<RekapDataPetani />} />
          <Route path="/data-tani/detail/:id" element={<ViewDetailDataPetani />} />
          <Route path="/tanaman-petani" element={<DetailRekapPetani />} />
          <Route path="/tanaman-petani/export" element={<ExportTableDataPertanian />} />
          <Route path="/tanaman-petani/add" element={<TambahTanamanPetani />} />
          <Route path="/tanaman-petani/edit/:id" element={<EditTanamanPetani />} />
          <Route path="/tanaman-petani/detail/:id" element={<DetailDataTanaman />} />
          <Route path="/laporan-tanam/add" element={<TambahLaporanTanam />} />
          <Route path="/laporan-akhir/add" element={<TambahLaporanAhir />} />
          <Route path="/laporan-tanam/edit/:id" element={<EditLaporanTanam />} />
          {/* <Route path="/laporan-tanam/:id" element={<DetailTanamanPetani />} /> */}
          {/* <Route path="/data-tanaman" element={<DataTanaman />} /> */}
          {/* event Tani */}
          <Route path="/event-tani/tambah" element={<TambahEventTani />} />
          <Route path="/event-tani/detail" element={<DetailEventTani />} />
          <Route path="/info-tani/event-tani" element={<EventTani />} />
          <Route path="/event-tani/edit/:id" element={<EditEventTani />} />
          {/* info tani */}
          <Route path="/info-tani" element={<InfoTani />} />
          <Route path="/info-tani/tambah" element={<TambahInfoTani />} />
          <Route path="/info-tani/detail" element={<DetailInfoTani />} />
          <Route path="/info-tani/edit/:id" element={<EditInfoTani />} />
          {/* Toko Tani */}
          <Route path="/toko-tani" element={<TokoTani />} />
          <Route path="/toko-tani/tambah" element={<TambahTokoTani />} />
          <Route path="/toko-tani/:id" element={<DetailTokoTani />} />
          <Route path="/toko-tani/edit/:id" element={<EditTokoTani />} />
          {/* Data Penyuluh */}
          <Route path="/data-penyuluh/tambah" element={<TambahTokoTani />} />
          <Route path="/data-penyuluh/presensi-kehadiran" element={<PresensiKehadiran />} />
          <Route path="/data-penyuluh/jurnal-kegiatan" element={<JurnalKegiatan />} />
          <Route path="/data-penyuluh/jurnal-kegiatan/form" element={<FormJurnalKegiatan />} />
          <Route
            path="/data-penyuluh/jurnal-kegiatan/detail/:id"
            element={<DetailJurnalKegiatan />}
          />
          <Route
            path="/data-penyuluh/jurnal-kegiatan/edit/:id"
            element={<EditFormJurnalKegiatan />}
          />
          <Route path="/data-penyuluh/riwayat-chat" element={<DataRiwayatChat />} />
          <Route path="/data-penyuluh/:id" element={<EditPenyuluhan />} />
          {/*All about Operator*/}
          <Route path="/list-operator/tambah" element={<TambahOperator />} />
          <Route path="/list-operator" element={<IndexOperator />} />
          <Route path="/data-operator/edit/:id" element={<EditOperator />} />
          <Route path="/data-operator/detail/:id" element={<DetailOperator />} />
          <Route path="/data-penyuluh/rekap-penyuluh" element={<RekapDataPenyuluh />} />
          {/* Log Aktivitas */}
          <Route path="/log-aktivitas/" element={<LogActivity />} />
          <Route path="/log-aktivitas/data-sampah" element={<DataSampah />} />
          {/* LiveChat */}
          <Route path="/live-chat" element={<LiveChat />} />
          <Route path="/live-chat/rating-petugas" element={<RatingPetugas />} />
          {/* Profil */}
          <Route path="profil" element={<Profil />} />
          {/* Pengaturan */}
          <Route path="pengaturan" element={<Pengaturan />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default Path;
