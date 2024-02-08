import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons';
import InputImage from '@/components/inputImage';
import { AddPenyuluh } from '@/infrastruture';
import { MultiSelect } from '@mantine/core';
import { fecthKecamatan, fecthDesa } from '../../infrastucture/daerah';
import Loading from '../../components/loading';

const TambahPenyuluhanTani = () => {
  const [NIP, setNIP] = useState('');
  const [email, setEmail] = useState('');
  const [NoWa, setNoWa] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kecamatanBinaan, setKecamatanBinaan] = useState('');
  const [desa, setDesa] = useState('');
  const [alamat, setAlamat] = useState('');
  const [foto, setFoto] = useState('');
  const [namaProduct, setNamaProduct] = useState('');
  const [desaBinaan, setDesaBinaan] = useState([]);
  const [daftarKecamatan, setDaftarKecamatan] = useState([]);
  const [dafatarDesa, setDafatarDesa] = useState([]);
  const [dafatarDesaBinaan, setDafatarDesaBinaan] = useState([]);
  const [kecamatanActive, setKecamatanActive] = useState('');
  const [kecamatanBinaanActive, setKecamatanBinaanActive] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      NIP,
      email,
      NoWa,
      nama,
      password,
      kecamatan,
      desa,
      foto,
      namaProduct,
      desaBinaan: desaBinaan.join(', '),
      alamat,
      kecamatanBinaan
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    AddPenyuluh(formData).then(() => setLoading(false));
  };

  // create function to gobackParent
  // const goBackParent = () => window.history.back();

  useEffect(() => {
    fecthKecamatan().then((data) => {
      setDaftarKecamatan(data.kecamatan);
    });
  }, []);

  const handleSelectKecamatan = (e) => {
    const id = e?.split('-')[1];
    const nama = e?.split('-')[0];
    setKecamatan(nama);
    setKecamatanActive(e);
    fecthDesa(id).then((data) => {
      setDafatarDesa(data.kelurahan);
    });
  };

  const handleSelectKecamatanBinaan = (e) => {
    const id = e?.split('-')[1];
    const nama = e?.split('-')[0];
    setKecamatanBinaan(nama);
    setKecamatanBinaanActive(e);
    fecthDesa(id).then((data) => {
      const dataaa = data?.kelurahan?.map((item) => {
        return { value: item.nama, label: item.nama };
      });
      setDafatarDesaBinaan(dataaa);
    });
  };

  return (
    <div className="px-10 md:px-40 py-10">
      <div className="text-2xl font-bold justify-center text-white mb-4">Form Data Penyuluh</div>
      <div className="shadow-xl rounded-xl px-5 py-5 bg-white">
        {loading && <Loading />}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center justify-center">
            <InputImage
              id="foto"
              name="foto"
              imageActive={foto}
              value={foto}
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
                pattern="\d{16}"
                maxLength="16"
                required
              />
              <label
                htmlFor="NIK"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>NIK Penyuluh</strong> (Contoh: 3514002000000001)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
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
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <select
                id="kecamatan"
                value={kecamatanActive}
                onChange={(e) => handleSelectKecamatan(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                <option value="">--Silahkan Pilih Kecamatan--</option>
                {daftarKecamatan?.map((item, i) => (
                  <option value={`${item.nama}-${item.id}`} key={i}>
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
                <option value="">--Silahkan Pilih Desa--</option>
                {dafatarDesa?.map((item, i) => (
                  <option value={item.nama} key={i}>
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
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>email</strong> (Contoh: hadi@penyuluh.com)
            </label>
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
          <div className="grid md:grid-cols-2 mt-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="underline_select"
                className="text-sm text-gray-500 dark:text-gray-400 pt-5 md:pt-0">
                <strong>Nama Kecamatan Binaan: </strong>
              </label>
              <select
                id="kecamatan"
                name="kecamatan"
                value={kecamatanBinaanActive}
                onChange={(e) => handleSelectKecamatanBinaan(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                <option value="">--Silahkan Pilih Kecamatan--</option>
                {daftarKecamatan?.map((item, i) => (
                  <option value={`${item.nama}-${item.id}`} key={i}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="underline_select"
                className="text-sm text-gray-500 dark:text-gray-400 pt-5 md:pt-0">
                <strong>Desa Wilayah Binaan: </strong>
              </label>
              <MultiSelect
                data={dafatarDesaBinaan}
                placeholder="Pilih desa binaan"
                value={desaBinaan}
                onChange={setDesaBinaan}
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="namaProduct"
                id="namaProduct"
                value={namaProduct}
                onChange={(e) => setNamaProduct(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="namaProduct"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {' '}
                <strong>Nama Produk</strong> (Contoh: Beras Merah)
              </label>
            </div>
          </div>
          <div className="flex space-x-4 justify-end">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-orange-800">
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Simpan
            </button>
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-orange-800"
              onClick={() => window.history.back()}>
              <FontAwesomeIcon icon={faCancel} className="mr-2" />
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPenyuluhanTani;
