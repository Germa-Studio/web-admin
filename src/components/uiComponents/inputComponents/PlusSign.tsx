// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { FaPlus } from 'react-icons/fa';

export default function SearchInput(props: { placeholder: string }) {
  return (
    <div className="flex gap-8 mt-4">
      <input
        className="bg-[#C9C9C9] border-[#A9A9A9] focus-visible:outline-none w-4/5 h-12 rounded-lg placeholder:text-[#A5A5A5] p-8 placeholder:text-lg"
        placeholder={props.placeholder}
      />
      <button className="flex gap-4 bg-[#F29D0E] flex-grow rounded-lg items-center justify-center text-xl text-white active:bg-[#F29D0E] active:shadow-md active:translate-y-1">
        <FaPlus />
      </button>
    </div>
  );
}
