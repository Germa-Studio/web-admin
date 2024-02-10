import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ListUser } from '@/infrastruture';
import { Text, Button, Modal, Tooltip, Anchor, Breadcrumbs } from '@mantine/core';
import LoadingAnimation from '../../components/loadingSession';
import { VerifyingUser, DeleteUser } from '../../infrastucture';
import { setUser } from '../../infrastucture/redux/state/stateSlice';
// import { RootState } from './infrastucture/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Akses User' },
  { title: 'List User' }
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

const VerifikasiUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.state.user);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [modalVerifikasiUser, setVerifikasiUser] = useState(false);
  useEffect(() => {
    ListUser().then((data) => {
      setDatas(data.data);
      setLoading(false);
    });
  }, []);
  console.log(user)

  const handleDeleteUser = (ids) => {
    DeleteUser(ids);
  };
  const handleVerify = (ids) => {
    VerifyingUser(ids);
    // refresh page
    window.location.reload();
  };
  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">AKSES USER</h3>
      {/* <SearchInput placeholder="Cari NIK PETANI / POKTAN" /> */}
      <div className="relativemt-6 mt-4 flex items-center w-full">
        <Modal
          opened={modalDeleteData}
          onClose={() => setModalDeleteData(false)}
          withCloseButton={false}
          centered>
          <Text>Apakah Anda Yakin Akan Menolak User Ini ?</Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
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
              Tolak
            </Button>
          </div>
        </Modal>
        <Modal
          opened={modalVerifikasiUser}
          onClose={() => setVerifikasiUser(false)}
          withCloseButton={false}
          centered>
          <Text>Apakah Anda Yakin Ingin Memverifikasi Akun Ini ?</Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <Button
              color="cyan"
              style={{
                color: 'white',
                backgroundColor: '#303A47',
                marginRight: 8
              }}
              onClick={() => setVerifikasiUser(false)}>
              Cancel
            </Button>
            <Button
              color="cyan"
              style={{ color: 'white', backgroundColor: 'green' }}
              type="submit"
              onClick={() => {
                handleVerify(modalVerifikasiUser);
                setVerifikasiUser(false);
              }}>
              Verifikasi
            </Button>
          </div>
        </Modal>
        <div className="bg-[#D9D9D9] rounded-lg w-full">
          <div className="relative bg-[#136B09] p-4 flex w-full justify-between rounded-t-lg shadow-lg">
            <h3 className="text-white text-2xl font-bold px-3">
              {/* DATA TABEL PETANI */}
              TABEL LIST USER
            </h3>
          </div>
          <div className="pt-0">
            <div className="h-[calc(100vh-200px) p-6 flex justify-between items-center">
              <table className="min-w-full shadow-md">
                <thead className="bg-[#079073] text-white">
                  <tr>
                    <th className="sticky top-0 px-4 py-2 truncate">NO</th>
                    <th className="sticky top-0 px-4 py-2 truncate ">NAMA</th>
                    <th className="sticky top-0 px-4 py-2 truncate ">NIK</th>
                    <th className="sticky top-0 px-4 py-2 truncate ">PROFESI</th>
                    <th className="sticky top-0 px-4 py-2 truncate ">NOMOR TELEPON</th>
                    <th className="sticky top-0 px-4 py-2 truncate ">EMAIL</th>
                    <th className="sticky top-0 px-4 py-2 truncate ">STATUS AKUN</th>
                    {/* <th className="sticky top-0 px-4 py-2 truncate ">
                      PEMBINA
                    </th> */}
                    {user?.peran !== 'operator poktan' && (
                      <th className="sticky top-0 px-4 py-2 truncate">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {datas?.map((item, index) => (
                    <tr
                      key={item?.id}
                      className={`${index % 2 === 0 ? 'bg-white text-black font-medium' : 'bg-[#D1D9D3] text-emerald-800 font-medium'}`}>
                      <td className="px-4 py-2 text-center ">{index + 1}</td>
                      <td className="px-4 py-2 text-center ">{item?.nama}</td>
                      <td className="px-4 py-2 text-center ">{item?.NIK}</td>
                      <td className="px-4 py-2 text-center ">{item?.peran}</td>
                      <td className="px-4 py-2 text-center ">{item?.no_wa}</td>
                      <td className="px-4 py-2 text-center ">{item.email}</td>
                      <td className="px-4 py-2 text-center ">
                        {item?.isVerified == true ? 'Verified' : 'Not Verified'}
                      </td>
                      {/* <td className="px-4 py-2 text-center ">{item?.penyuluh}</td> */}
                      {user?.peran !== 'operator poktan'  && (  
                        <td className="px-2 py-2 text-center">
                          {item?.isVerified ? (
                            <Tooltip label="Sudah Terverifikasi">
                              <button className="disabled cursor-pointer text-green-800">
                                Sudah Terverifikasi
                              </button>
                            </Tooltip>
                          ) : (
                            <>
                              <Tooltip label="Terima">
                                <FontAwesomeIcon
                                  onClick={() => setVerifikasiUser(item?.id)}
                                  icon={faCheck}
                                  className="cursor-pointer text-green-500 hover:text-green-600 mr-2"
                                />
                              </Tooltip>
                              <Tooltip label="Tolak">
                                <FontAwesomeIcon
                                  onClick={() => setModalDeleteData(item?.id)}
                                  icon={faXmark}
                                  className="cursor-pointer text-red-500 hover:text-red-600"
                                />
                              </Tooltip>
                            </>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && <LoadingAnimation />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiUser;
