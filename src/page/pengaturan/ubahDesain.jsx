import { useEffect, useState } from 'react';
import NumberInput from '../../components/uiComponents/inputComponents/numberInput';
import LoadingAnimation from '../../components/loading';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import Banner from './component/banner';
import { DeleteFooter, GetFooterCategory, GetFooterDetail, UploadFooter } from '../../infrastucture/footer';
import TextInput from '../../components/uiComponents/inputComponents/textInput';

export default function UbahDesain() {
  const [primer, setPrimer] = useState('');
  const [hover, setHover] = useState('');
  const [sekunder, setSekunder] = useState('');
  const [clickAdd, setClickAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [handleNull, setHandleNull] = useState(false)
  const [data2, setData2] = useState([
    {
      id: '1',
      gambar: '',
      judul: '',
      alt: ''
    },
    {
      id: '2',
      gambar: '',
      judul: '',
      alt: ''
    },
    {
      id: '3',
      gambar: '',
      judul: '',
      alt: ''
    }
  ]);

  useEffect(() => {
    GetFooterDetail('warnaPrimer').then((data) => {
      if (data) {
        console.log('get ', data);
        setPrimer(data.footer.value);
      }else {
        UploadFooter('warnaPrimer', '', 'kode', 'warna').then(() => {
          setLoading(false);
          GetFooterDetail('warnaPrimer').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setPrimer(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('warnaSekunder').then((data) => {
      if (data) {
        console.log('get ', data);
        setSekunder(data.footer.value);
      } else {
        UploadFooter('warnaSekunder', '', 'kode', 'warna').then(() => {
          setLoading(false);
          GetFooterDetail('warnaSekunder').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setSekunder(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('warnaHover').then((data) => {
      if (data) {
        console.log('get ', data);
        setHover(data.footer.value);
      } else {
        UploadFooter('warnaHover', '', 'kode', 'warna').then(() => {
          setLoading(false);
          GetFooterDetail('warnaHover').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setHover(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
  }, [handleNull]);

  useEffect(() => {
    GetFooterCategory('banner', false).then((data) => {
      if (data) {
        console.log('banner ', data);
        setData2(data.footer);
        setLoading(false);
      } else {
        // console.log("else ", clickAdd)
        UploadFooter('banner-1', '', 'banner-1', 'banner').then(() => {
          setLoading(false);
          GetFooterCategory('banner', false).then((data) => {
            if (data) {
              console.log('banner ', data);
              setData2(data.footer);
              setLoading(false);
              setClickAdd(true);
            }
          });
        });
      }
    });
  }, [clickAdd]);

  const handleSubmit1 = () => {
    setLoading(true);
    // console.log("data ", key, fileBaru,alt)
    UploadFooter('warnaPrimer', '', primer, 'warna').then(() => setLoading(false));
    UploadFooter('warnaSekunder', '', sekunder, 'warna').then(() => setLoading(false));
    UploadFooter('warnaHover', '', hover, 'warna').then(() => setLoading(false));
  };

  const handleAdd = () => {
    const index = data2.length+1;
    UploadFooter(`banner-${index}`, '', `link ${index}`, 'banner').then(() => {
      setLoading(false);
      setClickAdd(!clickAdd);
    });
  };

  const handleChange = (id, key, value) => {
    const index = data2.findIndex((item) => item.id === id);
    console.log("change ", id, key, value)
    if (index !== -1) {
      setData2((prevData) => {
        const newData = [...prevData];
        newData[index][key] = value;
        return newData;
      });
    }
  };

  const handleSubmit2 = () => {
    setLoading(true);
    // console.log("data ", key, fileBaru,alt)
    data2.map(data=>(
      UploadFooter(data.key, data.file, data.value, data.category).then(()=>setLoading(false))
    ))
    // UploadFooter(key,fileBaru,key,alt).then(()=>setLoading(false))
  };

  const handleDeleteBanner = (key) => {
    DeleteFooter(key);
  };

  return (
    <div>
      <div>
        {loading && <LoadingAnimation />}
        <div className="text-lg text-green-primary font-extrabold mb-4">WARNA WEBSITE</div>
        <div className="flex space-x-2 text-green-600">
          <BsPersonGear size="30px" />
          <TextInput
            id="primer"
            name="primer"
            label="Kode Warna Primer"
            value={primer}
            onChange={(e) => setPrimer(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 text-green-600">
          <CiLocationArrow1 size="30px" />
          <TextInput
            id="sekunder"
            name="sekunder"
            label="Kode Warna Sekunder"
            value={sekunder}
            onChange={(e) => setSekunder(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 text-green-600">
          <CiLocationArrow1 size="30px" />
          <TextInput
            id="hover"
            name="hover"
            label="Kode Warna Hover"
            value={hover}
            onChange={(e) => setHover(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit1}
            className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Update Warna Website
          </button>
        </div>
      </div>
      <div>
        {loading && <LoadingAnimation />}
        <div className="text-lg text-green-primary font-extrabold mb-4">BANNER WEBSITE</div>
        <div className="flex flex-col gap-2">
          {data2?.map((data2, index) => (
            <Banner key={data2.id} data={data2} onChange={handleChange} onDelete={handleDeleteBanner} idx={index} />
          ))}
        </div>
        <div className="mt-4 flex gap-3 justify-end">
          <button
            onClick={handleAdd}
            className="w-[30%] text-white bg-orange-primary hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Tambah Banner
          </button>
          <button
            onClick={handleSubmit2}
            className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Update Banner
          </button>
        </div>
      </div>
    </div>
  );
}