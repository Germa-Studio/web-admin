import SweatAlert from '../components/uiComponents/swetAlert';
import API from './base';

export const getLogActivity = async (page, limit) => {
  try {
    const url = `/log-activity?page=${page}&limit=${limit}`;
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const getTrashActivity = async (page, limit) => {
  try {
    const url = `/trash-activity?page=${page}&limit=${limit}`;
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const deleteTrashActivity = async (id) => {
  try {
    const url = `/trash-activity/${id}`;
    const response = await API.delete(url);
    SweatAlert(String(response.data.message), 'success', 'reload');
    // return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const restoreTrashActivity = async (id) => {
  try {
    const url = `/trash-activity-restore/${id}`;
    const response = await API.patch(url);
    SweatAlert(String(response.data.message), 'success', 'reload');
    // return response.data;
  } catch (error) {
    console.log(error);
    SweatAlert(String(error.response.data.message), 'error');
  }
};
