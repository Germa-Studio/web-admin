/* eslint-disable no-unused-vars */
import { useState } from 'react';
import EditorText from '@/components/textAreaEditor';
import { Button } from '@mantine/core';
import MainCard from '@/components/MainCard';
import TextInput from '@/components/uiComponents/inputComponents/textInput';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { AddJurnalKegiatan } from '@/infrastruture';
import InputImage from '@/components/inputImage';
import LoadingAnimation from '../../../components/loading';
const FormJurnalKegiatan = () => {
  const [NIK, setNIK] = useState('');
  const [judul, setJudul] = useState('');
  const [statusJurnal, setStatusJurnal] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [loading, setLoading] = useState(false);
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
    AddJurnalKegiatan(formData).then(() => setLoading(false));
  };
  return (
    <MainCard transparent row center style={{ paddingTop: '50px' }}>
      {loading && <LoadingAnimation />}
      <MainCard width="80%">
        <h1 className="text-center">Tambahkan Jurnal Kegiatan</h1>
        <MainCard transparent gap="10%" row>
          <MainCard transparent noPadding width="40%">
            <TextInput
              id="NIK"
              name="NIK"
              label="NIP"
              value={NIK}
              onChange={(e) => setNIK(e.target.value)}
            />
            <TextInput
              id="judul"
              name="judul"
              label="Judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
            <TextInput
              id="createdBy"
              name="createdBy"
              label="Dibuat Oleh"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
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
            <span id="tanggal" name="tanggal">
              Tanggal Dibuat: {tanggalFormatted}
            </span>
          </MainCard>
          <MainCard transparent noPadding>
            <InputImage imageActive={gambar} onChange={(e) => setGambar(e)} title="Foto kegiatan" />
          </MainCard>
        </MainCard>
        <EditorText setValue={setIsi} />
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

export default FormJurnalKegiatan;
