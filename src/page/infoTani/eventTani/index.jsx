import MainCard from '@/components/MainCard';
import InputCrud from '@/components/page/infoTani/IconCrud';
import { useNavigate } from 'react-router-dom';
import { DeleteEventTani, GetEventTani } from '@/infrastruture';
import { Button, Card, Modal, Text } from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import LoadingAnimation from '../../../components/loading';
import { FaClock } from 'react-icons/fa6';
import { BsPersonCircle } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { IoMdListBox, IoMdPerson } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function EventTani() {
  const user = useSelector((state) => state.state.user);
  const [datas, setDatas] = useState([]);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  useEffect(() => {
    GetEventTani().then((data) => {
      setLoading(false);
      setDatas(data.infotani);
    });
  }, []);

  const handleDeleteUser = (ids) => {
    DeleteEventTani(ids);
    setModalDeleteData(false);
    const updatedDatas = datas.filter((d) => d.id !== ids);
    setDatas(updatedDatas);
  };
  const navigateToEdit = (itemId) => {
    history(`/event-tani/edit/${itemId}`, { state: { id: itemId } });
  };
  const navigateToDetail = (itemId) => {
    history(`/event-tani/detail?id=${itemId}`, { state: { id: itemId } });
  };
  return (
    <div>
      {loading && <LoadingAnimation />}
      <Modal
        opened={modalDeleteData}
        onClose={() => setModalDeleteData(false)}
        withCloseButton={false}
        centered>
        <Text>Apakah Kamu Yakin Akan Menghapus Data Ini ?</Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 20
          }}>
          <Button
            color="cyan"
            style={{
              color: 'white',
              backgroundColor: '#303A47',
              marginRight: 8
            }}
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
      {datas?.map((d) => (
        <MainCard row transparent center gap="0" key={d.id}>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="w-[80%]">
            <MainCard transparent row>
              <img
                className="h-min rounded-lg w-52"
                src={d?.fotoKegiatan}
                alt="With default placeholder"
              />
              <MainCard transparent noPadding className="w-[100%]">
                <h1 className="font-bold text-base md:text-lg text-justify tracking-[1px] text-green-primary capitalize max-w-[95%]">
                  {d?.namaKegiatan}
                </h1>
                {/* <div className="flex flex-row justify-between"> */}
                <div className="max-w-[95%] flex flex-col space-y-3">
                  {/* <div className="flex flex-row space-x-5"> */}
                  <div className="flex flex-row space-x-2">
                    <BsPersonCircle size={17} className="fill-black" />
                    <p className="text-xs sm:text-sm text-black"> Dibuat Oleh : {d?.createdBy}</p>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <FaClock size={17} className="fill-black" />
                    <p className="text-xs sm:text-sm text-black">
                      {' '}
                      Dibuat Pada : {d.createdAt?.split('T')[0]}{' '}
                    </p>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <IoMdListBox size={17} className="fill-black" />
                    <p className="text-xs sm:text-sm text-black">
                      Status :{' '}
                      {new Date(d.createdAt?.split('T')[0] || '').getTime() < new Date().getTime()
                        ? 'sudah Terlewat'
                        : 'akan Datang'}
                    </p>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <FaBuilding size={17} className="fill-black" />
                    <p className="text-xs sm:text-sm text-black"> Tempat : {d?.tempat}</p>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <IoMdPerson size={17} className="fill-black" />
                    <p className="text-xs sm:text-sm text-black"> Peserta : {d?.peserta}</p>
                  </div>
                  {/* </div> */}
                </div>
                {/* </div> */}
              </MainCard>
              <div className="flex flex-col items-end justify-end">
                <div className="flex flex-col space-y-1 max-h-fit">
                  <InputCrud onClick={() => navigateToDetail(d.id)} icon={<IconEye />}>
                    Lihat
                  </InputCrud>
                  <InputCrud onClick={() => navigateToEdit(d.id)} icon={<IconEdit />}>
                    Edit
                  </InputCrud>
                  {user?.peran === 'operator super admin' && (
                    <InputCrud onClick={() => setModalDeleteData(d.id)} icon={<IconTrash />}>
                      Hapus
                    </InputCrud>
                  )}
                </div>
              </div>
            </MainCard>
          </Card>
        </MainCard>
      ))}
    </div>
  );
}

export default EventTani;
