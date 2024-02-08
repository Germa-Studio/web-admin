import { useState } from 'react';
import TextInput from '../../../components/uiComponents/inputComponents/textInput';
import InputImage from '../../../components/inputImage';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { MdPlayArrow } from "react-icons/md";

export default function Socmed(props){
    const {data} = props

    return(
        <div className="flex justify-between p-4 border border-solid border-gray-400 rounded-lg">
            <div className='flex gap-1 h-fit items-center'>
                <div>{data.id}</div>
                <MdPlayArrow/>
            </div>
            <InputImage
            id="icon"
            name="icon"
            value={data.gambar}
            title="Upload Icon"
            onChange={(e) => setGambar(e)}
            />
            <div className="w-[45%]">
                <div className="flex space-x-2">
                    <BsPersonGear size="30px" />
                    <TextInput
                    id="nama"
                    name="nama"
                    label="Nama Social Media"
                    value={data.nama}
                    // onChange={(e) => setJudul(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <CiLocationArrow1 size="30px" />
                    <TextInput
                    id="link"
                    name="link"
                    label="Link Social Media"
                    value={data.link}
                    // onChange={(e) => setAlt(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}