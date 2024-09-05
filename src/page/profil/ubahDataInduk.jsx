import { useEffect, useState } from 'react';
import NumberInput from '../../components/uiComponents/inputComponents/numberInput';
import LoadingAnimation from '../../components/loading';
import { RiContactsBook2Line } from 'react-icons/ri';
import { GoNumber } from 'react-icons/go';
import { UpdateProfile } from '../../infrastucture';

export default function DataInduk({ data }) {
  const [nokk, setNokk] = useState('');
  const [nik, setNik] = useState('');
  const [indukData, setIndukData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setIndukData(data);
      setNokk(data?.nkk);
      setNik(data?.nik);
    }
    // console.log(data.data)
  }, [data]);
  console.log(indukData);
  const handleSubmit = () => {
    setLoading(true);
    const data = {
      nokk,
      nik
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    UpdateProfile(formData).then(() => setLoading(false));
    // AddEventTani(formData).then(()=>setLoading(false))
  };

  return (
    <div>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      {loading && <LoadingAnimation />}
      {indukData?.nkk && (
        <div className="flex space-x-2">
          <RiContactsBook2Line size="30px" />
          <NumberInput
            id="nokk"
            name="NoKK"
            label="No.KK"
            value={nokk}
            onChange={(e) => setNokk(e.target.value)}
          />
        </div>
      )}
      {indukData?.nik && (
        <div className="flex space-x-2">
          <GoNumber size="30px" />
          <NumberInput
            id="nik"
            name="nik"
            label="NIK"
            value={nik}
            pattern="\d{16}"
            maxLength="16"
            onChange={(e) => setNik(e.target.value)}
          />
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="w-[30%] float-end text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Update Data Induk
      </button>
      {/* </form> */}
    </div>
  );
}
