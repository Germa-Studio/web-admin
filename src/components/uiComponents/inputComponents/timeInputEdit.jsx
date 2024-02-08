import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TimeInput({
  idMulai,
  nameMulai,
  idSelesai,
  nameSelesai,
  label,
  contoh = '',
  waktu,
  waktuActiveMulai,
  waktuActiveAkhir
}) {
  const [mulai, setMulai] = useState('');
  const [akhir, setAkhir] = useState('');
  const waktuJam = `${mulai} - ${akhir}`;
  useEffect(() => {
    waktu(waktuJam);
  }, [waktu, waktuJam]);
  return (
    <div className="relative z-0 w-full mb-6 group">
      <div className="flex">
        {mulai ? (
          <input
            type="time"
            value={mulai}
            name={`${nameMulai}`}
            id={`${idMulai}`}
            onChange={(e) => setMulai(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
        ) : (
          <input
            type="time"
            value={waktuActiveMulai?.trim()}
            name={`${nameMulai}`}
            id={`${idMulai}`}
            onChange={(e) => setMulai(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
        )}
        <span className="px-2 text-gray-500">-</span>
        {akhir ? (
          <input
            type="time"
            value={akhir}
            name={`${nameSelesai}`}
            id={`${idSelesai}`}
            onChange={(e) => setAkhir(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
        ) : (
          <input
            type="time"
            value={waktuActiveAkhir?.trim()}
            name={`${nameSelesai}`}
            id={`${idSelesai}`}
            onChange={(e) => setAkhir(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
        )}
        <span className="px-2 text-gray-500">WIB</span>
      </div>
      <label
        htmlFor={`${idMulai}`}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        <strong>{`${label}`}</strong> (Contoh: {`${contoh}`})
      </label>
    </div>
  );
}

TimeInput.propTypes = {
  idMulai: PropTypes.string,
  nameMulai: PropTypes.string,
  idSelesai: PropTypes.string,
  nameSelesai: PropTypes.string,
  label: PropTypes.string,
  contoh: PropTypes.string,
  waktu: PropTypes.func,
  waktuActiveMulai: PropTypes.string,
  waktuActiveAkhir: PropTypes.string
};

export default TimeInput;
