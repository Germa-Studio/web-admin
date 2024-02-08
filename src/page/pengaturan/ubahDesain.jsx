import { useState } from 'react';
import NumberInput from '../../components/uiComponents/inputComponents/numberInput';
import LoadingAnimation from '../../components/loading';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import Banner from './component/banner';

export default function UbahDesain(){
    const [primer, setPrimer] = useState('');
    const [hover, setHover] = useState('');
    const [sekunder, setSekunder] = useState('');
    const [loading, setLoading] = useState(false);
    const [data2, setData2] = useState([
        {
            id : "1",
            gambar : "",
            judul : "",
            alt : ""
        },
        {
            id : "2",
            gambar : "",
            judul : "",
            alt : ""
        },
        {
            id : "3",
            gambar : "",
            judul : "",
            alt : ""
        },
    ])

    const handleSubmit1 = () => {
        setLoading(true);
        const data1 = {
            primer,
            sekunder,
            hover
        };
        const formData = new FormData();
        for (const key in data1) {
            formData.append(key, data1[key]);
        }
        // AddEventTani(formData).then(()=>setLoading(false))
    };

    const handleAdd = () => {
        const newData = {
            id : "4",
            gambar : "",
            judul : "",
            alt : ""
        }
        setData2([...data2, newData])
    }
    const handleSubmit2 = () => {
        setLoading(true);
    };

    return (
        <div>
            <div>
                {loading && <LoadingAnimation />}
                <div className='text-lg text-green-primary font-extrabold mb-4'>WARNA WEBSITE</div>
                <div className="flex space-x-2">
                    <BsPersonGear size="30px" />
                    <NumberInput
                    id="primer"
                    name="primer"
                    label="Kode Warna Primer"
                    value={primer}
                    onChange={(e) => setPrimer(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <CiLocationArrow1 size="30px" />
                    <NumberInput
                    id="sekunder"
                    name="sekunder"
                    label="Kode Warna Sekunder"
                    value={sekunder}
                    onChange={(e) => setSekunder(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <CiLocationArrow1 size="30px" />
                    <NumberInput
                    id="hover"
                    name="hover"
                    label="Kode Warna Hover"
                    value={hover}
                    onChange={(e) => setHover(e.target.value)}
                    />
                </div>
                <div className='mt-4 flex justify-end'>
                    <button
                        onClick={handleSubmit1}
                        className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Update Warna Website
                    </button>
                </div>
            </div>
            <div>
                {loading && <LoadingAnimation />}
                <div className='text-lg text-green-primary font-extrabold mb-4'>BANNER WEBSITE</div>
                <div className='flex flex-col gap-2'>
                    {data2?.map((data2)=>(
                        <Banner key={data2.id} data={data2}/>
                    ))}
                </div>
                <div className='mt-4 flex gap-3 justify-end'>
                    <button
                        onClick={handleAdd}
                        className="w-[30%] text-white bg-orange-primary hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Tambah Banner
                    </button>
                    <button
                        onClick={handleSubmit2}
                        className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Update Banner
                    </button>
                </div>
            </div>
        </div>
    );
}