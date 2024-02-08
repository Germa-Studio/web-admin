import { useState } from 'react';
import { IconPhoto } from '@tabler/icons-react';
import PropTypes from 'prop-types';

function InputImage({ imageActive, onChange, title }) {
  const [image, setImage] = useState('');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    onChange(file);
  };
  return (
    <label
      htmlFor="imageInput"
      className="cursor-pointer border-solid border-2 border-slate-800 w-80 h-60 rounded-2xl">
      {image ? (
        <img src={image} className="w-full h-full rounded-2xl object-cover" />
      ) : imageActive ? (
        <img src={imageActive} className="w-full h-full rounded-2xl object-cover" />
      ) : (
        <div className="flex flex-col justify-center items-center mt-8">
          <span className="font-medium opacity-30">{title || ''}</span>
          <IconPhoto size={'8rem'} color="rgb(63 63 70)" className="opacity-30" />
          <span className="underline underline-offset-1 text-green-600 font-medium">
            Upload Foto
          </span>
        </div>
      )}
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageChange(e)}
      />
    </label>
  );
}
InputImage.propTypes = {
  imageActive: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string
};

export default InputImage;
