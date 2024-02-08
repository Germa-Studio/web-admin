import { useState, useEffect } from 'react';
import MainCard from '@/components/MainCard';
import InputCrud from '@/components/page/infoTani/IconCrud';
import { IconEdit, IconEye, IconTrash, IconPlus } from '@tabler/icons-react';
import { GatJurnalKegiatan, DeleteJurnalKegiatan } from '@/infrastruture';
import { BsPersonCircle } from 'react-icons/bs';
import { Text, Button, Modal, Card } from '@mantine/core';
import { FaClock } from 'react-icons/fa6';
// import { Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../../components/loadingSession';
import { IoMdListBox } from 'react-icons/io';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoEyeOutline, IoPencilOutline } from 'react-icons/io5';

function JurnalKegiatan() {
  const [datas, setDatas] = useState([]);
  const [checekd, setChecekd] = useState([false]);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  // const history = useNavigate();
  const handleCheckd = (e) => {
    if (e == true) {
      setChecekd(true);
    } else {
      setChecekd(false);
    }
    setId();
  };
  const handleCheckdOne = (ids) => {
    if (id) {
      if (id != ids) {
        setId(ids);
      } else {
        setId();
      }
    } else {
      setId(ids);
    }
  };
  useEffect(() => {
    GatJurnalKegiatan().then((data) => {
      console.log(data.newData);
      setDatas(data.newData);
      setLoading(false);
    });
  }, []);
  const handleDeleteUser = (ids) => {
    DeleteJurnalKegiatan(ids);
  };
  // console.log(datas);
  return (
    <>
      <div className="pt-16 min-h-[55vh] flex flex-col justify-center">
        {loading && <LoadingAnimation />}
        <div className="w-[100%] flex justify-center">
          <div className="flex justify-between w-[80%] p-[20px]">
            <div
              className="flex justify-center gap-2 cursor-pointer bg-yellow-500 hover:bg-green-primary hover:text-white hover:fill-white rounded-md p-3"
              onClick={() => (window.location.href = '/data-penyuluh/jurnal-kegiatan/form')}>
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

        {datas?.map((item, i) => (
          <MainCard row transparent center gap="0" key={i}>
            <Card shadow="sm" padding="lg" radius="md" withBorder className="w-[80%]">
              <MainCard transparent row>
                <img
                  className="h-min rounded-lg w-52"
                  src={item?.gambar}
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
                          <p className="text-xs sm:text-sm text-grey-primary">
                            {item?.dataPenyuluh?.nama}
                          </p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center justify-center">
                          <FaClock size={17} className="fill-grey-primary" />
                          <p className="text-xs sm:text-sm text-grey-primary">
                            {item?.tanggalDibuat?.split('T')[0]}
                          </p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center justify-center">
                          <IoMdListBox size={17} className="fill-grey-primary" />
                          <p className="text-xs sm:text-sm text-grey-primary">{item?.status}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center justify-center">
                          <BiCategoryAlt size={17} className="fill-grey-primary" />
                          <p className="text-xs sm:text-sm text-grey-primary">
                            {item?.statusJurnal}
                          </p>
                        </div>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.uraian
                        }}
                        className="text-justify text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </MainCard>
                <div className="flex flex-col items-end justify-between">
                  <input
                    className="h-[20px] w-[20px] cursor-pointer"
                    type="checkbox"
                    checked={checekd == true ? true : id == item.id ? true : false}
                    onChange={() => handleCheckdOne(item.id)}
                  />
                  <div className="flex flex-col space-y-1 max-h-fit">
                    <Link to={`/data-penyuluh/jurnal-kegiatan/detail/${item.id}`}>
                      <div className="flex h-7 w-7 items-center justify-center bg-green-500">
                        <IconEye className="h-6 w-6 text-white" />
                      </div>
                    </Link>
                    <Link to={`/data-penyuluh/jurnal-kegiatan/edit/${item.id}`}>
                      <div className="flex h-7 w-7 items-center justify-center bg-white">
                        <IconEdit className="h-6 w-6 text-black" />
                      </div>
                    </Link>
                    {item?.statusJurnal === 'publish' && (
                      <InputCrud onClick={() => setModalDeleteData(item.id)} icon={<IconTrash />}>
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
    </>
  );
}

export default JurnalKegiatan;
