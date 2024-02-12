import { useState, useEffect } from 'react';
import NumberInput from '../../components/uiComponents/inputComponents/numberInput';
import LoadingAnimation from '../../components/loading';
import { RiContactsBook2Line } from 'react-icons/ri';
import { GoNumber } from 'react-icons/go';
import { GetDetailProfile } from '../../infrastucture';

export default function DataInduk() {
  const [nip, setNip] = useState('');
  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()

  // useEffect(() => {
  //   GetDetailProfile().then((data) => {
  //     setData(data);
  //   });
  //   console.log(data.data)
  // }, []);

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      nip,
      nik
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // AddEventTani(formData).then(()=>setLoading(false))
  };

  return (
    <div>
      {loading && <LoadingAnimation />}
      <div className="flex space-x-2">
        <RiContactsBook2Line size="30px" />
        <NumberInput
          id="nip"
          name="nip"
          label="NIP"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
        />
      </div>
      <div className="flex space-x-2">
        <GoNumber size="30px" />
        <NumberInput
          id="nik"
          name="nik"
          label="NIK"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-[30%] float-end text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Update Data Induk
      </button>
    </div>
  );
}
