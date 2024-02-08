import { useState } from 'react';
import TextInput from '../../../components/uiComponents/inputComponents/textInput';
import InputImage from '../../../components/inputImage';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { MdPlayArrow } from "react-icons/md";

export default function Banner(props){
    const {data} = props

    return(
        <div className="flex justify-between p-4 border border-solid border-gray-400 rounded-lg">
            <div className='flex gap-1 h-fit items-center'>
                <div>{data.id}</div>
                <MdPlayArrow/>
            </div>
            <InputImage
            id="logo"
            name="logo"
            value={data.gambar}
            title="Upload Banner"
            onChange={(e) => setGambar(e)}
            />
            <div className="w-[45%]">
                <div className="flex space-x-2">
                    <BsPersonGear size="30px" />
                    <TextInput
                    id="judul"
                    name="judul"
                    label="Judul Gambar"
                    value={data.judul}
                    onChange={(e) => setJudul(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <CiLocationArrow1 size="30px" />
                    <TextInput
                    id="alt"
                    name="alt"
                    label="Alt Gambar"
                    value={data.alt}
                    onChange={(e) => setAlt(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}