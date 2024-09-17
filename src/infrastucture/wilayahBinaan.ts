import SweatAlert from '../components/uiComponents/swetAlert';
import Api from './base';

const deleteWilayahBinaan = async (
  penyuluhId: number,
  wilayahId: number | string,
  type: 'desa' | 'kecamatan'
) => {
  try {
    const response = await Api.delete('/penyuluh/wilayah-binaan', {
      data: {
        type,
        penyuluhId,
        wilayahId
      }
    });
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};

const deleteKecamatanBinaan = async (penyuluhId: number, kecamatanId: number | string) => {
  deleteWilayahBinaan(penyuluhId, kecamatanId, 'kecamatan');
};

const deleteDesaBinaan = async (penyuluhId: number, desaId: number | string) => {
  deleteWilayahBinaan(penyuluhId, desaId, 'desa');
};

const addWilayahBinaan = async (
  penyuluhId: number,
  wilayahId: number | string,
  type: 'desa' | 'kecamatan'
) => {
  try {
    const response = await Api.post('/penyuluh/wilayah-binaan', {
      type,
      penyuluhId,
      wilayahId
    });
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};

const addKecamatanBinaan = async (penyuluhId: number, kecamatanId: number | string) => {
  addWilayahBinaan(penyuluhId, kecamatanId, 'kecamatan');
};

const addDesaBinaan = async (penyuluhId: number, desaId: number | string) => {
  addWilayahBinaan(penyuluhId, desaId, 'desa');
};

export { deleteKecamatanBinaan, addKecamatanBinaan, deleteDesaBinaan, addDesaBinaan };
