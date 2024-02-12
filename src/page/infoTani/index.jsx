import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainCard from '@/components/MainCard';
import InputCrud from '@/components/page/infoTani/IconCrud';
import { IconEdit, IconEye, IconTrash, IconPlus } from '@tabler/icons-react';
import { GetInfoTani, DeleteInfoTani } from '@/infrastruture';
import { Text, Button, Modal, Card } from '@mantine/core';
import LoadingAnimation from '../../components/loading';
import { FaClock } from 'react-icons/fa6';
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdListBox } from 'react-icons/io';
import { BiCategoryAlt } from 'react-icons/bi';
// import { postLogActivity } from '../../infrastucture/logActivity';
import { setUser } from '../../infrastucture/redux/state/stateSlice';
// import { RootState } from './infrastucture/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const InfoTani = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.state.user);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  useEffect(() => {
    GetInfoTani(location.search).then((data) => {
      setDatas(data.infotani);
      setLoading(false);
    });
  }, [location]);

  const handleDeleteUser = (ids) => {
    DeleteInfoTani(ids);
  };
  const navigateToEdit = (itemId) => {
    history(`/info-tani/edit/${itemId}`, { state: { id: itemId } });
  };
  const navigateToDetail = (itemId) => {
    history(`/info-tani/detail?id=${itemId}`, { state: { id: itemId } });
  };
  return (
    <>
      <div className="pt-16 min-h-[55vh] flex flex-col justify-center">
        {loading && <LoadingAnimation />}
        <div className="w-[100%] flex justify-center">
          <div className="flex justify-between w-[80%] p-[20px]">
            <div
              className="flex justify-center gap-2 cursor-pointer bg-yellow-500 hover:bg-green-primary hover:text-white hover:fill-white rounded-md p-3"
              onClick={() => (window.location.href = '/info-tani/tambah')}>
              <IconPlus className="m-auto rounded-full h-[20px] w-[20px] border border-black me-1" />
              <span className="text-base md:text-xl">Tambah Baru</span>
            </div>
          </div>
        </div>
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

        {datas?.map((item, i) => (
          <MainCard row transparent center gap="0" key={i}>
            <Card shadow="sm" padding="lg" radius="md" withBorder className="w-[80%]">
              <MainCard transparent row>
                <img
                  className="h-min rounded-lg w-52"
                  src={item?.fotoBerita}
                  alt="With default placeholder"
                />
                <MainCard transparent noPadding className="w-[100%]">
                  <h1 className="font-bold text-base md:text-lg text-justify tracking-[1px] text-green-primary max-w-[95%]">
                    {item?.judul}
                  </h1>
                  <div className="flex flex-row justify-between">
                    <div className="max-w-[95%] flex flex-col space-y-3">
                      <div className="flex flex-row space-x-5">
                        <div className="flex flex-row space-x-2 items-center justify-center">
                          <BsPersonCircle size={17} className="fill-grey-primary" />
                          <p className="text-xs sm:text-sm text-grey-primary">{item?.createdBy}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center justify-center">
                          <FaClock size={17} className="fill-grey-primary" />
                          <p className="text-xs sm:text-sm text-grey-primary">
                            {item?.tanggal?.split('T')[0]}
                          </p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center justify-center">
                          <IoMdListBox size={17} className="fill-grey-primary" />
                          <p className="text-xs sm:text-sm text-grey-primary">{item?.status}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center justify-center">
                          <BiCategoryAlt size={17} className="fill-grey-primary" />
                          <p className="text-xs sm:text-sm text-grey-primary">{item?.kategori}</p>
                        </div>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.isi }}
                        className="text-justify text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </MainCard>
                <div className="flex flex-col space-y-1 max-h-fit justify-end">
                  <InputCrud onClick={() => navigateToDetail(item.id)} icon={<IconEye />}>
                    Lihat
                  </InputCrud>
                  <InputCrud onClick={() => navigateToEdit(item.id)} icon={<IconEdit />}>
                    Edit
                  </InputCrud>
                  {user?.peran === 'operator super admin' && (
                    <InputCrud onClick={() => setModalDeleteData(item.id)} icon={<IconTrash />}>
                      Hapus
                    </InputCrud>
                  )}
                </div>
              </MainCard>
            </Card>
          </MainCard>
        ))}
      </div>
    </>
  );
};

export default InfoTani;
