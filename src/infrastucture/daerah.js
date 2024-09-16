import Api from './base';

const fecthKecamatan = async (searchQuery) => {
  try {
    const response = await Api.get('/wilayah/kecamatan', {
      params: {
        search: searchQuery
      }
    });
    return response.data;
  } catch (error) {
    return 'terjadi kesalahan';
  }
};
const fecthDesa = async (kecamatanId, searchQuery) => {
  try {
    const response = await Api.get('/wilayah/desa', {
      params: {
        kecamatanId: kecamatanId,
        search: searchQuery
      }
    });
    return response.data;
  } catch (error) {
    return 'terjadi kesalahan';
  }
};

export { fecthKecamatan, fecthDesa };
