import SweatAlert from '../components/uiComponents/swetAlert';
import API from './base';

export const GetDashboardInfo = async () => {
  try {
    const response = await API.get(`/dashboard`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
