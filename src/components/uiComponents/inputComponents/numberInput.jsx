import PropTypes from 'prop-types';

function NumberInput({ id, name, label, contoh = '', type = 'number', onChange, value }) {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        type={`${type}`}
        name={`${name}`}
        id={`${id}`}
        value={value}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor={`${id}`}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        <strong>{`${label}`}</strong>
        {contoh && `( Contoh: ${contoh})`}
      </label>
    </div>
  );
}

NumberInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  contoh: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default NumberInput;
