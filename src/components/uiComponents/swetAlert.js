import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SweatAlert = (title, icon, redirect, text) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title,
    text: text ? text : null,
    icon,
    confirmButtonText: 'Oke'
  }).then((result) => {
    if (result.isConfirmed) {
      if (redirect) {
        if (redirect == 'reload') {
          return window.location.reload();
        }
        window.location.href = redirect;
      }
    }
  });
};

export default SweatAlert;
