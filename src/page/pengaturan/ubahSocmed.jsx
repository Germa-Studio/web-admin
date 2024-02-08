import { useState } from 'react';
import LoadingAnimation from '../../components/loading';
import Socmed from './component/socmed';

export default function UbahSocmed(){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        {
            id : "1",
            icon : "",
            nama : "",
            link : ""
        },
        {
            id : "2",
            icon : "",
            nama : "",
            link : ""
        },
        {
            id : "3",
            icon : "",
            nama : "",
            link : ""
        },
    ])

    const handleAdd = () => {
        const newData = {
            id : "4",
            icon : "",
            nama : "",
            link : ""
        }
        setData([...data, newData])
    }
    const handleSubmit = () => {
        setLoading(true);
    };

    return (
        <div>
            <div className='flex flex-col gap-2'>
                {loading && <LoadingAnimation />}
                <div className='text-lg text-green-primary font-extrabold mb-4'>BANNER WEBSITE</div>
                {data?.map((data)=>(
                    <Socmed key={data.id} data={data}/>
                ))}
                <div className='mt-4 flex gap-3 justify-end'>
                    <button
                        onClick={handleAdd}
                        className="w-[30%] text-white bg-orange-primary hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Tambah Social Media
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Update Social Media
                    </button>
                </div>
            </div>
        </div>
    );
}