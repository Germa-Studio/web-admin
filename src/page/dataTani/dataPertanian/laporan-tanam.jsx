import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { AddLaporanTani, CekNik } from '@/infrastruture';
import {
  komoditasSemusim,
  komoditasTahunan,
  tanamanPangan,
  tanamanPerkebunan
} from '../../../types/const';
function LaporanTanam() {
  const [NIK, setNIK] = useState('');
  const [komoditas, setKomoditas] = useState('');
  const [tanggalLaporan, setTanggalLaporan] = useState('');
  const [kondisiTanaman, setKondisiTanaman] = useState('');
  const [jenisTanaman, setJenisTanaman] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoTanaman, setFotoTanaman] = useState('');
  const [datas, setDatas] = useState({});
  const [disable, setDisable] = useState(false);
  const [daftarKomoditas, setDaftarKomoditas] = useState([]);
  const handleCLick = () => {
    CekNik({ nik: NIK }).then((data) => {
      setDatas(data);
      setDisable(true);
    });
  };
  useEffect(() => {
    if (kategori == 'Tanaman Pangan') {
      setDaftarKomoditas(tanamanPangan);
    } else if (kategori == 'Tanaman Perkebunan') {
      setDaftarKomoditas(tanamanPerkebunan);
    } else if (kategori == 'Tanaman Hortikultura') {
      setDaftarKomoditas(komoditasTahunan);
    } else if (kategori == 'lainnya') {
      setDaftarKomoditas(komoditasSemusim);
    } else {
      setDaftarKomoditas(['']);
    }
  }, [kategori]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      NIK,
      komoditas,
      tanggalLaporan,
      komdisiTanaman: kondisiTanaman,
      jenisTanaman,
      kategori,
      deskripsi,
      fotoTanaman
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    AddLaporanTani(formData);
  };
  return (
    <div className="px-10 md:px-40 py-10">
      <div className="shadow-xl rounded-xl px-5 py-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex space-x-4 justify-end w-full lg:w-full py-5">
            <button
              value={NIK}
              onClick={(e) => handleCLick(e)}
              className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ml-auto pr-5 hidden md:block">
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Cek NIK
            </button>
            <button
              type="submit"
              className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 ml-auto">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Daftarkan
            </button>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              disabled={disable}
              onChange={(e) => setNIK(e.target.value)}
              name="NIK"
              id="NIK"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="NIK"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              <strong>Cek NIK</strong> (Contoh: 3514002000000001)
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 gronup">
              <p>
                <strong>Nama Petani: </strong> {datas?.nama}
              </p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <p>
                <strong>Status Tanah: </strong> Milik Sendiri
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 gronup">
              <p>
                <strong>Kecamatan: </strong> {datas?.kecamatan}
              </p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <p>
                <strong>Desa: </strong> {datas?.desa}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 gronup">
              <p>
                <strong>Gapoktan: </strong> {datas?.kelompok?.gapoktan}
              </p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <p>
                <strong>Nama Kelompok: </strong> {datas?.kelompok?.namaKelompok}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 gronup">
              <p>
                <strong>Penyuluh: </strong> {datas?.kelompok?.penyuluh}
              </p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <p>
                <strong>Musim Tanam: </strong> {datas?.tanamanPetani?.musimTanam + 1 || 1}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="kategori" className="text-sm text-gray-500">
                <strong>Kategori:</strong>
              </label>
              <div className="flex items-center pt-2">
                <input
                  id="tanaman-pangan"
                  value="Tanaman Pangan"
                  onChange={(e) => setKategori(e.target.value)}
                  type="radio"
                  name="kategori"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="tanaman-pangan" className="ml-2 text-sm font-medium text-gray-900">
                  Tanaman Pangan
                </label>
              </div>
              <div className="flex items-center py-2">
                <input
                  id="tanaman-perkebunan"
                  value="Tanaman Perkebunan"
                  onChange={(e) => setKategori(e.target.value)}
                  type="radio"
                  name="kategori"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="tanaman-perkebunan"
                  className="ml-2 text-sm font-medium text-gray-900">
                  Tanaman Perkebunan
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="tanaman-hortikultura"
                  value="Tanaman Hortikultura"
                  onChange={(e) => setKategori(e.target.value)}
                  type="radio"
                  name="kategori"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="tanaman-hortikultura"
                  className="ml-2 text-sm font-medium text-gray-900">
                  Tanaman Hortikultura
                </label>
              </div>
              <div className="flex items-center py-2">
                <input
                  id="lainnya"
                  value="lainnya"
                  onChange={(e) => setKategori(e.target.value)}
                  type="radio"
                  name="kategori"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="lainnya" className="ml-2 text-sm font-medium text-gray-900">
                  Lainnya
                </label>
              </div>
            </div>

            {kategori == 'Tanaman Hortikultura' && (
              <div className="relative z-0 w-full mb-6 group">
                <label htmlFor="underline_select" className="text-sm text-gray-500 ">
                  <strong>Pilih Jenis Tanaman</strong>
                </label>
                <select
                  id="jenis"
                  value={jenisTanaman}
                  onChange={(e) => setJenisTanaman(e.target.value)}
                  className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                  <option value="Buah">Buah</option>
                  <option value="Sayur">Sayur</option>
                </select>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 mt-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="underline_select" className="text-sm text-gray-500  pt-5 md:pt-0">
                <strong>Pilih komoditas: </strong>
              </label>
              <select
                id="komoditas"
                value={komoditas}
                onChange={(e) => setKomoditas(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                <option value="">-- Pilih Komoditas --</option>
                {daftarKomoditas?.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="date"
                name="tanggalLaporan"
                value={tanggalLaporan}
                onChange={(e) => setTanggalLaporan(e.target.value)}
                id="tanggalLaporan"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="tanggalLaporan"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {' '}
                <strong>Tanggal Laporan</strong> (Contoh: 03-30-2023)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="kondisiTanaman"
                id="kondisiTanaman"
                value={kondisiTanaman}
                onChange={(e) => setKondisiTanaman(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="kondisiTanaman"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Kondisi Tanaman</strong> (Contoh: Sehat)
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="deskripsi"
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="deskripsi"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Deskripsi Uraian</strong>
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="file"
                name="fotoTanaman"
                id="fotoTanaman"
                value={fotoTanaman}
                onChange={(e) => setFotoTanaman(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="fotoTanaman"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Foto Tanaman</strong> (Jenis File: .png, .jpg, .jpeg) Maksimal Ukuran File 1
                mb
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
              className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-orange-800">
              <FontAwesomeIcon icon={faClose} className="mr-2" />
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LaporanTanam;
