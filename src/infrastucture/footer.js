import Api from './base';
import SweatAlert from '../components/uiComponents/swetAlert';

export const UploadFooter = async (key, file, value, category) => {
  try {
    console.log('upload ', key, file, value, category);
    const formData = new FormData();
    formData.append('key', key);
    formData.append('file', file);
    formData.append('value', value);
    formData.append('category', category);
    const response = await Api.post('/footer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetFooter = async () => {
  try {
    const response = await Api.get('/footer');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetFooterDetail = async (key) => {
  try {
    const response = await Api.get(`/footer?key=${key}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetFooterCategory = async (category, desc) => {
  try {
    const response = await Api.get(`/footer?category=${category}&desc=${desc}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const DeleteFooter = async (key) => {
  try {
    const response = await Api.delete(`/footer?key=${key}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UploadFaq = async (question, answer) => {
  try {
    const raw = JSON.stringify({
      question: question,
      answer: answer
    });
    // const formData = new FormData();
    // formData.append('question', question);
    // formData.append('answer', answer);
    const response = await Api.post('/faq', raw, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetFaq = async () => {
  try {
    const response = await Api.get('/faq');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetFaqDetail = async (id) => {
  try {
    const response = await Api.get(`/faq/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UpdateFaqDetail = async (id, question, answer) => {
  try {
    const raw = JSON.stringify({
      question: question,
      answer: answer
    });
    const response = await Api.patch(`/faq/${id}`, raw, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const DeleteFaq = async (id) => {
  try {
    const response = await Api.delete(`/faq/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
