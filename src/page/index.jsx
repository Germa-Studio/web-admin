import TambahDataTani from './dataTani/petani/tambahData';
import RekapDataPetani from './dataTani/petani/rekapPetani';
import LaporanPetani from './dataTani/dataPertanian/laporan-tanam';
import InfoTani from './infoTani';
import TambahInfoTani from './infoTani/tambahData';
import EventTani from './infoTani/eventTani';
import TambahEventTani from './infoTani/eventTani/tambahEventTani';
import LiveChat from './liveChat';
import RatingPetugas from './liveChat/ratingPetugas';
import TambahPenyuluhanTani from './penyuluhanTani/tambahData';
import EditPenyuluhan from './penyuluhanTani/editPenyuluh';
import DataRiwayatChat from './penyuluhanTani/detailPenyuluh/dataRiwayatChat';
import JurnalKegiatan from './penyuluhanTani/detailPenyuluh/jurnalKegiatan';
import FormJurnalKegiatan from './penyuluhanTani/detailPenyuluh/formJurnalKegiatan';
import PresensiKehadiran from './penyuluhanTani/detailPenyuluh/presensiKehadiran';
import RekapDataPenyuluh from './penyuluhanTani/detailPenyuluh/rekapDataPenyuluh';
import TambahPenjual from './tokoTani/tambahDataPenjual';
import Login from './login';
import Register from './register';
import Notification from './notification';
import Airplane404 from '../assets/notFound.svg';
import DetailInfoTani from './infoTani/detailInfoTani';
import DetailEventTani from './infoTani/eventTani/DetailEventTani';
import EditInfoTani from './infoTani/editInfoTani';
import EditEventTani from './infoTani/eventTani/editEventTani';
import EditRekapPetani from './dataTani/petani/editDataPetani';
import ViewDetailDataPetani from './dataTani/petani/detailDataPetani';
import DetailRekapPetani from './dataTani/dataPertanian/tanamanPetani';
import TambahTanamanPetani from './dataTani/dataPertanian/tanamanPetani/tambah';
import EditTanamanPetani from './dataTani/dataPertanian/tanamanPetani/edit';
import DetailTanamanPetani from './dataTani/dataPertanian/laporanTanaman';
import EditLaporanTanam from './dataTani/dataPertanian/laporanTanaman/edit';
import TambahLaporanTanam from './dataTani/dataPertanian/laporanTanaman/tambah';
import TambahLaporanAhir from './dataTani/dataPertanian/laporanTanaman/laporanAkhir';
import VerifikasiUser from './kelolaUser';
import DataSampah from './logAktivitas/dataSampah';
import TambahOperator from './operator/tambah';

const NotFoundPage = () => {
  return (
    <div className="container img-banner pt-20 md:pt-24">
      <div className="grid md:grid-cols-2 justify-center mt-5 mb-5 px-5 md:px-0">
        <div className="col-md-4 flex justify-end">
          <img src={Airplane404} width={200} alt="airplane404" />
        </div>
        <div className="col-md-8 text-center pt-5 md:pt-24 me-auto">
          <h1 className="text-4xl font-bold text-blue-600">404</h1>
          <h3 className="text-2xl text-gray-800">Page Not Found!</h3>
        </div>
      </div>
    </div>
  );
};

export {
  EditRekapPetani,
  EditLaporanTanam,
  ViewDetailDataPetani,
  TambahLaporanTanam,
  EditTanamanPetani,
  DetailTanamanPetani,
  TambahTanamanPetani,
  TambahDataTani,
  RekapDataPetani,
  LaporanPetani,
  InfoTani,
  EditEventTani,
  TambahInfoTani,
  DetailRekapPetani,
  EventTani,
  TambahEventTani,
  LiveChat,
  RatingPetugas,
  TambahPenyuluhanTani,
  DataRiwayatChat,
  JurnalKegiatan,
  FormJurnalKegiatan,
  PresensiKehadiran,
  TambahPenjual,
  Login,
  Register,
  NotFoundPage,
  Notification,
  RekapDataPenyuluh,
  DetailInfoTani,
  DetailEventTani,
  EditInfoTani,
  TambahLaporanAhir,
  EditPenyuluhan,
  VerifikasiUser,
  DataSampah,
  TambahOperator
};
