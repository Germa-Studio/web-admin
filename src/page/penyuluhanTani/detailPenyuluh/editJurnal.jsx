/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import EditorText from '@/components/textAreaEditorEdit';
import { Button } from '@mantine/core';
import MainCard from '@/components/MainCard';
import TextInput from '@/components/uiComponents/inputComponents/textInput';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { GetJurnalKegiatanById, UpdateJurnalKegiatan } from '@/infrastruture';
import InputImage from '@/components/inputImage';
import LoadingAnimation from '../../../components/loading';
import { useParams } from 'react-router-dom';
const EditFormJurnalKegiatan = () => {
  const [NIK, setNIK] = useState('');
  const [judul, setJudul] = useState('');
  const [statusJurnal, setStatusJurnal] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;

  //   const id = location.state?.id;
  const currentDate = new Date();
  const tanggalDibuat = currentDate.toISOString().split('T')[0];
  const tanggalFormatted =
    currentDate.getDate() +
    ' ' +
    currentDate.toLocaleString('id', { month: 'long' }) +
    ' ' +
    currentDate.getFullYear();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      NIK,
      judul,
      uraian: isi,
      gambar,
      createdBy,
      tanggalDibuat,
      statusJurnal
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    UpdateJurnalKegiatan(id, formData).then(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      GetJurnalKegiatanById(id).then((data) => {
        // console.log(data.newData.uraian)
        setNIK(data.newData.dataPenyuluh.nik);
        setJudul(data.newData.judul);
        // setIsi(data.newData.uraian);
        setIsi(data.newData.uraian);
        setGambar(data.newData.gambar);
        setCreatedBy(data.newData.dataPenyuluh.nama);
        setStatusJurnal(data.newData.statusJurnal);
      });
    }
  }, [id]);

  return (
    <MainCard transparent row center style={{ paddingTop: '50px' }}>
      {loading && <LoadingAnimation />}
      <MainCard width="80%">
        <h1 className="text-center">Edit Jurnal Kegiatan</h1>
        <MainCard transparent gap="10%" row>
          <MainCard transparent noPadding width="40%">
            <MainCard transparent noPadding gap="0">
              <span id="tanggal" name="tanggal">
                Tanggal Dibuat: {tanggalFormatted}
              </span>
              <span>Dibuat Oleh: {createdBy}</span>
            </MainCard>
            <TextInput
              id="judul"
              name="judul"
              label="Judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="underline_select" className="text-sm dark:text-gray-400 pt-5 md:pt-0">
                <strong>Status</strong>
              </label>
              <select
                id="statusJurnal"
                name="statusJurnal"
                value={statusJurnal}
                onChange={(e) => setStatusJurnal(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                <option value="publish">Publish</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </MainCard>
          <MainCard transparent noPadding>
            <InputImage imageActive={gambar} onChange={(e) => setGambar(e)} title="Foto kegiatan" />
          </MainCard>
        </MainCard>
        <EditorText setValue={setIsi} isi={isi} />
        <MainCard transparent id="isi" name="isi" row style={{ justifyContent: 'end' }}>
          <Button
            leftIcon={<IconDeviceFloppy size="1rem" />}
            variant="outline"
            onClick={(e) => handleSubmit(e)}>
            Simpan
          </Button>
          <Button
            leftIcon={<IconX size="1rem" />}
            variant="outline"
            onClick={() => (window.location = '/data-penyuluh/jurnal-kegiatan')}>
            Batalkan
          </Button>
        </MainCard>
      </MainCard>
    </MainCard>
  );
};

export default EditFormJurnalKegiatan;
