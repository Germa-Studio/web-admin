// import React from "react";
import MainCard from '@/components/MainCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Text, Button, Modal } from '@mantine/core';
import { getNotification, updateStatusUser } from '../infrastucture';
const Notification = () => {
  const [Datas, setDatas] = useState([]);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  useEffect(() => {
    getNotification().then((data) => setDatas(data));
  }, []);

  const handleClick = (id) => {
    updateStatusUser(id);
  };
  return (
    <MainCard transparent row center fullWidth>
      <MainCard width="50%" className="mt-14">
        <Modal
          opened={modalDeleteData}
          onClose={() => setModalDeleteData('')}
          withCloseButton={false}
          centered>
          <Text>Apakah Kamu Yakin Akan Memverifikasi {modalDeleteData.nama || 'data ini'} ?</Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <Button
              color="cyan"
              style={{ color: 'white', backgroundColor: '#303A47', marginRight: 8 }}
              onClick={() => setModalDeleteData(false)}>
              Cancel
            </Button>
            <Button
              color="cyan"
              style={{ color: 'white', backgroundColor: 'blue' }}
              type="submit"
              onClick={() => {
                handleClick(modalDeleteData.id);
                setModalDeleteData('');
              }}>
              Verifikasi
            </Button>
          </div>
        </Modal>
        <p className="text-center font-bold text-xl">Terdapat User Baru Sebagai berikut:</p>
        {Datas.map((data, index) => (
          <div className="grid grid-cols-2 border rounded-md shadow-md" key={index}>
            <div className="px-5 py-2">
              <p className="font-bold">
                Nama : <span className="font-medium">{data?.nama}</span>
              </p>
              <p className="font-bold">
                NIK : <span className="font-medium">{data?.NIK}</span>
              </p>
            </div>
            <div className="flex justify-end px-5 py-2 rounded-md">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-2 rounded-md box-shadow"
                onClick={() => setModalDeleteData({ id: data.id, nama: data?.nama })}>
                <FontAwesomeIcon icon={faCheckCircle} className="text-white mr-2 cursor-pointer" />
                Verifikasi
              </button>
            </div>
          </div>
        ))}
      </MainCard>
    </MainCard>
  );
};

export default Notification;
