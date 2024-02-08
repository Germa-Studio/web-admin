import TextInput from '../../components/uiComponents/inputComponents/textInput';
import InputImage from '../../components/inputImage';
import { useState } from 'react';
import LoadingAnimation from '../../components/loading';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { GiVillage } from 'react-icons/gi';

export default function UbahLogo(){
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState('')
    const [judul,setJudul] = useState('')
    const [alt, setAlt] = useState('')
    const [meta,setMeta] = useState('')

    const handleSubmit = () => {
        setLoading(true);
        const data = {
            logo,
            judul,
            alt,
            meta
        };
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        // AddEventTani(formData).then(()=>setLoading(false))
    };

    return(
        <div>
            {loading && <LoadingAnimation />}
            <div className="flex justify-between">
                <InputImage
                id="logo"
                name="logo"
                value={logo}
                title="Upload Logo"
                onChange={(e) => setLogo(e)}
                />
                <div className="w-[45%]">
                    <div className="flex space-x-2">
                        <BsPersonGear size="30px" />
                        <TextInput
                        id="judul"
                        name="judul"
                        label="Judul Gambar"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <CiLocationArrow1 size="30px" />
                        <TextInput
                        id="alt"
                        name="alt"
                        label="Alt Gambar"
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <GiVillage size="30px" />
                        <TextInput
                        id="meta"
                        name="meta"
                        label="Meta Gambar"
                        value={meta}
                        onChange={(e) => setMeta(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-4 flex justify-end'>
                <button
                    onClick={handleSubmit}
                    className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Update Logo
                </button>
            </div>
        </div>
    )
}