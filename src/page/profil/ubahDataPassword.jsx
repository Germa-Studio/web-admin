import { useState } from 'react';
import PasswordInput from '../../components/uiComponents/inputComponents/passwordInput';
import LoadingAnimation from '../../components/loading';
import { MdOutlinePassword } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgPassword } from 'react-icons/cg';
import { UpdateProfile } from '../../infrastucture';

export default function DataPassword() {
  const [lama, setLama] = useState('');
  const [baru, setBaru] = useState('');
  const [confirm, setConfirm] = useState('');
  const [salah, setSalah] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setConfirm(e.target.value);
    if (baru != confirm) setSalah(false);
  };
  const handleSubmit = () => {
    setLoading(true);
    const data = {
      lama,
      baru
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    UpdateProfile(formData).then(()=>setLoading(false))
    // AddEventTani(formData).then(()=>setLoading(false))
  };

  return (
    <div>
      {loading && <LoadingAnimation />}
      <div className="flex space-x-2">
        <MdOutlinePassword size="30px" />
        <PasswordInput
          id="lama"
          name="lama"
          label="Password Lama"
          value={lama}
          onChange={(e) => setLama(e.target.value)}
        />
      </div>
      <div className="flex space-x-2">
        <CgPassword size="30px" />
        <PasswordInput
          id="baru"
          name="baru"
          label="Password Baru"
          value={baru}
          onChange={(e) => setBaru(e.target.value)}
        />
      </div>
      <div className="flex space-x-2">
        <RiLockPasswordLine size="30px" />
        <PasswordInput
          id="confirm"
          name="confirm"
          label="Konfirmasi Password Baru"
          value={confirm}
          onChange={handleChange}
        />
        {salah && <div className="text-red-500 text-sm">Cocokkan Kembali</div>}
      </div>
      <button
        onClick={handleSubmit}
        className="w-[30%] float-end text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Update Data Password
      </button>
    </div>
  );
}
