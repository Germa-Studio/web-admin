import { useState, useEffect } from 'react';
import EditorText from '@/components/textAreaEditor';
import { Button } from '@mantine/core';
import MainCard from '@/components/MainCard';
import TextInput from '@/components/uiComponents/inputComponents/textInput';
import { IconPlus, IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { tambahLaporanAkhir } from '@/infrastruture';
import InputImage from '@/components/inputImage';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Loading from '../../../../components/loading';
const TambahLaporanTanam = () => {
  const [tanggalLaporan, setTanggalLaporan] = useState('');
  const [komdisiTanaman, setKomdisiTanaman] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoTanaman, setFotoTanaman] = useState('');
  const [realisasiHasilPanen, setRealisasiHasilPanen] = useState('');
  const [realisasiLuasLahan, setRealisasiLuasLahan] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  const tanamanId = new URLSearchParams(location.search).get('tanamanId');

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      tanamanPetaniId: tanamanId,
      tanggalLaporan,
      komdisiTanaman,
      deskripsi,
      fotoTanaman,
      realisasiHasilPanen,
      realisasiLuasLahan
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    tambahLaporanAkhir(formData).then(() => {
      setLoading(false);
      history(-1);
    });
  };
  return (
    <MainCard transparent row center style={{ paddingTop: '50px' }}>
      {loading && <Loading />}
      <MainCard width="80%">
        <h1 className="text-center">Tambahkan Laporan Tanam</h1>
        <MainCard transparent row noPadding className="mt-5">
          <TextInput
            id="realisasiHasilPanen"
            contoh="200 Kw"
            name="realisasiHasilPanen"
            label="Realisasi Produk Tanam "
            value={realisasiHasilPanen}
            onChange={(e) => setRealisasiHasilPanen(e.target.value)}
          />
          <TextInput
            id="realisasiLuasLahan"
            contoh="4 M²"
            name="realisasiLuasLahan"
            label="Realisasi Luas Lahan Tanam "
            value={realisasiLuasLahan}
            onChange={(e) => setRealisasiLuasLahan(e.target.value)}
          />
        </MainCard>
        <MainCard transparent gap="10%" row>
          <MainCard transparent noPadding width="40%">
            <TextInput
              id="kondisiTanaman"
              contoh="Layu"
              name="kondisiTanaman"
              label="Kondisi Tanaman "
              value={komdisiTanaman}
              onChange={(e) => setKomdisiTanaman(e.target.value)}
            />
            <TextInput
              type="date"
              id="tanggalLaporan"
              name="tanggalLaporan"
              label="Tanggal Laporan"
              value={tanggalLaporan}
              onChange={(e) => setTanggalLaporan(e.target.value)}
            />
          </MainCard>
          <MainCard transparent noPadding>
            <InputImage
              imageActive={fotoTanaman}
              onChange={(e) => setFotoTanaman(e)}
              title="Foto Tanaman"
            />
          </MainCard>
        </MainCard>
        <span>Deskripsi:</span>
        <EditorText setValue={setDeskripsi} />
        <MainCard transparent row style={{ justifyContent: 'end' }}>
          <Button
            leftIcon={<IconDeviceFloppy size="1rem" />}
            variant="outline"
            onClick={(e) => handleSubmit(e)}>
            Simpan
          </Button>
          <Button leftIcon={<IconX size="1rem" />} onClick={() => history(-1)} variant="outline">
            Batalkan
          </Button>
        </MainCard>
      </MainCard>
    </MainCard>
  );
};

export default TambahLaporanTanam;
