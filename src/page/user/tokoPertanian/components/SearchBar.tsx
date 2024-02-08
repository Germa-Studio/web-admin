// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export default function SearchBar() {
  return (
    <div className="flex border-2 border-black px-3 py-1 rounded-xl w-[50%]">
      <input id="search" type="text" className="w-[100%] h-[100%] focus:outline-none" />
      <label htmlFor="search" className="flex justify-center items-center gap-2">
        |<FontAwesomeIcon icon={faMagnifyingGlass} />
      </label>
    </div>
  );
}
