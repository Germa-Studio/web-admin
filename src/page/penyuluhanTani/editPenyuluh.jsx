import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import InputImage from '@/components/inputImage';
import { updatePenyuluhById, getPenyuluhById } from '@/infrastruture';
import { MultiSelect, Tabs } from '@mantine/core';
import { fecthKecamatan, fecthDesa } from '../../infrastucture/daerah';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../../components/loading';
import { GetKelompok } from '../../infrastucture';
import KecamatanBinaan from './kecamatanBinaan';
import DesaBinaan from './desaBinaan';
const EditPenyuluhanTani = () => {
  const [NIP, setNIP] = useState('');
  const [NoWa, setNoWa] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [kecamatanBinaan, setKecamatanBinaan] = useState('');
  const [desa, setDesa] = useState('');
  const [alamat, setAlamat] = useState('');
  const [foto, setFoto] = useState('');
  const [namaProduct, setNamaProduct] = useState('');
  const [daftarKecamatan, setDaftarKecamatan] = useState([]);
  const [dafatarDesa, setDafatarDesa] = useState([]);
  const [dafatarDesaBinaan, setDafatarDesaBinaan] = useState([]);
  const [kecamatanActive, setKecamatanActive] = useState('');
  const [kecamatanBinaanActive, setKecamatanBinaanActive] = useState('');
  const [idKecamatan, setIdKecamanan] = useState('');
  const [idKecamatanBinaan, setIdKecamananBinaan] = useState('');
  const [loading, setLoading] = useState(true);
  const [kelompok, setKelompok] = useState([]);
  const [selectedKelompokIds, setSelectedKelompokIds] = useState([]);
  const [penyuluh, setPenyuluh] = useState();

  const { id } = useParams();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      nik: NIP,
      NoWa,
      email,
      nama,
      password,
      kecamatanId: idKecamatan,
      desaId: desa,
      foto,
      namaProduct,
      alamat
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    updatePenyuluhById(formData, id).then(() => setLoading(false));
  };

  useEffect(() => {
    fecthKecamatan().then((res) => {
      setDaftarKecamatan(res.data);
    });
  }, []);

  useEffect(() => {
    if (id) {
      getPenyuluhById(id).then((item) => {
        const data = item?.dataDaftarPenyuluh;
        setPenyuluh(data);
        setLoading(false);
        setNIP(data?.nik);
        setNoWa(data?.noTelp);
        setEmail(data?.email);
        setNama(data?.nama);
        setIdKecamanan(data?.kecamatanId ?? '');
        setKecamatanActive(data?.kecamatanId ?? '');
        setDesa(data?.desaId ?? '');
        setFoto(data?.foto);
        setAlamat(data?.alamat);
        setNamaProduct(data?.namaProduct);

        setSelectedKelompokIds(data?.kelompoks.map((kelompok) => kelompok.id.toString()));
      });
    }
  }, [id]);

  const handleSelectKecamatan = (e) => {
    setIdKecamanan(e);
    setKecamatanActive(e);
    fecthDesa(e).then((res) => {
      setDafatarDesa(res.data);
    });
  };

  const handleSelectKecamatanBinaan = (e) => {
    const id = e?.split('-')[1];
    const nama = e?.split('-')[0];
    setKecamatanBinaan(nama);
    setKecamatanBinaanActive(e);
    fecthDesa(id).then((res) => {
      const data = res?.data?.map((item) => {
        return { value: item.nama, label: item.nama };
      });
      setDafatarDesaBinaan(data);
    });
  };

  useEffect(() => {
    fecthDesa(idKecamatan).then((res) => setDafatarDesa(res.data));
  }, [idKecamatan]);

  useEffect(() => {
    if (daftarKecamatan && kecamatanBinaan && !kecamatanBinaanActive) {
      const filteredData = daftarKecamatan?.filter((item) => {
        const parts = item?.nama?.split('-');
        return parts[0] == kecamatanBinaan;
      });
      const kecamatanActivate = `${filteredData[0]?.nama}-${filteredData[0]?.id}`;
      setIdKecamananBinaan(filteredData[0]?.id);
      setKecamatanBinaanActive(kecamatanActivate);
    }
  }, [daftarKecamatan, kecamatanBinaan, kecamatanBinaanActive]);

  useEffect(() => {
    if (idKecamatanBinaan) {
      fecthDesa(idKecamatanBinaan).then((res) => {
        const data = res?.data?.map((item) => {
          return { value: item.nama, label: item.nama };
        });
        setDafatarDesaBinaan(data);
      });
    }
  }, [idKecamatanBinaan]);

  useEffect(() => {
    GetKelompok().then((data) => {
      if (data && typeof data.dataKelompok === 'object') {
        // Get kelompok options from data
        const kelompokOptions = Object.values(data.dataKelompok).map((item) => ({
          value: item.id.toString(), // Convert id to string
          label: `${item.namaKelompok} - ${item.desa}, ${item.kecamatan}`, // Combine label
          kecamatan: item.kecamatan.toString() // Convert kecamatan to string
        }));

        // Filter kelompok options based on kecamatanBinaan
        const filteredKelompokOptions = kelompokOptions.filter(
          (option) => option.kecamatan === kecamatanBinaan.toString()
        );

        // Set filtered kelompok options as state
        setKelompok(filteredKelompokOptions);
      }
    });
  }, [kecamatanBinaan]);

  const handleClick = () => {
    window.location.href = '/data-penyuluh/rekap-penyuluh';
  };
  return (
    <div className="px-10 md:px-40 py-10">
      <div className="shadow-xl rounded-xl px-5 py-5 bg-white">
        {loading && <LoadingAnimation />}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center justify-center">
            <InputImage
              id="foto"
              name="foto"
              imageActive={foto}
              onChange={(e) => setFoto(e)}
              title="Foto Profil"
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 mt-3">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="NIP"
                id="NIP"
                value={NIP}
                onChange={(e) => setNIP(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="NIP"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>NIP Penyuluh</strong> (Contoh: 3514002000000001)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="NoWa"
                id="NoWa"
                value={NoWa}
                onChange={(e) => setNoWa(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="NoWa"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>No. HP/WA</strong> (Contoh: 0812 3456 7890)
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="namaPenyuluh"
                id="namaPenyuluh"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="namaPenyuluh"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {' '}
                <strong>Nama</strong> (Contoh: Subagyo Joyo Kumuso)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="passwordPenyuluh"
                name="passwordPenyuluh"
                id="passwordPenyuluh"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="passwordPenyuluh"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Password</strong>
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <select
                id="kecamatan"
                value={kecamatanActive}
                onChange={(e) => handleSelectKecamatan(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                <option disabled value="">
                  Pilih Kecamatan
                </option>
                {daftarKecamatan?.map((item, i) => (
                  <option value={item.id} key={i}>
                    {item.nama}
                  </option>
                ))}
              </select>
              <label
                htmlFor="kecamatan"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Kecamatan</strong> (Contoh: Karanganyar)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <select
                id="desa"
                value={desa}
                onChange={(e) => setDesa(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                <option disabled value="">
                  Pilih Desa
                </option>
                {dafatarDesa?.map((item, i) => (
                  <option value={item.id} key={i}>
                    {item.nama}
                  </option>
                ))}
              </select>
              <label
                htmlFor="desa"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Desa</strong> (Contoh: Karanganyar)
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="alamat"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="alamat"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Alamat</strong> (Contoh: Jl. Raya Utara Timur Laut RT 01 / RW 09)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Email</strong> (Contoh: bejo@petani.com)
            </label>
          </div>
          <div className="flex space-x-4 justify-end">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-orange-800">
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Simpan
            </button>
            <button
              onClick={handleClick}
              className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-orange-800">
              <FontAwesomeIcon icon={faCancel} className="mr-2" />
              Batalkan
            </button>
          </div>
        </form>
      </div>
      <div className="relative bg-white bg-opacity-20 mt-6 p-4 flex items-center w-full">
        <h3 className="text-white text-2xl font-bold mx-auto">Wilayah Binaan</h3>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <Tabs defaultValue="kecamatan">
          <Tabs.List>
            <Tabs.Tab value="kecamatan">Kecamatan</Tabs.Tab>
            <Tabs.Tab value="desa">Desa</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="kecamatan">
            {penyuluh && (
              <KecamatanBinaan
                penyuluh={penyuluh}
                viewOnly={false}
                daftarKecamatan={daftarKecamatan}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="desa">
            {penyuluh && <DesaBinaan penyuluh={penyuluh} viewOnly={false} />}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default EditPenyuluhanTani;
