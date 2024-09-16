import SweatAlert from '../components/uiComponents/swetAlert';
import Api from './base';

const deleteKecamatanBinaan = async (penyuluhId: number, kecamatanId: number) => {
  try {
    const response = await Api.delete('/penyuluh/wilayah-binaan', {
      data: {
        type: 'kecamatan',
        penyuluhId,
        wilayahId: kecamatanId
      }
    });
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};

const addKecamatanBinaan = async (penyuluhId: number, kecamatanId: number) => {
  try {
    const response = await Api.post('/penyuluh/wilayah-binaan', {
      type: 'kecamatan',
      penyuluhId,
      wilayahId: kecamatanId
    });
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};

export { deleteKecamatanBinaan, addKecamatanBinaan };
