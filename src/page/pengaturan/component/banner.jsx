import TextInput from '../../../components/uiComponents/inputComponents/textInput';
import InputImage from '../../../components/inputImage';
import { BsPersonGear } from 'react-icons/bs';
import InputCrud from '@/components/page/infoTani/IconCrud';
import { MdPlayArrow } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Text, Button, Modal } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export default function Banner(props) {
  const user = useSelector((state) => state.state.user);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const { data, onChange, onDelete, idx } = props;

  return (
    <div className="flex justify-between p-4 border border-solid border-gray-400 rounded-lg">
      <div className="flex gap-1 h-fit items-center">
        <div>{idx + 1}</div>
        <MdPlayArrow />
      </div>
      <InputImage
        id={data.id}
        name="logo"
        imageActive={data.value}
        title="Masukkan Foto"
        onChange={(e) => onChange(data.id, 'file', e, data.value)}
      />
      <div className="w-[45%] flex flex-col items-end gap-6">
        <div className="w-[30%]">
          {user?.peran === 'operator super admin' && (
            <InputCrud
              onClick={() => setModalDeleteData(data.key)}
              icon={<IconTrash />}
              className="w-fit">
              Hapus
            </InputCrud>
          )}
        </div>
        <div className="w-full">
          <div className="flex space-x-2 text-red-600">
            <BsPersonGear size="30px" />
            <TextInput
              id="judul"
              name="judul"
              label="Judul Gambar"
              value={data.key}
              placeholder={data.key}
              disabled
              // onChange={(e) => onChange(data.id,"key",e.target.value)}
            />
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
              onDelete(modalDeleteData);
              setModalDeleteData(false);
            }}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
