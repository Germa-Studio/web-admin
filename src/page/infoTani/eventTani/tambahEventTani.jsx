import React from 'react';
import InputImage from '@/components/inputImage';
import MainCard from '@/components/MainCard';
import TimeInput from '@/components/uiComponents/inputComponents/timeInput';
import TextInput from '@/components/uiComponents/inputComponents/textInput';
import { AddEventTani } from '@/infrastruture';
import LoadingAnimation from '../../../components/loading';

function TambahEventTani() {
  const [namaKegiatan, setNamaKegiatan] = React.useState('');
  const [tanggalAcara, setTanggalAcara] = React.useState('');
  const [waktuAcara, setWaktuAcara] = React.useState('');
  const [tempat, setTempat] = React.useState('');
  const [peserta, setPeserta] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const [isi, setIsi] = React.useState("");
  const [fotoKegiatan, setFotoKegiatan] = React.useState('');

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      namaKegiatan,
      tanggalAcara,
      waktuAcara,
      tempat,
      peserta,
      fotoKegiatan
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    AddEventTani(formData).then(() => {
      setLoading(false);
    });
  };
  return (
    <MainCard transparent row center style={{ paddingTop: '50px' }}>
      {loading && <LoadingAnimation />}
      <MainCard width="80%">
        <MainCard transparent nopadding center>
          <InputImage
            id="fotoKegiatan"
            name="fotoKegiatan"
            value={fotoKegiatan}
            onChange={(e) => setFotoKegiatan(e)}
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
            value={tanggalAcara}
            onChange={(e) => setTanggalAcara(e.target.value)}
            contoh="26/10/2023"
            type="date"
          />
          <TimeInput
            idMulai="waktuMulai"
            nameMulai="waktuMulai"
            idSelesai="waktuSelesai"
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

export default TambahEventTani;
