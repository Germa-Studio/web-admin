import { useEffect, useState } from 'react';
import LoadingAnimation from '../../components/loading';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { clsx } from 'clsx';
import Faq from './component/faq';
import {
  DeleteFaq,
  GetFaq,
  GetFooterDetail,
  UpdateFaqDetail,
  UploadFaq,
  UploadFooter
} from '../../infrastucture/footer';
import TextInput from '../../components/uiComponents/inputComponents/textInput';

export default function UbahFooter() {
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');
  const [fax, setFax] = useState('');
  const [wa, setWa] = useState('');
  const [loading, setLoading] = useState(false);
  const chooseBase =
    'rounded-ss-xl rounded-se-xl w-[25%] text-center h-fit py-2 w-[100%] min-w-8 font-bold text-white transition-all bg-orange-primary hover:bg-green-sidebar-hover duration-200 ease-in-out';
  const chooseActive =
    'rounded-ss-xl rounded-se-xl w-[25%] text-center h-12 w-[100%] min-w-8 font-bold text-white transition-all bg-[#307B28] hover:bg-green-sidebar-hover duration-200 ease-in-out';
  const [term, setTerm] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [about, setAbout] = useState('');
  const [filter, setFilter] = useState('faq');
  const [faq, setFaq] = useState([]);
  const [clickAdd, setClickAdd] = useState(false);

  useEffect(() => {
    GetFooterDetail('email').then((data) => {
      if (data) {
        console.log('get ', data);
        setEmail(data.footer.value);
      } else {
        UploadFooter('email', '', 'email', 'hubungan').then(() => {
          setLoading(false);
          GetFooterDetail('email').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setEmail(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('telepon').then((data) => {
      if (data) {
        console.log('get ', data);
        setTelp(data.footer.value);
      } else {
        UploadFooter('telepon', '', 'telepon', 'hubungan').then(() => {
          setLoading(false);
          GetFooterDetail('telepon').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setTelp(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('fax').then((data) => {
      if (data) {
        console.log('get ', data);
        setFax(data.footer.value);
      } else {
        UploadFooter('fax', '', 'fax', 'hubungan').then(() => {
          setLoading(false);
          GetFooterDetail('fax').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setFax(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('whattsapp').then((data) => {
      if (data) {
        console.log('get ', data);
        setWa(data.footer.value);
      } else {
        UploadFooter('whattsapp', '', 'whattsapp', 'hubungan').then(() => {
          setLoading(false);
          GetFooterDetail('whattsapp').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setWa(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('term').then((data) => {
      if (data) {
        console.log('get ', data);
        setTerm(data.footer.value);
      } else {
        UploadFooter('term', '', 'term of use', 'hubungan').then(() => {
          setLoading(false);
          GetFooterDetail('term').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setTerm(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('privacy').then((data) => {
      if (data) {
        console.log('get ', data);
        setPrivacy(data.footer.value);
      } else {
        UploadFooter('privacy', '', 'privacy policy', 'hubungan').then(() => {
          setLoading(false);
          GetFooterDetail('privacy').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setPrivacy(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
    GetFooterDetail('about').then((data) => {
      if (data) {
        console.log('get ', data);
        setAbout(data.footer.value);
      } else {
        UploadFooter('about', '', 'about us', 'hubungan').then(() => {
          setLoading(false);
          GetFooterDetail('about').then((data) => {
            if (data) {
              // console.log('socmed ', data);
              setAbout(data.footer.value);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    GetFaq().then((data) => {
      if (data) {
        console.log('faq ', data);
        setFaq(data.faq);
        setLoading(false);
      } else {
        UploadFaq('Masukkan Pertanyaan', 'Masukkan Jawaban').then(() => {
          setLoading(false);
          GetFaq().then((data) => {
            if (data) {
              console.log('socmed ', data);
              setFaq(data.faq);
              setLoading(false);
              // setClickAdd(true);
            }
          });
        });
      }
    });
  }, [clickAdd]);

  const handleSubmit1 = () => {
    setLoading(true);
    UploadFooter('email', '', email, 'hubungi').then(() => setLoading(false));
    UploadFooter('telepon', '', telp, 'hubungi').then(() => setLoading(false));
    UploadFooter('fax', '', fax, 'hubungi').then(() => setLoading(false));
    UploadFooter('whattsapp', '', wa, 'hubungi').then(() => setLoading(false));
  };

  const handleClick = (e) => {
    setFilter(e.target.value);
  };

  const handleAdd = () => {
    UploadFaq('Masukkan Pertanyaan', 'Masukkan Jawaban').then(() => {
      setLoading(false);
      setClickAdd(!clickAdd);
    });
  };

  const handleChange = (id, key, value) => {
    const index = faq.findIndex((item) => item.id === id);
    if (index !== -1) {
      setFaq((prevData) => {
        const newData = [...prevData];
        newData[index][key] = value;
        return newData;
      });
    }
  };

  const handleSubmit2 = () => {
    if (filter !== 'faq') {
      setLoading(true);
      let valueToSend;
      if (filter === 'term') {
        valueToSend = term;
      } else if (filter === 'privacy') {
        valueToSend = privacy;
      } else if (filter === 'about') {
        valueToSend = about;
      }
      console.log(valueToSend);
      UploadFooter(filter, '', valueToSend, 'bantuan').then(() => setLoading(false));
    } else {
      setLoading(true);
      faq.map((data) =>
        UpdateFaqDetail(data.id, data.question, data.answer).then(() => {
          setLoading(false);
          setClickAdd(!clickAdd);
        })
      );
    }
  };

  const handleDeleteFAQ = (id) => {
    DeleteFaq(id);
  };

  return (
    <div>
      <div>
        {loading && <LoadingAnimation />}
        <div className="text-lg text-green-primary font-extrabold mb-4">HUBUNGI PERUSAHAAN</div>
        <div className="flex space-x-2 text-green-600">
          <BsPersonGear size="30px" />
          <TextInput
            id="email"
            name="email"
            label="Email Website"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 text-green-600">
          <CiLocationArrow1 size="30px" />
          <TextInput
            id="telp"
            name="telp"
            label="Telepon Website"
            value={telp}
            onChange={(e) => setTelp(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 text-green-600">
          <BsPersonGear size="30px" />
          <TextInput
            id="fax"
            name="fax"
            label="Fax Website"
            value={fax}
            onChange={(e) => setFax(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 text-green-600">
          <CiLocationArrow1 size="30px" />
          <TextInput
            id="wa"
            name="wa"
            label="Whatssapp Website"
            value={wa}
            onChange={(e) => setWa(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit1}
            className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Update Kontak
          </button>
        </div>
      </div>
      <div>
        {loading && <LoadingAnimation />}
        <div className="text-lg text-green-primary font-extrabold mb-4">BANTUAN WEBSITE</div>
        <div className="flex justify-between h-12 items-end">
          <button
            className={clsx(filter === 'faq' ? chooseActive : chooseBase)}
            onClick={handleClick}
            value={'faq'}>
            FAQ
          </button>
          <button
            className={clsx(filter === 'term' ? chooseActive : chooseBase)}
            onClick={handleClick}
            value={'term'}>
            Term Of Use
          </button>
          <button
            className={clsx(filter === 'privacy' ? chooseActive : chooseBase)}
            onClick={handleClick}
            value={'privacy'}>
            Privacy Policy
          </button>
          <button
            className={clsx(filter === 'about' ? chooseActive : chooseBase)}
            onClick={handleClick}
            value={'about'}>
            About Us
          </button>
        </div>
        <div className="rounded-es-lg rounded-ee-lg p-4 drop-shadow-xl border border-solid border-gray-400">
          <div className="flex flex-col gap-2">
            {filter === 'faq' ? (
              faq?.map((faq, index) => (
                <Faq
                  key={faq.id}
                  data={faq}
                  onChange={handleChange}
                  onDelete={handleDeleteFAQ}
                  idx={index}
                />
              ))
            ) : (
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="!outline-0 !shadow-none !border-none !resize-none !drop-shadow-none !p-3"
                value={
                  filter === 'term'
                    ? term
                    : filter === 'privacy'
                      ? privacy
                      : filter === 'about'
                        ? about
                        : ''
                }
                onChange={(e) =>
                  filter === 'term'
                    ? setTerm(e.target.value)
                    : filter === 'privacy'
                      ? setPrivacy(e.target.value)
                      : filter === 'about'
                        ? setAbout(e.target.value)
                        : ''
                }></textarea>
            )}
          </div>
          <div className="mt-4 flex gap-3 justify-end">
            <button
              onClick={handleAdd}
              className={
                filter != 'faq'
                  ? 'hidden'
                  : 'w-[30%] text-white bg-orange-primary hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              }>
              Tambah FAQ
            </button>
            <button
              onClick={handleSubmit2}
              className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Update FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
