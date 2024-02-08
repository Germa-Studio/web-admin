// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/loading';
import { AddPenjual, CekNiP, CekNik, DetailProductsPetani, EditPenjual } from '../../infrastucture';
import MainCard from '../../components/MainCard';
import { TPenyuluh, TPetani } from '../../types/petani';
import { Link, useParams } from 'react-router-dom';
import { TokoTani } from '../../@types/toko';
import clsx from 'clsx';

const TokoTaniForm = ({ type }: { type: 'add' | 'detail' | 'edit' }) => {
  const [NIK, setNIK] = React.useState('');
  const [profesiPenjual, setProfesiPenjual] = React.useState('');
  const [namaProducts, setNamaProducts] = React.useState('');
  const [stok, setStok] = React.useState(0);
  const [satuan, setSatuan] = React.useState('');
  const [harga, setHarga] = React.useState(0);
  const [deskripsi, setDeskripsi] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [fotoTanaman, setFotoTanaman] = React.useState<File | string>('');
  const [datas, setDatas] = React.useState<TPetani | TPenyuluh | null>(null);
  const [disable, setDisable] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const params = useParams();
  const id = Number(params.id);

  const handleCLick = React.useCallback(() => {
    if (profesiPenjual === '' || NIK === '') return;

    if (profesiPenjual == 'petani') {
      CekNik({ NIK }).then((data) => {
        setDatas(data);
      });
    } else if (profesiPenjual == 'penyuluh') {
      CekNiP({ NIP: NIK }).then((data) => {
        setDatas(data);
      });
    }
  }, [NIK, profesiPenjual]);

  React.useEffect(() => {
    if (datas) {
      setDisable(false);
    } else if (!datas) {
      setDisable(true);
    }
  }, [datas]);

  React.useEffect(() => {
    // setDatas(null);
    // setNIK('');
    handleCLick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profesiPenjual]);

  React.useEffect(() => {
    if (type !== 'add') {
      DetailProductsPetani(id).then((res) => {
        const data: TokoTani = res.data;
        setProfesiPenjual(data.profesiPenjual);
        setNamaProducts(data.namaProducts);
        setStok(data.stok);
        setSatuan(data.satuan);
        setHarga(data.harga);
        setDeskripsi(data.deskripsi);
        setStatus(data.status);
        setFotoTanaman(data.fotoTanaman);

        if (data.profesiPenjual === 'penyuluh') {
          setNIK(data.tbl_akun?.dataPenyuluh?.nik ?? '');
        } else {
          setNIK(data.tbl_akun?.dataPetani?.nik ?? '');
        }
      });
    }
  }, [id, type]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      nik: NIK,
      profesiPenjual,
      namaProducts,
      stok,
      satuan,
      harga,
      deskripsi,
      status,
      fotoTanaman
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log({ type });
    if (type === 'add') AddPenjual(formData).then(() => setLoading(false));
    else if (type === 'edit') EditPenjual(id, formData).then(() => setLoading(false));
  };

  return (
    <MainCard transparent row center className="px-10 md:px-40 py-10">
      <MainCard className="shadow-xl rounded-xl px-5 py-5 w-[80%]">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="profesiPenjual" className="text-sm">
              <strong>Profesi Penjual:</strong>
            </label>
            <div className="flex items-center pt-2">
              <input
                type="radio"
                value="petani"
                id="profesiPetani"
                name="profesiPenjual"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                onChange={(e) => setProfesiPenjual(e.target.value)}
                checked={profesiPenjual === 'petani'}
                disabled={type === 'detail'}
              />
              <label htmlFor="profesiPetani" className="ml-2 text-sm font-medium">
                Petani
              </label>
            </div>
            <div className="flex items-center py-2">
              <input
                type="radio"
                value="penyuluh"
                id="profesiPenyuluh"
                name="profesiPenjual"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                onChange={(e) => setProfesiPenjual(e.target.value)}
                checked={profesiPenjual === 'penyuluh'}
                disabled={type === 'detail'}
              />
              <label htmlFor="profesiPenyuluh" className="ml-2 text-sm font-medium">
                Penyuluh
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="NIK"
                disabled={!profesiPenjual || type === 'detail'}
                id="NIK"
                value={NIK}
                onChange={(e) => setNIK(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="NIK"
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>
                  Cek{' '}
                  {profesiPenjual == 'penyuluh'
                    ? 'NIP'
                    : profesiPenjual == 'petani'
                      ? 'NIK'
                      : 'NIK/NIP'}{' '}
                </strong>{' '}
                (Contoh: 3514002000000001)
              </label>
            </div>
            <button
              id="NIK"
              name="NIK"
              type="button"
              onClick={() => handleCLick()}
              className={clsx(
                'text-white h-fit bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 ml-auto',
                type === 'detail' && 'hidden'
              )}
              disabled={!NIK || !profesiPenjual}>
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Cek{' '}
              {profesiPenjual == 'penyuluh'
                ? 'NIP'
                : profesiPenjual == 'petani'
                  ? 'NIK'
                  : 'NIK/NIP'}
            </button>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 gronup">
              <p>
                <strong>
                  Nama{' '}
                  {profesiPenjual == 'penyuluh'
                    ? 'Penyuluh'
                    : profesiPenjual == 'petani'
                      ? 'Petani'
                      : ''}
                  :{' '}
                </strong>{' '}
                {datas?.nama}
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
                <strong>Kecamatan: </strong> {datas?.kecamatan}
              </p>
            </div>
            {profesiPenjual == 'petani' ? (
              <div className="relative z-0 w-full mb-6 gronup">
                <p>
                  <strong>Gapoktan: </strong> {(datas as TPetani)?.kelompok?.gapoktan}
                </p>
              </div>
            ) : (
              <div className="relative z-0 w-full mb-6 gronup">
                <p>
                  <strong>Kecamatan Binaan: </strong> {(datas as TPenyuluh)?.kecamatanBinaan}
                </p>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            {profesiPenjual == 'petani' ? (
              <>
                <div className="relative z-0 w-full mb-6 group">
                  <p>
                    <strong>Nama Kelompok: </strong> {(datas as TPetani)?.kelompok?.namaKelompok}
                  </p>
                </div>
                <div className="relative z-0 w-full mb-6 gronup">
                  <p>
                    <strong>Penyuluh: </strong> {(datas as TPetani)?.kelompok?.penyuluh}
                  </p>
                </div>
              </>
            ) : (
              <div className="relative z-0 w-full mb-6 gronup">
                <p>
                  <strong>Desa Binaan: </strong> {(datas as TPenyuluh)?.desaBinaan}
                </p>
              </div>
            )}
          </div>
          {loading && <Loading />}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                disabled={disable || type === 'detail'}
                name="namaProducts"
                id="namaProducts"
                value={namaProducts}
                onChange={(e) => setNamaProducts(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="namaProducts"
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Nama Produk</strong> (Contoh: Siketan)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                disabled={disable || type === 'detail'}
                name="stok"
                id="stok"
                value={stok}
                onChange={(e) => setStok(Number(e.target.value))}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="stok"
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Stok</strong> (Contoh: 10kg)
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="underline_select" className="text-sm pt-5 md:pt-0">
                <strong>Satuan</strong>
              </label>
              <select
                id="satuan"
                name="satuan"
                disabled={disable || type === 'detail'}
                value={satuan}
                onChange={(e) => setSatuan(e.target.value)}
                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown">
                <option value="pcs">Pcs</option>
                <option value="kg">Kg</option>
                <option value="gram">Gram</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                disabled={disable || type === 'detail'}
                name="harga"
                id="harga"
                value={harga}
                onChange={(e) => setHarga(Number(e.target.value))}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="harga"
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Harga</strong> (Contoh: 100.000)
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                disabled={disable || type === 'detail'}
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
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Deskripsi Uraian</strong>
              </label>
            </div>
            <div className={clsx('relative z-0 w-full mb-6 group', type === 'detail' && 'hidden')}>
              <input
                type="file"
                disabled={disable}
                name="fotoTanaman"
                onChange={(e) => {
                  if (e.target.files) setFotoTanaman(e.target.files[0]);
                }}
                accept=".png, .jpg, .jpeg"
                id="fotoTanaman"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="fotoTanaman"
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Foto Tanaman</strong> (Jenis File: .png, .jpg, .jpeg)
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                id="status"
                disabled={disable || type === 'detail'}
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="status"
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <strong>Status</strong> (Contoh: Habis)
              </label>
            </div>
          </div>
          <div className="flex space-x-4 justify-end">
            <button
              type="submit"
              className={clsx(
                'text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-orange-800',
                type === 'detail' && 'hidden'
              )}>
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Simpan
            </button>
            <Link
              to="/toko-tani"
              className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-orange-800">
              <FontAwesomeIcon icon={faClose} className="mr-2" />
              Kembali
            </Link>
          </div>
        </form>
      </MainCard>
    </MainCard>
  );
};

export default TokoTaniForm;
