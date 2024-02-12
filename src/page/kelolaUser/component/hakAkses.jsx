
import { useState } from "react"
import SearchInput from "../../../components/uiComponents/inputComponents/SearchInput"
import TableAkses from "./tableAkses"

export default function HakAkses(){
    const [user, setUser] = useState(
        [
            {
                id: "petani",
                nama: "Petani"
            },
            {
                id: "penyuluh",
                nama: "Penyuluh"
            },
            {
                id: "oprPoktan",
                nama: "Operator Poktan"
            },
            {
                id: "adm",
                nama: "Admin"
            },
            {
                id: "sAdm",
                nama: "Super Admin"
            }
        ]
    )
    const [data, setData] = useState(
        [
            {
                id: "das",
                nama: "Dashboard",
                actions: [
                    {
                        id: "r-das",
                        nama: "Menampilkan Data",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "v-das",
                        nama: "Verifikasi Petani",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    }
                ]
            },
            {
                id: "stat",
                nama: "Statistik",
                actions: [
                    {
                        id: "c-stat",
                        nama: "Membuat Statistik Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-stat",
                        nama: "Melihat Statistik Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-stat",
                        nama: "Mengedit Statistik Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "ur-stat",
                        nama: "Mengedit Statistik Realisasi Panen Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-stat",
                        nama: "Menghapus Statistik Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : false,
                            sAdm : true
                        }
                    }
                ]
            },
            {
                id: "tani",
                nama: "Data Pertanian",
                actions: [
                    {
                        id: "c-tani",
                        nama: "Membuat Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-tani",
                        nama: "Melihat Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-tani",
                        nama: "Mengedit Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "ur-tani",
                        nama: "Mengedit Realisasi Panen Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-tani",
                        nama: "Menghapus Data Pertanian",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : false,
                            sAdm : true
                        }
                    }
                ]
            },
            {
                id: "infTani",
                nama: "Info Pertanian",
                actions: [
                    {
                        id: "c-br-infTani",
                        nama: "Membuat Berita Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-br-infTani",
                        nama: "Melihat Berita Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-br-infTani",
                        nama: "Mengedit Berita Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-br-infTani",
                        nama: "Menghapus Berita Pertanian",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : false,
                            sAdm : true
                        }
                    },
                    {
                        id: "c-ac-infTani",
                        nama: "Membuat Acara Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-ac-infTani",
                        nama: "Melihat Acara Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-ac-infTani",
                        nama: "Mengedit Acara Pertanian",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-ac-infTani",
                        nama: "Menghapus Acara Pertanian",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : false,
                            sAdm : true
                        }
                    },
                ]
            },
            {
                id: "toko",
                nama: "Toko Pertanian",
                actions: [
                    {
                        id: "c-toko",
                        nama: "Membuat Toko Pertanian",
                        access: {
                            petani : true,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-toko",
                        nama: "Melihat Toko Pertanian",
                        access: {
                            petani : true,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-toko",
                        nama: "Mengedit Toko Pertanian",
                        access: {
                            petani : true,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-toko",
                        nama: "Menghapus Toko Pertanian",
                        access: {
                            petani : true,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                ]
            },
            {
                id: "infPen",
                nama: "Info Penyuluh",
                actions: [
                    {
                        id: "c-rkp-infPen",
                        nama: "Membuat Rekap Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-rkp-infPen",
                        nama: "Melihat Rekap Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-rkp-infPen",
                        nama: "Mengedit Rekap Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-rkp-infPen",
                        nama: "Menghapus Rekap Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : false,
                            sAdm : false
                        }
                    },
                    {
                        id: "c-jnl-infPen",
                        nama: "Membuat Jurnal Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-jnl-infPen",
                        nama: "Melihat Jurnal Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-jnl-infPen",
                        nama: "Mengedit Jurnal Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-jnl-infPen",
                        nama: "Mengedit Jurnal Penyuluh",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : true,
                            adm : false,
                            sAdm : false
                        }
                    },
                ]
            },
            {
                id: "opt",
                nama: "Pengaturan",
                actions: [
                    {
                        id: "crud-opt",
                        nama: "Mengelola Pengaturan Website",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    }
                ]
            },
            {
                id: "log",
                nama: "Log Aktivitas",
                actions: [
                    {
                        id: "r-log",
                        nama: "Melihat Log Aktivitas",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "rs-log",
                        nama: "Melihat Sampah Sementara",
                        access: {
                            petani : false,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "ds-log",
                        nama: "Menghapus Sampah Sementara",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    }
                ]
            },
            {
                id: "prof",
                nama: "Profil",
                actions: [
                    {
                        id: "r-prof",
                        nama: "Melihat Data Profil",
                        access: {
                            petani : true,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-prof",
                        nama: "Mengedit Data Profil",
                        access: {
                            petani : true,
                            penyuluh : true,
                            oprPoktan : true,
                            adm : true,
                            sAdm : true
                        }
                    }
                ]
            },
            {
                id: "opr",
                nama: "Operator",
                actions: [
                    {
                        id: "c-opr",
                        nama: "Membuat Data Operator",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "r-opr",
                        nama: "Melihat Data Operator",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "u-opr",
                        nama: "Mengedit Data Operator",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : true,
                            sAdm : true
                        }
                    },
                    {
                        id: "d-opr",
                        nama: "Menghapus Data Operator",
                        access: {
                            petani : false,
                            penyuluh : false,
                            oprPoktan : false,
                            adm : false,
                            sAdm : true
                        }
                    }
                ]
            },
        ]
    )

    const handleChange= (e) => {

    }

    return(
        <div>
            {/* {console.log(data[0])} */}
            <SearchInput placeholder="Cari Filter" />
            {data?.map((datas,i)=>(
                <div key={i}>
                    <div className='mt-6 text-lg text-green-primary font-extrabold mb-4'>{datas.nama}</div>
                    <table id="tabelAkses" className="w-[100%] border-collapse !rounded-lg">
                        <thead>
                            <tr className="bg-green-primary text-white">
                                <th className="p-2 rounded-ss-lg">Kegiatan</th>
                                {user?.map(dataUser=>(
                                    <th key={dataUser.id} className="p-2 last:rounded-se-lg">{dataUser.nama}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                        {/* {console.log("datatabel "+data[i])} */}
                            {data[i].actions?.map(dataa=>(
                                <tr key={dataa.id} className="group even:bg-gray-300 odd:bg-white">
                                    <td className="p-2 group-last:rounded-es-lg">{dataa.nama}</td>
                                    <td className="p-2 text-center">
                                        <input type="checkbox" checked={dataa.access.petani ? true : false} onChange={handleChange} className="w-4 h-4 fill-green-primary"/>
                                    </td>
                                    <td className="p-2 text-center">
                                        <input type="checkbox" checked={dataa.access.penyuluh ? true : false} onChange={handleChange} className="scale-125"/>
                                    </td>
                                    <td className="p-2 text-center">
                                        <input type="checkbox" checked={dataa.access.oprPoktan ? true : false} onChange={handleChange} className="scale-125"/>
                                    </td>
                                    <td className="p-2 text-center">
                                        <input type="checkbox" checked={dataa.access.adm ? true : false} onChange={handleChange} className="scale-125"/>
                                    </td>
                                    <td className="p-2 text-center  group-last:rounded-ee-lg">
                                        <input type="checkbox" checked={dataa.access.sAdm ? true : false} onChange={handleChange} className="scale-125"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
        
    )
}

