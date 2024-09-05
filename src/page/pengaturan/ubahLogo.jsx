import TextInput from '../../components/uiComponents/inputComponents/textInput';
import InputImage from '../../components/inputImage';
import { useEffect, useState } from 'react';
import LoadingAnimation from '../../components/loading';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { GetFooterDetail, UploadFooter } from '../../infrastucture/footer';

export default function UbahLogo() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [fileBaru, setFileBaru] = useState();
  const [alt, setAlt] = useState('');
  const [key, setKey] = useState();

  useEffect(() => {
    GetFooterDetail('logo').then((data) => {
      if (data) {
        console.log('get ', data);
        setKey(data.footer.key);
        setFile(data.footer.value);
        setAlt(data.footer.category);
      } else {
        UploadFooter('logo', '', 'logo', '').then(() => {
          setLoading(false);
          GetFooterDetail('logo').then((data) => {
            if (data) {
              setKey(data.footer.key);
              setFile(data.footer.value);
              setAlt(data.footer.category);
              setLoading(false);
            }
          });
        });
      }
    });
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    UploadFooter(key, fileBaru, key, alt).then(() => setLoading(false));
  };

  return (
    <div>
      {loading && <LoadingAnimation />}
      <div className="flex justify-between">
        <InputImage
          id="logo"
          name="logo"
          imageActive={file}
          title="Upload Logo"
          onChange={(e) => setFileBaru(e)}
        />
        <div className="w-[45%]">
          <div className="flex space-x-2 text-red-600">
            <BsPersonGear size="30px" />
            <TextInput id="judul" name="judul" label="Judul Gambar" disabled value={key} />
          </div>
          <div className="flex space-x-2 text-green-600">
            <CiLocationArrow1 size="30px" />
            <TextInput
              id="alt"
              name="alt"
              label="Alt Gambar"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Update Logo
        </button>
      </div>
    </div>
  );
}
