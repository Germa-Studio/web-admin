import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
// import { GetRiwayatChat } from '@/infrastruture';
function DataRiwayatChat() {
  // const [datas, setDatas] = useState([]);
  const [filters, setFilters] = useState({
    kecamatan: '',
    nipPenyuluh: '',
    namaPenyuluh: '',
    wilayahBinaan: '',
    chatMasuk: '',
    chatBelumDibalas: ''
  });

  const handleFilterChange = (e, column) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: e.target.value
    }));
  };

  const data = [
    {
      id: 1,
      kecamatan: 'Karanganyar',
      nipPenyuluh: '350877994433',
      namaPenyuluh: 'John Doe',
      wilayahBinaan: 'Wilayah Binaan 1',
      chatMasuk: 'Chat Masuk 1',
      chatBelumDibalas: 'Chat Belum Dibalas 1'
    },
    {
      id: 2,
      kecamatan: 'Benowo',
      nipPenyuluh: '350877994432',
      namaPenyuluh: 'John Doa',
      wilayahBinaan: 'Wilayah Binaan 2',
      chatMasuk: 'Chat Masuk 2',
      chatBelumDibalas: 'Chat Belum Dibalas 2'
    },
    {
      id: 3,
      kecamatan: 'Kita',
      nipPenyuluh: '350877994431',
      namaPenyuluh: 'John Dou',
      wilayahBinaan: 'Wilayah Binaan 3',
      chatMasuk: 'Chat Masuk 3',
      chatBelumDibalas: 'Chat Belum Dibalas 3'
    }
  ];

  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] !== '') {
        if (typeof item[key] === 'number') {
          return item[key] === Number(filters[key]);
        } else {
          return item[key].toLowerCase().includes(filters[key].toLowerCase());
        }
      }
      return true;
    });
  });
  return (
    <div className="flex justify-center pt-12">
      <div className="w-full max-w-screen-xl shadow-xl rounded-lg overflow-x-auto overflow-y-auto">
        <div className="pt-20">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-2 truncate border">Kecamatan</th>
                <th className="px-4 py-2 truncate border">NIP Penyuluh</th>
                <th className="px-4 py-2 truncate border">Nama Penyuluh</th>
                <th className="px-4 py-2 truncate border">Wilayah Binaan</th>
                <th className="px-4 py-2 truncate border">Chat Masuk</th>
                <th className="px-4 py-2 truncate border">Chat Belum Dibalas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.kecamatan}
                      onChange={(e) => handleFilterChange(e, 'kecamatan')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Kecamatan"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.nipPenyuluh}
                      onChange={(e) => handleFilterChange(e, 'nipPenyuluh')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter NIP Penyuluh"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.namaPenyuluh}
                      onChange={(e) => handleFilterChange(e, 'namaPenyuluh')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Nama Penyuluh"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.wilayahBinaan}
                      onChange={(e) => handleFilterChange(e, 'wilayahBinaan')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Wilayah Binaan"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.chatMasuk}
                      onChange={(e) => handleFilterChange(e, 'chatMasuk')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Chat Masuk"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.chatBelumDibalas}
                      onChange={(e) => handleFilterChange(e, 'chatBelumDibalas')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Chat Belum Dibalas"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
              </tr>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border">{item.kecamatan}</td>
                  <td className="px-4 py-2 border">{item.nipPenyuluh}</td>
                  <td className="px-4 py-2 border">{item.namaPenyuluh}</td>
                  <td className="px-4 py-2 border">{item.wilayahBinaan}</td>
                  <td className="px-4 py-2 border">{item.chatMasuk}</td>
                  <td className="px-4 py-2 border">{item.chatBelumDibalas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataRiwayatChat;
