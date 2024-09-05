import { useEffect, useState } from 'react';
import TextInput from '../../components/uiComponents/inputComponents/textInput';
import LoadingAnimation from '../../components/loading';
import { GiVillage } from 'react-icons/gi';
import { SlLocationPin } from 'react-icons/sl';

export default function DataBinaan({ data }) {
  const [kec, setKec] = useState('');
  const [desa, setDesa] = useState('');
  const [loading, setLoading] = useState(false);
  const [binaanData, setBinaanData] = useState([]);

  useEffect(() => {
    if (data) {
      setBinaanData(data.data);
      setKec(data.data?.kecamatanBinaan);
      setDesa(data.data?.desaBinaan);
      setLoading(true);
    }
    setLoading(false);
  }, [data]);

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      kec,
      desa
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // AddEventTani(formData).then(()=>setLoading(false))
  };

  return (
    <>
      {binaanData.kecamatanBinaan && (
        <div>
          {loading && <LoadingAnimation />}
          <div className="flex space-x-2">
            <SlLocationPin size="30px" />
            <TextInput
              id="kec"
              name="kec"
              label="Kecamatan"
              value={kec}
              onChange={(e) => setKec(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <GiVillage size="30px" />
            <TextInput
              id="desa"
              name="desa"
              label="Desa"
              value={desa}
              onChange={(e) => setDesa(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-[30%] float-end text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Update Data Binaan
          </button>
        </div>
      )}
    </>
  );
}
