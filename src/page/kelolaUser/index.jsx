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
import { useSearchParams } from 'react-router-dom';
import Table from '../../components/table/Table';

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
  const [resp, setResp] = useState();
  const [loading, setLoading] = useState(true);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const [modalVerifikasiUser, setVerifikasiUser] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  useEffect(() => {
    ListUser(page, limit).then((data) => {
      setResp(data);
      setLoading(false);
    });
  }, [page, limit]);

  const handleDeleteUser = (ids) => {
    DeleteUser(ids);
    window.location.reload();
  };

  const handleVerify = (ids) => {
    VerifyingUser(ids);
    window.location.reload();
  };

  const columns = [
    {
      accessorKey: 'no',
      header: 'NO',
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: 'nama',
      header: 'NAMA',
    },
    {
      accessorKey: 'NIK',
      header: 'NIK',
    },
    {
      accessorKey: 'peran',
      header: 'PROFESI',
    },
    {
      accessorKey: 'no_wa',
      header: 'NOMOR TELEPON',
    },
    {
      accessorKey: 'email',
      header: 'EMAIL',
    },
    {
      accessorKey: 'isVerified',
      header: 'STATUS AKUN',
      cell: (info) => (info.getValue() ? 'Verified' : 'Not Verified'),
    },
    {
      accessorKey: 'actions',
      header: 'Action',
      cell: (info) => {
        const item = info.row.original;
        return user?.peran !== 'operator poktan' ? (
          item.isVerified ? (
            <Tooltip label="Sudah Terverifikasi">
              <button className="disabled cursor-pointer text-green-800">
                Sudah Terverifikasi
              </button>
            </Tooltip>
          ) : (
            <>
              <Tooltip label="Terima">
                <FontAwesomeIcon
                  onClick={() => setVerifikasiUser(item.id)}
                  icon={faCheck}
                  className="cursor-pointer text-green-500 hover:text-green-600 mr-2"
                />
              </Tooltip>
              <Tooltip label="Tolak">
                <FontAwesomeIcon
                  onClick={() => setModalDeleteData(item.id)}
                  icon={faXmark}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                />
              </Tooltip>
            </>
          )
        ) : null;
      },
    },
  ];

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">AKSES USER</h3>
      <div className="relative mt-4 flex items-center w-full">
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
        <div className="w-full">
          {loading && <LoadingAnimation />}
          <Table
            className="pt-0"
            data={resp}
            columns={columns}
            isLoading={loading}
            withPaginationCount
            withPaginationControl
          />
        </div>
      </div>
    </div>
  );
};

export default VerifikasiUser;
