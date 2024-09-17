import { useState } from 'react';
import { IconPhoto } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function InputImage({ imageActive, onChange, title, id, disabled }) {
  const [image, setImage] = useState('');
  const handleImageChange = (e) => {
    if (disabled) return;
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    onChange(file);
  };
  return (
    <label
      htmlFor={`imageInput-${id}`}
      className={clsx(
        'border-solid border-2 border-slate-800 w-80 h-60 rounded-2xl',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}>
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
        id={`imageInput-${id}`}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageChange(e)}
        disabled={disabled}
      />
    </label>
  );
}

InputImage.propTypes = {
  imageActive: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool
};

export default InputImage;
