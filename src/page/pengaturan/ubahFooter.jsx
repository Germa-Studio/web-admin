import { useState } from 'react';
import NumberInput from '../../components/uiComponents/inputComponents/numberInput';
import LoadingAnimation from '../../components/loading';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';
import { clsx } from 'clsx';
import Faq from './component/faq';

export default function UbahFooter(){
    const [email, setEmail] = useState('');
    const [telp, setTelp] = useState('');
    const [fax, setFax] = useState('');
    const [wa, setWa] = useState('');
    const [loading, setLoading] = useState(false);
    const chooseBase = 'rounded-ss-xl rounded-se-xl w-[25%] text-center h-fit py-2 w-[100%] min-w-8 font-bold text-white transition-all bg-orange-primary hover:bg-green-sidebar-hover duration-200 ease-in-out'
    const chooseActive = 'rounded-ss-xl rounded-se-xl w-[25%] text-center h-12 w-[100%] min-w-8 font-bold text-white transition-all bg-[#307B28] hover:bg-green-sidebar-hover duration-200 ease-in-out'
    const [tou, setTou] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [about, setAbout] = useState('')
    const [filter, setFilter] = useState('faq')
    const [faq, setFaq] = useState([
        {
            id : "1",
            question : "Mengapa ... ?",
            answer : "Kerena ...",
        },
        {
            id : "2",
            question : "Bagaimana ... ?",
            answer : "Dengan cara ...",
        },
        {
            id : "3",
            question : "Apakah ... ?",
            answer : "Ya, ...",
        },
    ])

    const handleSubmit1 = () => {
        setLoading(true);
        const data = {
            email,
            telp,
            fax,
            wa
        };
        const formData = new FormData();
        for (const key in data) {
        formData.append(key, data[key]);
        }
        // AddEventTani(formData).then(()=>setLoading(false))
    };

    const handleClick = (e) => {
        setFilter(e.target.value);
    };
    
    const handleAdd = () => {
        const newData = {
            id : "4",
            question : "Siapa ... ?",
            answer : "...",
        }
        setFaq([...faq, newData])
    }
    const handleSubmit2 = () => {
        const data2 = {
            faq,
            tou,
            privacy,
            about
        };
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
                    id="email"
                    name="email"
                    label="Email Website"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <CiLocationArrow1 size="30px" />
                    <NumberInput
                    id="telp"
                    name="telp"
                    label="Telepon Website"
                    value={telp}
                    onChange={(e) => setTelp(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <BsPersonGear size="30px" />
                    <NumberInput
                    id="fax"
                    name="fax"
                    label="Fax Website"
                    value={fax}
                    onChange={(e) => setFax(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <CiLocationArrow1 size="30px" />
                    <NumberInput
                    id="wa"
                    name="wa"
                    label="Whatssapp Website"
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                    />
                </div>
                <div className='mt-4 flex justify-end'>
                    <button
                        onClick={handleSubmit1}
                        className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Update Kontak
                    </button>
                </div>
            </div>
            <div>
                {loading && <LoadingAnimation />}
                <div className='text-lg text-green-primary font-extrabold mb-4'>PAGE FOOTER</div>
                <div className='flex justify-between h-12 items-end'>
                    <button 
                        className={clsx(filter === 'faq' ? chooseActive : chooseBase)} 
                        onClick={handleClick}
                        value={'faq'}>
                        FAQ
                    </button>
                    <button
                        className={clsx(filter === 'tou' ? chooseActive : chooseBase)} 
                        onClick={handleClick}
                        value={'tou'}>
                        Term Of Use
                    </button>
                    <button
                        className={clsx(filter === 'privacy' ? chooseActive : chooseBase)} 
                        onClick={handleClick}
                        value={'privacy'}>
                        Privacy Policy
                    </button>
                    <button
                        className={clsx(filter === 'about' ? chooseActive : chooseBase)} 
                        onClick={handleClick}
                        value={'about'}>
                        About Us
                    </button>
                </div>
                <div className='rounded-es-lg rounded-ee-lg p-4 drop-shadow-xl border border-solid border-gray-400'>
                    <div className='flex flex-col gap-2'>
                        {filter==='faq'
                            ? faq?.map((faq)=>(
                                <Faq key={faq.id} data={faq}/>
                            ))
                            : <textarea name="" id="" cols="30" rows="10" className='!outline-0 !shadow-none !border-none !resize-none !drop-shadow-none !p-3' 
                                value={""} 
                                onChange={(e) => 
                                filter==='tou' ? setTou(e.target.value)
                                : filter==='privacy' ? setPrivacy(e.target.value)
                                : filter==='about' ? setAbout(e.target.value)
                                : ""}>
                                </textarea> 
                        }
                    </div>
                    <div className='mt-4 flex gap-3 justify-end'>
                        <button
                            onClick={handleAdd}
                            className={ filter !='faq' ? "hidden" : "w-[30%] text-white bg-orange-primary hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"}>
                            Tambah FAQ
                        </button>
                        <button
                            onClick={handleSubmit2}
                            className="w-[30%] text-white bg-[#307B28] hover:bg-white hover:text-[#307B28] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Update FAQ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}