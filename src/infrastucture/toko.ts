import SweatAlert from '../components/uiComponents/swetAlert';
import API from './base';

export const getTokoTani = () => {
  return API.get('/product-petani-no-auth');
};

export const deleteTokoTani = async (id: number) => {
  try {
    const response = await API.delete(`/product-petani/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
