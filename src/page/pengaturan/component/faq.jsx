import TextInput from '../../../components/uiComponents/inputComponents/textInput';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { MdPlayArrow } from 'react-icons/md';
import InputCrud from '@/components/page/infoTani/IconCrud';
import { useSelector } from 'react-redux';
import { Text, Button, Modal, Card } from '@mantine/core';
import { IconEdit, IconEye, IconTrash, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export default function Faq(props) {
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
              onClick={() => setModalDeleteData(data.id)}
              icon={<IconTrash />}
              className="w-fit">
              Hapus
            </InputCrud>
          )}
        </div>
        <div className="w-full">
          <div className="flex space-x-2 text-green-600">
            <BsPersonGear size="30px" />
            <TextInput
              id="question"
              name="question"
              label="Pertanyaan"
              value={data.question}
              onChange={(e) => onChange(data.id, 'question', e.target.value)}
            />
          </div>
          <div className="flex space-x-2 text-green-600">
            <CiLocationArrow1 size="30px" />
            <TextInput
              id="answer"
              name="answer"
              label="Jawaban"
              value={data.answer}
              onChange={(e) => onChange(data.id, 'answer', e.target.value)}
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
