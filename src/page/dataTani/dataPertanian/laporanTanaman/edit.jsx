import { useState, useEffect } from 'react';
import EditorText from '@/components/textAreaEditorEdit';
import { Button } from '@mantine/core';
import MainCard from '@/components/MainCard';
import TextInput from '@/components/uiComponents/inputComponents/textInput';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { getByIdLaporanTanam, editLaporanTanam } from '@/infrastruture';
import InputImage from '@/components/inputImage';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../../components/loading';
const EditLaporanTanam = () => {
  const [tanggalLaporan, setTanggalLaporan] = useState('');
  const [komdisiTanaman, setKomdisiTanaman] = useState('');
  const [deskripsiActive, setDeskripsiActive] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoTanaman, setFotoTanaman] = useState('');
  const [fotoTanamanActive, setFotoTanamanActive] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useNavigate();
  useEffect(() => {
    getByIdLaporanTanam(id).then((data) => {
      setLoading(false);
      setTanggalLaporan(data?.tanggalLaporan?.split('T')[0]);
      setKomdisiTanaman(data?.komdisiTanaman);
      setDeskripsiActive(data?.deskripsi);
      setFotoTanamanActive(data?.fotoTanaman);
    });
  }, [id]);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      tanggalLaporan,
      komdisiTanaman,
      deskripsi,
      fotoTanaman
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    editLaporanTanam(id, formData).then(() => {
      setLoading(false);
      history(-1);
    });
  };
  return (
    <MainCard transparent row center style={{ paddingTop: '50px' }}>
      {loading && <Loading />}
      <MainCard width="80%">
        <h1 className="text-center">Tambahkan Laporan Tanam</h1>
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
              imageActive={fotoTanamanActive}
              onChange={(e) => setFotoTanaman(e)}
              title="Foto Tanaman"
            />
          </MainCard>
        </MainCard>
        <span>Deskripsi:</span>
        <EditorText setValue={setDeskripsi} isi={deskripsiActive} />
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

export default EditLaporanTanam;
