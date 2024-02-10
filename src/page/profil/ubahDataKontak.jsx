import { useEffect, useState } from 'react';
import NumberInput from '../../components/uiComponents/inputComponents/numberInput';
import EmailInput from '../../components/uiComponents/inputComponents/emailInput';
import LoadingAnimation from '../../components/loading';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

export default function DataKontak({data}) {
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(data){
      setEmail(data.data.email);
      setWhatsapp(data.data.noTelp);
    }
  },[data]);

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      whatsapp,
      email
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
        <FaWhatsapp size="30px" />
        <NumberInput
          id="wa"
          name="wa"
          label="WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
      </div>
      <div className="flex space-x-2">
        <MdOutlineEmail size="30px" />
        <EmailInput
          id="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-[30%] float-end text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Update Data Kontak
      </button>
    </div>
  );
}
