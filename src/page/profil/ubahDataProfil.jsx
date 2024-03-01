import TextInput from '../../components/uiComponents/inputComponents/textInput';
import InputImage from '../../components/inputImage';
import { useEffect, useState } from 'react';
import LoadingAnimation from '../../components/loading';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { SlLocationPin } from 'react-icons/sl';
import { GiVillage } from 'react-icons/gi';
import { polymorphicFactory } from '@mantine/core';
import { UpdateProfile } from '../../infrastucture';

export default function DataProfil({data}) {
  const [foto, setFotoProfil] = useState('');
  const [nama, setNama] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [desa, setDesa] = useState('');
  const [alamat, setAlamat] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState([]);

  useEffect(()=>{
    if(data){
      setProfileData(data);
      setNama(data?.nama);
      setKecamatan(data?.kecamatan);
      setDesa(data?.desa);
      setAlamat(data?.alamat);
      setFotoProfil(data?.foto)
    }
  }, [data])
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
  
    const datad = {
      foto,
      nama,
      kecamatan,
      desa,
      alamat
    };
    const formData = new FormData();
    for (const key in datad) {
      formData.append(key, datad[key]);
    }
  
    UpdateProfile(formData)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setLoading(false);
      });
  };
  

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
      {loading && <LoadingAnimation />}
      <div className="flex justify-between">
        {profileData.foto ?(
          <InputImage
            id="foto"
            name="foto"
            imageActive={foto}
            title="Foto Profil"
            onChange={(e) => setFotoProfil(e)}
          />
        ): (
          <input
            type="file"
            id="foto"
            name="foto"
            onChange={(e) => setFotoProfil(e.target.files[0])}
          />
        )}
        <div className="w-[45%]">
          {profileData.nama &&(
            <div className="flex space-x-2">
              <BsPersonGear size="30px" />
              <TextInput
                id="nama"
                name="nama"
                label="Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
          )}
          {profileData.kecamatan &&(
            <div className="flex space-x-2">
              <CiLocationArrow1 size="30px" />
              <TextInput
                id="kecamatan"
                name="Kecamatan"
                label="Kecamatan"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
              />
            </div>
          )}
          {profileData.desa &&(
            <div className="flex space-x-2">
              <GiVillage size="30px" />
              <TextInput
                id="desa"
                name="desa"
                label="Desa"
                value={desa}
                onChange={(e) => setDesa(e.target.value)}
              />
            </div>
          )}
          {profileData.alamat &&(
            <div className="flex space-x-2">
              <SlLocationPin size="30px" />
              <TextInput
                id="alamat"
                name="alamat"
                label="Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        // onClick={handleSubmit}
        className="w-[30%] float-end text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Update Data Profil
      </button>
      </form>
    </div>
  );
}
