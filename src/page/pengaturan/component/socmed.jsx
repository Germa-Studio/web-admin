import TextInput from '../../../components/uiComponents/inputComponents/textInput';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import InputCrud from '@/components/page/infoTani/IconCrud';
import { MdPlayArrow } from 'react-icons/md';
import { Text, Button, Modal } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Socmed(props) {
  const user = useSelector((state) => state.state.user);
  const [modalDeleteData, setModalDeleteData] = useState(false);
  const { data, onChange, onDelete, idx } = props;

  return (
    <div className="flex justify-between p-4 border border-solid border-gray-400 rounded-lg">
      <div className="flex gap-1 h-fit items-center">
        <div>{idx + 1}</div>
        <MdPlayArrow />
      </div>
      <div className="w-[100%] flex flex-col items-end gap-6">
        <div className="w-[14%]">
          {user?.peran === 'operator super admin' && (
            <InputCrud
              onClick={() => setModalDeleteData(data.key)}
              icon={<IconTrash />}
              className="w-fit">
              Hapus
            </InputCrud>
          )}
        </div>
        <div className="w-full ">
          <div className="flex space-x-2 text-green-600">
            <BsPersonGear size="30px" />
            <TextInput
              id="nama"
              name="nama"
              label="Nama Social Media"
              value={data.key}
              onChange={(e) => onChange(data.id, 'key', e.target.value)}
            />
          </div>
          <div className="flex space-x-2 text-green-600">
            <CiLocationArrow1 size="30px" />
            <TextInput
              id="link"
              name="link"
              label="Link Social Media"
              value={data.value}
              onChange={(e) => onChange(data.id, 'value', e.target.value)}
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
