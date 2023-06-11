import { useState } from "react"
import InputImage from "@/components/inputImage"
import MainCard from "@/components/MainCard"
import TimeInput from "@/components/uiComponents/inputComponents/timeInput" 
import TextInput from "@/components/uiComponents/inputComponents/textInput" 
// import {AddEventTani} from "@/infrastruture"
function TambahEventTani() {
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [tanggalAcara, setTanggalAcara] = useState("");
  const [waktuAcara, setWaktuAcara] = useState("");
  const [tempat, setTempat] = useState("");
  const [peserta, setPeserta] = useState("");
  // const [isi, setIsi] = useState("");
  const [fotoKegiatan, setFotoKegiatan] = useState("");
  return (
    <MainCard transparent row center style={{paddingTop:"50px"}}>
      <MainCard width="80%">
        <MainCard transparent nopadding center>
          <InputImage id="fotoKegiatan" name="fotoKegiatan" value={fotoKegiatan}  onChange={(e) => setFotoKegiatan(e.target.value)}/>
        </MainCard>
        <MainCard fullwidth transparent className="mt-10">
          <TextInput id="namaKegiatan" name="namaKegiatan" label="Nama Kegiatan" value={namaKegiatan}  onChange={(e) => setNamaKegiatan(e.target.value)} contoh="Penyuluhan Tanaman"/>
          <TextInput id="tanggalAcara" name="tanggalAcara" label="Tanggal Acara" value={tanggalAcara}  onChange={(e) => setTanggalAcara(e.target.value)} contoh="26/10/2023" type="date"/>
          <TimeInput idMulai="waktuMulai" nameMulai="waktuMulai" idSelesai="waktuSelesai" value={waktuAcara}  onChange={(e) => setWaktuAcara(e.target.value)} nameSelesai="waktuSelesai" label="Waktu Acara" contoh="12:45 AM - 01:10 PM"/>
          <TextInput id="tempat" name="tempat" label="Tempat" value={tempat}  onChange={(e) => setTempat(e.target.value)} contoh="Balay Merdeka Raya"/>
          <TextInput id="peserta" name="peserta" label="Peserta" value={peserta}  onChange={(e) => setPeserta(e.target.value)} contoh="Petani Desa A"/>
        </MainCard>
      </MainCard>
    </MainCard>
  )
}

export default TambahEventTani