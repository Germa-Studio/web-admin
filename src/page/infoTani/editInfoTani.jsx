import { useState, useEffect } from 'react';
import EditorText from '@/components/textAreaEditorEdit';
import { Radio, Group, Button } from '@mantine/core';
import MainCard from '@/components/MainCard';
import TextInput from '@/components/uiComponents/inputComponents/textInput';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import InputImage from '@/components/inputImage';
import { GetInfoTaniById, updateInfoTani } from '@/infrastruture';
import LoadingAnimation from '../../components/loading';

const TambahInfoTani = () => {
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [isi, setIsi] = useState('');
  const [isiBaru, setIsiBaru] = useState('');
  const [fotoBerita, setFotoBerita] = useState('');
  const [fotoBeritaBaru, setFotoBeritaBaru] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;
  const currentDate = new Date(tanggal);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('id-ID', options);
  useEffect(() => {
    if (id) {
      GetInfoTaniById(id).then(({ infotani }) => {
        setJudul(infotani.judul);
        setKategori(infotani.kategori);
        setIsi(infotani.isi);
        setFotoBerita(infotani.fotoBerita);
        setCreatedBy(infotani.createdBy);
        setTanggal(infotani.tanggal);
        setLoading(false);
      });
    }
  }, [id]);
  const handleClick = (e) => {
    const data = {
      judul,
      kategori,
      isi: isiBaru || isi,
      fotoBeritaBaru
    };
    if (e == 'simpan') {
      setLoading(true);
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      updateInfoTani(id, formData).then(() => {
        setLoading(false);
      });
    } else {
      window.location = '/info-tani';
    }
  };
  return (
    <MainCard transparent row center style={{ paddingTop: '50px' }}>
      {loading && <LoadingAnimation />}
      <MainCard width="80%">
        <h1 className="text-center">Edit Berita Tani</h1>
        <MainCard transparent gap="0">
          <MainCard transparent noPadding width="40%">
            <TextInput
              id="judul"
              name="judul"
              label="Judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </MainCard>
          <MainCard transparent noPadding row gap="15rem">
            <MainCard transparent noPadding gap="0">
              <span id="tanggal" name="tanggal">
                Dibuat Pada: {formattedDate}
              </span>
              <span>Dibuat Oleh: {createdBy}</span>
            </MainCard>
            {/* <MainCard transparent noPadding gap="0">
                            <div className="flex justify-center">
                                    <IconPlus className="m-auto rounded-full h-[20px] w-[20px] border border-black me-1"/>
                                <span className="underline">Upload Baru</span>            
                            </div>
                        </MainCard> */}
            <MainCard transparent noPadding gap="0">
              <Radio.Group
                withAsterisk
                id="kategori"
                name="kategori"
                value={kategori}
                onChange={(e) => setKategori(e)}>
                <Group mt="xs">
                  <Radio value="berita" label="Berita" />
                  <Radio value="artikel" label="Artikel" />
                  <Radio value="tips" label="Tips" />
                </Group>
              </Radio.Group>
            </MainCard>
          </MainCard>
        </MainCard>
        <MainCard
          transparent
          noPadding
          width="27%"
          style={{ height: '39%', backgroubdColor: 'blue' }}>
          <InputImage
            imageActive={fotoBerita}
            onChange={(e) => setFotoBeritaBaru(e)}
            title="Foto Berita"
          />
        </MainCard>
        <EditorText setValue={setIsiBaru} isi={isi} />
        <MainCard transparent id="isi" name="isi" row style={{ justifyContent: 'end' }}>
          <Button
            leftIcon={<IconDeviceFloppy size="1rem" />}
            variant="outline"
            onClick={() => handleClick('simpan')}>
            Simpan
          </Button>
          <Button
            leftIcon={<IconX size="1rem" />}
            variant="outline"
            onClick={() => handleClick('batal')}>
            Batalkan
          </Button>
        </MainCard>
      </MainCard>
    </MainCard>
  );
};

export default TambahInfoTani;
