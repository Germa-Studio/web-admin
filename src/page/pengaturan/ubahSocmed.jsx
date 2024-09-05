import { useEffect, useState } from 'react';
import LoadingAnimation from '../../components/loading';
import Socmed from './component/socmed';
import { DeleteFooter, GetFooterCategory, UploadFooter } from '../../infrastucture/footer';
import Swal from 'sweetalert2';

export default function UbahSocmed() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isAdd, setAdd] = useState(false);
  const [clickAdd, setClickAdd] = useState(false);
  const [socmed] = useState(['Instagram', 'Youtube', 'Tiktok', 'Facebook', 'X']);

  useEffect(() => {
    GetFooterCategory('socmed', true).then((data) => {
      if (data) {
        // console.log('socmed ', data);
        setData(data.footer);
        setLoading(false);
      } else {
        UploadFooter('Instagram', '', 'link instagram', 'socmed').then(() => {
          setLoading(false);
          GetFooterCategory('socmed', true).then((data) => {
            if (data) {
              setData(data.footer);
              setLoading(false);
            }
          });
        });
      }
    });
  }, [clickAdd]);

  const handleAdd = (key) => {
    const index = data.findIndex((item) => item.key == key);
    if (index !== -1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Socmed sudah ada'
      });
    } else {
      UploadFooter(key, '', `link ${key}`, 'socmed').then(() => {
        setLoading(false);
        setClickAdd(!clickAdd);
      });
    }
  };

  const handleChange = (id, key, value) => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      setData((prevData) => {
        const newData = [...prevData];
        newData[index][key] = value;
        return newData;
      });
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    data.map((data) =>
      UploadFooter(data.key, '', data.value, data.category).then(() => setLoading(false))
    );
  };

  const handleDeleteSocmed = (key) => {
    DeleteFooter(key);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {loading && <LoadingAnimation />}
        <div className="text-lg text-green-primary font-extrabold mb-4">SOCIAL MEDIA</div>
        {console.log('yuhu ', data)}
        {data?.map((data, index) => (
          <Socmed
            key={data.id}
            data={data}
            onChange={handleChange}
            onDelete={handleDeleteSocmed}
            idx={index}
          />
        ))}
        <div className="mt-4 flex gap-3 justify-end">
          <div className="w-[30%]">
            <button
              onClick={() => setAdd(!isAdd)}
              className="h-fit w-full text-white bg-orange-primary hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Tambah Social Media
            </button>
            <div
              className={
                isAdd
                  ? 'text-[#307B28] mt-2 border-2 border-orange-primary bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm'
                  : 'hidden'
              }>
              {socmed.map((data) => (
                <div
                  onClick={() => handleAdd(data)}
                  className="py-2 w-full hover:!bg-orange-primary hover:!text-white text-center cursor-pointer"
                  key={data}>
                  {data}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-[30%] h-fit text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Update Social Media
          </button>
        </div>
      </div>
    </div>
  );
}
