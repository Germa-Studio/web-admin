import { useState, useEffect } from 'react';
import InputImage from '@/components/inputImage';
import TextInput from '@/components/uiComponents/inputComponents/textInput';
import TimeInput from '@/components/uiComponents/inputComponents/timeInputEdit';
import { GetEventTaniById, updateEventTani } from '@/infrastruture';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../../../components/loading';

function EditEventTani() {
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [tanggalAcara, setTanggalAcara] = useState('');
  const [waktuAcara, setWaktuAcara] = useState('');
  const [tempat, setTempat] = useState('');
  const [peserta, setPeserta] = useState('');
  const [fotoKegiatan, setFotoKegiatan] = useState('');
  const [fotoKegiatanBaru, setFotoKegiatanBaru] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    GetEventTaniById(id).then((data) => {
      setNamaKegiatan(data?.namaKegiatan);
      setTanggalAcara(data?.tanggalAcara);
      setWaktuAcara(data?.waktuAcara);
      setTempat(data?.tempat);
      setPeserta(data?.peserta);
      setFotoKegiatan(data?.fotoKegiatan);
      setisLoading(false);
    });
  }, [id]);
  const currentDate = new Date(tanggalAcara.split('T'));
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('id-ID', options);
  const [tanggal, bulan, tahun] = formattedDate.split('/');
  const tanggalAkhir = `${tahun}-${bulan?.padStart(2, '0')}-${tanggal?.padStart(2, '0')}`;
  const handleSubmit = () => {
    setisLoading(true);
    const data = {
      namaKegiatan,
      tanggalAcara,
      waktuAcara,
      tempat,
      peserta,
      fotoKegiatanBaru
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    updateEventTani(id, formData).then(() => {
      setisLoading(false);
    });
  };
  return (
    <MainCard transparent row center style={{ paddingTop: '50px' }}>
      {isLoading && <LoadingAnimation />}
      <MainCard width="80%">
        <MainCard transparent nopadding center>
          <InputImage
            id="fotoKegiatan"
            name="fotoKegiatan"
            imageActive={fotoKegiatan}
            onChange={(e) => setFotoKegiatanBaru(e)}
          />
        </MainCard>
        <MainCard fullwidth transparent className="mt-10">
          <TextInput
            id="namaKegiatan"
            name="namaKegiatan"
            label="Nama Kegiatan"
            value={namaKegiatan}
            onChange={(e) => setNamaKegiatan(e.target.value)}
            contoh="Penyuluhan Tanaman"
          />
          <TextInput
            id="tanggalAcara"
            name="tanggalAcara"
            label="Tanggal Acara"
            value={tanggalAkhir}
            onChange={(e) => setTanggalAcara(e.target.value)}
            contoh="26/10/2023"
            type="date"
          />
          <TimeInput
            idMulai="waktuMulai"
            nameMulai="waktuMulai"
            idSelesai="waktuSelesai"
            waktuActiveMulai={waktuAcara?.split('-')[0]}
            waktuActiveAkhir={waktuAcara?.split('-')[1]}
            waktu={setWaktuAcara}
            nameSelesai="waktuSelesai"
            label="Waktu Acara"
            contoh="12:45 AM - 01:10 PM"
          />
          <TextInput
            id="tempat"
            name="tempat"
            label="Tempat"
            value={tempat}
            onChange={(e) => setTempat(e.target.value)}
            contoh="Balay Merdeka Raya"
          />
          <TextInput
            id="peserta"
            name="peserta"
            label="Peserta"
            value={peserta}
            onChange={(e) => setPeserta(e.target.value)}
            contoh="Petani Desa A"
          />
        </MainCard>
        <MainCard transparent>
          <button
            onClick={handleSubmit}
            className="w-[20%] text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-orange-800">
            Simpan
          </button>
        </MainCard>
      </MainCard>
    </MainCard>
  );
}

export default EditEventTani;
