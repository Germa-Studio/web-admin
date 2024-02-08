/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Card, Image, Badge, Group, Button, Text, Modal } from '@mantine/core';
import MainCard from '@/components/MainCard';
import { GetJurnalKegiatanById } from '@/infrastruture';
import LoadingAnimation from '../../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
// import { AddJurnalKegiatan } from '../../../infrastucture';

const DetailFormJurnalKegiatan = () => {
  // const [NIK, setNIK] = useState('');
  const [judul, setJudul] = useState('');
  const [statusJurnal, setStatusJurnal] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState('');
  const [modalDeleteData, setModalDeleteData] = useState(false);
  // const [createdBy, setCreatedBy] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  //   const id = location.state?.id;
  // const currentDate = new Date();
  // const tanggalDibuat = currentDate.toISOString().split('T')[0];
  // const tanggalFormatted =
  //   currentDate.getDate() +
  //   ' ' +
  //   currentDate.toLocaleString('id', { month: 'long' }) +
  //   ' ' +
  //   currentDate.getFullYear();

  // const handleSubmit = (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   const data = {
  //     NIK,
  //     judul,
  //     uraian: isi,
  //     gambar,
  //     createdBy,
  //     tanggalDibuat,
  //     statusJurnal
  //   };
  //   const formData = new FormData();
  //   for (const key in data) {
  //     formData.append(key, data[key]);
  //   }
  //   AddJurnalKegiatan(formData).then(() => setLoading(false));
  // };

  useEffect(() => {
    GetJurnalKegiatanById(id).then((data) => {
      // console.log(data);
      setLoading(false);
      // setNIK(data.newData.NIK);
      setJudul(data.newData.judul);
      setIsi(data.newData.uraian);
      setGambar(data.newData.gambar);
      // setCreatedBy(data.newData.createdBy);
      setStatusJurnal(data.newData.statusJurnal);
    });
  }, [id]);
  return (
    <MainCard noPadding transparent row center style={{ marginTop: '100px' }}>
      {loading && <LoadingAnimation />}
      <Modal
        opened={modalDeleteData}
        onClose={() => setModalDeleteData(false)}
        withCloseButton={false}
        centered>
        <Text>Apakah Kamu Yakin Akan Menghapus Data Ini ?</Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <Button
            color="cyan"
            style={{ color: 'white', backgroundColor: '#303A47', marginRight: 8 }}
            onClick={() => setModalDeleteData(false)}>
            Cancel
          </Button>
          <Button
            color="cyan"
            style={{ color: 'white', backgroundColor: 'red' }}
            type="submit"
            onClick={() => {
              // handleDeleteUser(modalDeleteData);
              setModalDeleteData(false);
            }}>
            Delete
          </Button>
        </div>
      </Modal>
      <button
        className="bg-white h-fit px-4 py-2 border border-green-primary text-green-primary rounded-md hover:bg-green-primary hover:text-white"
        onClick={() => navigate(-1)}>
        kembali
      </button>
      <MainCard width="50%" transparent>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={gambar} alt={judul} withPlaceholder />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{judul}</Text>
            {statusJurnal && (
              <Badge color="pink" variant="light">
                {statusJurnal}
              </Badge>
            )}
          </Group>

          <Text size="sm" color="black">
            <span dangerouslySetInnerHTML={{ __html: isi }} className="text-sm text-justify" />
          </Text>
        </Card>
      </MainCard>
    </MainCard>
  );
};

export default DetailFormJurnalKegiatan;
