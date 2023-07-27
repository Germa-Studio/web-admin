import { useState, useEffect } from "react";
import EditorText from "@/components/textAreaEditor"
import { Button } from '@mantine/core';
import MainCard from "@/components/MainCard"
import TextInput from "@/components/uiComponents/inputComponents/textInput" 
import { IconPlus, IconX, IconDeviceFloppy} from '@tabler/icons-react';
import {AddJurnalKegiatan} from "@/infrastruture"
import InputImage from "@/components/inputImage";
const FormJurnalKegiatan = ()=>{
    const [NIP, setNIP] = useState("");
    const [judul, setJudul] = useState("");
    const [statusJurnal, setStatusJurnal] = useState("");
    const [isi, setIsi] = useState("");
    const [gambar, setGambar] = useState("");
    const [createdBy, setCreatedBy] = useState("")
    const currentDate = new Date()
    const tanggalDibuat = currentDate.toISOString().split('T')[0];
    const tanggalFormatted = currentDate.getDate() + " " + currentDate.toLocaleString('id', { month: 'long' }) + " " + currentDate.getFullYear();

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        NIP,
        judul,
        isi,
        gambar,
        createdBy,
        tanggalDibuat,
        statusJurnal
      };
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      AddJurnalKegiatan(formData)
    };    
    return(
        <MainCard transparent row center style={{paddingTop:"50px"}}>
            <MainCard width="80%" >
                <h1 className="text-center">Tambahkan Jurnal Kegiatan</h1>
                <MainCard transparent gap="10%" row>
                    <MainCard transparent noPadding  width="40%">
                        <TextInput id="NIP" name="NIP" label="NIP" value={NIP}  onChange={(e) => setNIP(e.target.value)} />
                        <TextInput id="judul" name="judul" label="Judul" value={judul}  onChange={(e) => setJudul(e.target.value)} />
                        <TextInput id="createdBy" name="createdBy" label="Di Buat Oleh" value={createdBy}  onChange={(e) => setCreatedBy(e.target.value)} />
                        <TextInput id="statusJurnal" name="statusJurnal" label="Status Jurnal" value={statusJurnal}  onChange={(e) => setStatusJurnal(e.target.value)} />
                        <span id="tanggal" name="tanggal" >Tanggal Dibuat: {tanggalFormatted}</span>
                    </MainCard >
                    <MainCard transparent noPadding>
                        <InputImage
                            imageActive={gambar}
                            onChange={(e) => setGambar(e)}
                            title="Foto Profil"
                        />
                    </MainCard>
                </MainCard>
                    <MainCard transparent noPadding gap="0">

                    </MainCard>
                <EditorText setValue={setIsi}/>
                <MainCard transparent id="isi" name="isi" value={isi}  onChange={(e) => setIsi(e.target.value)} row style={{justifyContent:"end"}}>
                    <Button leftIcon={<IconDeviceFloppy size="1rem" />} variant='outline' onClick={(e)=>handleSubmit(e)}>Simpan</Button>
                    <Button leftIcon={<IconX size="1rem" />} variant='outline'>Batalkan</Button>
                </MainCard>
            </MainCard>
        </MainCard>
    )
}

export default FormJurnalKegiatan