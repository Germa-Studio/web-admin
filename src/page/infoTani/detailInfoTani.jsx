import { useState, useEffect } from 'react';
import { Card, Image, Text, Badge, Button, Group, Modal } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetInfoTaniById, DeleteInfoTani } from '@/infrastruture';
import MainCard from '@/components/MainCard';
import LoadingAnimation from '../../components/loading';
import { setUser } from '../../infrastucture/redux/state/stateSlice';
// import { RootState } from './infrastucture/redux/store';
import { useDispatch, useSelector } from 'react-redux';
function DetailInfoTani() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.state.user);
  const [data, setData] = useState(null);
  const location = useLocation();
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = location.state?.id;
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      GetInfoTaniById(id).then((data) => {
        setLoading(false);
        setData(data.infotani);
      });
    }
  }, [id]);
  const handleDeleteUser = (ids) => {
    DeleteInfoTani(ids);
  };
  const navigateToEdit = (itemId) => {
    navigate(`/info-tani/edit/${itemId}`, { state: { id: itemId } });
  };
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
              handleDeleteUser(modalDeleteData);
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
            <Image src={data?.fotoBerita} alt={data?.judul} withPlaceholder />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{data?.judul}</Text>
            {data?.kategori && (
              <Badge color="pink" variant="light">
                {data?.kategori}
              </Badge>
            )}
          </Group>

          <Text size="sm" color="black">
            <span
              dangerouslySetInnerHTML={{ __html: data?.isi }}
              className="text-sm text-justify"
            />
          </Text>
          <Group position="right" sx={{ marginTop: '19px' }}>
            <button
              className="bg-white h-fit px-4 py-2 border border-green-primary text-green-primary rounded-md hover:bg-green-primary hover:text-white"
              onClick={() => navigateToEdit(data?.id)}>
              Edit
            </button>
            {user?.peran === 'operator super admin' && (
              <button
                className="bg-white h-fit px-4 py-2 border border-green-primary text-green-primary rounded-md hover:bg-green-primary hover:text-white"
                onClick={() => setModalDeleteData(data?.id)}>
                Delete
              </button>
            )}
          </Group>
        </Card>
      </MainCard>
    </MainCard>
  );
}

export default DetailInfoTani;
