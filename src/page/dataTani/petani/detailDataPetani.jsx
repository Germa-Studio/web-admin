import { useState, useEffect } from 'react';
import InputImage from '@/components/inputImage';
import MainCard from '@/components/MainCard';
import { GetDaftarTaniById, select, GetOpsiPenyuluh } from '@/infrastruture';
import { fecthKecamatan } from '../../../infrastucture/daerah';
import { useParams } from 'react-router-dom';

const ViewDetailDataPetani = () => {
  const [NIK, setNIK] = useState('');
  const [nokk, setNokk] = useState('');
  const [NoWa, setNoWa] = useState('');
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [desa, setDesa] = useState('');
  const [namaKelompok, setNamaKelompok] = useState('');
  const [penyuluh, setPenyuluh] = useState('');
  const [alamat, setAlamat] = useState('');
  const [gapoktan, setGapoktan] = useState('');
  const [foto, setFoto] = useState('');
  const [daftarKecamatan, setDaftarKecamatan] = useState([]);
  const [kecamatanActive, setKecamatanActive] = useState('');
  const [daftarNamaKelompok, setDaftarNamaKelompok] = useState([]);
  const [daftarPenyuluh, setDaftarPenyuluh] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fecthKecamatan().then((res) => {
      setDaftarKecamatan(res.data);
    });
    GetDaftarTaniById(id).then((data) => {
      setNIK(data?.nik);
      setNokk(data?.nkk);
      setNoWa(data?.noTelp);
      setEmail(data?.email);
      setNama(data?.nama);
      setKecamatan(data?.kecamatanData.nama);
      setDesa(data?.desaData.nama);
      setFoto(data?.foto);
      setNamaKelompok(data?.kelompok?.namaKelompok);
      setPenyuluh(data?.dataPenyuluh?.id);
      setAlamat(data?.alamat);
      setGapoktan(data?.kelompok?.gapoktan);
    });
  }, [id]);

  useEffect(() => {
    GetOpsiPenyuluh().then((data) => {
      const filterData = data.map((obj) => {
        return Object.keys(obj).reduce((result, key) => {
          if (key === 'dataPenyuluh') {
            result = { ...result, ...obj[key] };
          } else {
            result[key] = obj[key];
          }
          return result;
        }, {});
      });
      setDaftarPenyuluh(filterData);
    });
  }, []);

  useEffect(() => {
    if (daftarKecamatan && kecamatan && !kecamatanActive) {
      const filteredData = daftarKecamatan?.filter((item) => {
        const parts = item?.nama?.split('-');
        return parts[0] == kecamatan;
      });
      const kecamatanActivate = `${filteredData[0]?.nama}-${filteredData[0]?.id}`;
      setKecamatanActive(kecamatanActivate);
    }
  }, [daftarKecamatan, kecamatan, kecamatanActive]);

  useEffect(() => {
    if (desa) {
      select(desa).then((data) => {
        setDaftarNamaKelompok(data?.kelompokTani);
      });
    }
  }, [desa]);

  const handleselect = (e) => {
    setDesa(e);
  };

  const handleSelectKecamatan = (e) => {
    const nama = e?.split('-')[0];
    setKecamatanActive(e);
    setKecamatan(nama);
  };

  return (
    <div className="px-10 md:px-40 py-10 z-1">
      {/* <form onSubmit={(e) => handleSubmit(e)}>
        {loading &&
          <Loading />} */}
      <MainCard className="mb-10">
        <div className="flex items-center justify-center">
          <InputImage
            imageActive={foto}
            onChange={(e) => setFoto(e)}
            title="Foto Profil"
            disabled
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 mt-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="NIK"
              id="NIK"
              value={NIK}
              onChange={(e) => setNIK(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              disabled
            />
            <label
              htmlFor="NIK"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>NIK</strong> (Contoh: 3514002000000001)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="nokk"
              id="nokk"
              value={nokk}
              onChange={(e) => setNokk(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              disabled
            />
            <label
              htmlFor="nokk"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>No. KK</strong> (Contoh: 3514002000000001)
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="NoWa"
              id="NoWa"
              value={NoWa}
              onChange={(e) => setNoWa(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              disabled
            />
            <label
              htmlFor="NoWa"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>No. HP/WA</strong> (Contoh: 0812 3456 7890)
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
              disabled
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Email</strong> (Contoh: bejo@petani.com)
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="namaPetani"
              id="namaPetani"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              disabled
            />
            <label
              htmlFor="namaPetani"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {' '}
              <strong>Nama</strong> (Contoh: Subagyo Joyo Kumuso)
            </label>
          </div>
          {/* <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="passwordPetani"
              id="passwordPetani"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              disabled
            />
            <label
              htmlFor="passwordPetani"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Password</strong>
            </label>
          </div> */}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="kecamatan"
              value={kecamatan}
              onChange={(e) => handleSelectKecamatan(e.target.value)}
              className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown"
              disabled>
              {/* <option value="">--Silahkan Pilih Kecamatan--</option>
              {daftarKecamatan?.map((item, i) => (
                <option value={`${item.nama}-${item.id}`} key={i}>
                  {item.nama}
                </option>
              ))} */}
            </input>
            <label
              htmlFor="kecamatan"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Kecamatan</strong> (Contoh: Karanganyar)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="desa"
              value={desa}
              onChange={(e) => handleselect(e.target.value)}
              className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown"
              disabled>
              {/* <option value="">--Silahkan Pilih Desa--</option>
              {dafatarDesa?.map((item, i) => (
                <option value={item.nama} key={i}>
                  {item.nama}
                </option>
              ))} */}
            </input>
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            disabled
          />
          <label
            htmlFor="alamat"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            <strong>Alamat</strong> (Contoh: Jl. Raya Utara Timur Laut RT 01 / RW 09)
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="gapoktan"
              id="gapoktan"
              value={gapoktan}
              onChange={(e) => setGapoktan(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              disabled
            />
            <label
              htmlFor="gapoktan"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Gapoktan</strong> (Contoh: Power Ranger)
            </label>
          </div>
          {daftarNamaKelompok?.length > 0 ? (
            <div className="relative z-0 w-full mb-6 group">
              <select
                id="namaKelompok"
                value={namaKelompok}
                onChange={(e) => setNamaKelompok(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown"
                disabled>
                <option value="">--Silahkan Pilih Nama Kelompok--</option>
                {daftarNamaKelompok?.map((item, i) => (
                  <option value={item.namaKelompok} key={i}>
                    {item.namaKelompok}
                  </option>
                ))}
              </select>
              <label
                htmlFor="namaKelompok"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Nama Kelompok</strong> (Contoh: Karanganyar)
              </label>
            </div>
          ) : (
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="namaKelompok"
                id="namaKelompok"
                value={namaKelompok}
                onChange={(e) => setNamaKelompok(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="namaKelompok"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Nama Kelompok </strong>(Contoh: Ranger Merah)
              </label>
            </div>
          )}
        </div>
        {daftarPenyuluh?.length ? (
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="penyuluh"
              value={penyuluh}
              onChange={(e) => setPenyuluh(e.target.value)}
              disabled
              className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
              <option value="">--Silahkan Pilih Nama Penyuluh--</option>
              {daftarPenyuluh?.map((item, i) => (
                <option value={item?.id} key={i}>
                  {item?.nama} - {item?.kecamatanBinaan}
                </option>
              ))}
            </select>
            <label
              htmlFor="penyuluh"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Nama Kelompok</strong> (Contoh: Karanganyar)
            </label>
          </div>
        ) : (
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="penyuluh"
              id="penyuluh"
              value={penyuluh}
              onChange={(e) => setPenyuluh(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="penyuluh"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Nama Penyuluh</strong> (Contoh: Nama Penyuluh)
            </label>
          </div>
        )}
      </MainCard>
    </div>
  );
};

export default ViewDetailDataPetani;
