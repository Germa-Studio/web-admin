import PropTypes from 'prop-types';
function IconCrud({ icon, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="hover:bg-green-secondary rounded-md border border-grey-primary">
      <div className="cursor-pointer space-x-1 m-1 flex flex-row items-center">
        {icon}
        <span className="text-xs sm:text-sm" style={{ marginTop: -5 }}>
          {children}
        </span>
      </div>
    </div>
  );
}

IconCrud.propTypes = {
  icon: PropTypes.element,
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default IconCrud;
