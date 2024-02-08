import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
// import { GetChatt } from '@/infrastruture';
function LiveChat() {
  const [filters, setFilters] = useState({
    chatMasuk: '',
    tujuanPenyuluhanMasuk: '',
    aksiChatMasuk: '',
    chatTerbalas: '',
    tujuanPenyuluhanTerbalas: '',
    aksiChatTerbalas: ''
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
      chatMasuk: 'Customer',
      tujuanPenyuluhanMasuk: 'Tujuan',
      aksiChatMasuk: 'Ingatkan Penyuluh',
      chatTerbalas: 'Petani',
      tujuanPenyuluhanTerbalas: 'Tujuan',
      aksiChatTerbalas: 'Lihat Riwayat'
    },
    {
      id: 2,
      chatMasuk: 'Petani',
      tujuanPenyuluhanMasuk: 'Penyuluhan',
      aksiChatMasuk: 'Dijawab super admin',
      chatTerbalas: 'Customer',
      tujuanPenyuluhanTerbalas: 'Penyuluhan',
      aksiChatTerbalas: 'Hapus'
    },
    {
      id: 3,
      chatMasuk: 'Petani',
      tujuanPenyuluhanMasuk: 'Tujuan',
      aksiChatMasuk: 'Ingatkan Penyuluh',
      chatTerbalas: 'Customer',
      tujuanPenyuluhanTerbalas: 'Penyuluhan',
      aksiChatTerbalas: 'Lihat Riwayat'
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
                <th className="px-4 py-2 truncate border">Chat Masuk</th>
                <th className="px-4 py-2 truncate border">Tujuan/Penyuluhan</th>
                <th className="px-4 py-2 truncate border">Aksi</th>
                <th className="px-4 py-2 truncate border">Chat Terbalas</th>
                <th className="px-4 py-2 truncate border">Tujuan/Penyuluhan</th>
                <th className="px-4 py-2 truncate border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                      value={filters.tujuanPenyuluhanMasuk}
                      onChange={(e) => handleFilterChange(e, 'tujuanPenyuluhanMasuk')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Penyuluh/Tujuan"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.aksiChatMasuk}
                      onChange={(e) => handleFilterChange(e, 'aksiChatMasuk')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Aksi"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.chatTerbalas}
                      onChange={(e) => handleFilterChange(e, 'chatTerbalas')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Chat Terbalas"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.tujuanPenyuluhanTerbalas}
                      onChange={(e) => handleFilterChange(e, 'tujuanPenyuluhanTerbalas')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Tujuan/Penyuluh"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={filters.aksiChatTerbalas}
                      onChange={(e) => handleFilterChange(e, 'aksiChatTerbalas')}
                      className="pl-8 pr-4 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Filter Aksi"
                    />
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 ml-2" />
                  </div>
                </td>
              </tr>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border">{item.chatMasuk}</td>
                  <td className="px-4 py-2 border">{item.tujuanPenyuluhanMasuk}</td>
                  <td className="px-4 py-2 border">{item.aksiChatMasuk}</td>
                  <td className="px-4 py-2 border">{item.chatTerbalas}</td>
                  <td className="px-4 py-2 border">{item.tujuanPenyuluhanTerbalas}</td>
                  <td className="px-4 py-2 border">{item.aksiChatTerbalas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
