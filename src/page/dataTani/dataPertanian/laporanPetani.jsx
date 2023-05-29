function LaporanPetani() {
    return (
        <div className="px-10 md:px-40 py-10">
            <form>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="nik" id="nik" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="nik" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><strong>Cek NIK</strong> (Contoh: 3514002000000001)</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 gronup">
                            <p><strong>Nama Petani: </strong> SUROSO DIKDOYO</p>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <p><strong>Status Tanah: </strong> Milik Sendiri</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 gronup">
                            <p><strong>Kecamatan: </strong> Karanganyar</p>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <p><strong>Desa: </strong> Pringgodani</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 gronup">
                            <p><strong>Gapoktan: </strong> Power Ranger</p>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <p><strong>Nama Kelompok: </strong> Ranger Merah</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 gronup">
                            <p><strong>Penyuluh: </strong> Werkudara Arya Bima</p>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <p><strong>Musim Tanam: </strong> 2</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="underline_select" className="text-sm ">
                                <strong>Kategori:</strong>
                            </label>
                            <div className="flex items-center pt-2">
                                <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tanaman Pangan</label>
                            </div>
                            <div className="flex items-center py-2">
                                <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tanaman Perkebunan</label>
                            </div>
                            <div className="flex items-center">
                                <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tanaman  Holtikultura</label>
                            </div>
                            <div className="flex items-center py-2">
                                <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lainnya</label>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="underline_select" className="text-sm">
                                <strong>Pilih Jenis Tanaman</strong>
                            </label>
                            <select
                                id="underline_select"
                                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown"
                            >
                                <option value="US">Buah</option>
                                <option value="CA">Sayur</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 mt-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="underline_select" className="text-sm dark:text-gray-400 pt-5 md:pt-0">
                                    <strong>Pilih komoditas: </strong>
                                </label>
                                <select
                                    id="underline_select"
                                    className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer-placeholder-shown"
                                >
                                    <option value="US">Sewa</option>
                                    <option value="CA">Milik Sendiri</option>
                                </select>
                            </div>
                        </div>
            </form>
        </div>
    )
}

export default LaporanPetani