import Api from './base';
import SweatAlert from '../components/uiComponents/swetAlert';
// import LoadingAnimation from "../components/loading";

const headers = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
};
// authentication
export const Register = async (data) => {
  try {
    const response = await Api.post('/auth/register', data);
    SweatAlert(String(response.data.message), 'success');
    // redirect to login page
    window.location.href = '/login';
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const Login = async (data) => {
  try {
    const response = await Api.post('/auth/login', data);
    // console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('nama', response?.data?.user?.nama);
    localStorage.setItem('user_id', response?.data?.user?.id);
    window.location.href = '/dashboard';
    SweatAlert(String(response.data.message), 'success');
    // <LoadingAnimation/>
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const ListUser = async () => {
  try {
    const response = await Api.get('/verify');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const DeleteUser = async (id) => {
  try {
    const response = await Api.delete(`/delete-user/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const VerifyingUser = async (id) => {
  try {
    const response = await Api.put(`/verify/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

// all about profile
export const GetProfile = async () => {
  const response = await Api.get('/auth/profile');
  return response;
};
export const GetDetailProfile = async () => {
  const response = await Api.get('/auth/detailprofile');
  return response;
};
export const UpdateProfile = async (data) => {
  try {
    const response = await Api.put('/auth/updateprofile', data, headers);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const Logout = () => {
  localStorage.clear();
  window.location = '/login';
};

// cekNik
export const CekNik = async (data) => {
  try {
    const response = await Api.post('/cek-nik', data);
    return response.data.user;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const CekNiP = async (data) => {
  try {
    const response = await Api.post('/cek-nip', data);
    return response.data.user;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

// data tani
export const DaftarTaniAdd = async (data) => {
  try {
    const response = await Api.post('/daftar-tani/add', data, headers);
    SweatAlert(String(response.data.message), 'success', '/data-tani/rekap-petani');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const UploadDataPetani = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await Api.post('/upload-data-petani', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const DeleteDaftarTani = async (id) => {
  try {
    const response = await Api.delete(`/daftar-tani/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const AddLaporanTani = async (data) => {
  try {
    const response = await Api.post('/laporan-tani/add', data, headers);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const tambahLaporanAkhir = async (data) => {
  try {
    const response = await Api.post('/laporan-akhir', data, headers);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};
export const editDaftarTani = async (id, data) => {
  try {
    const response = await Api.put(`/daftar-tani/${id}`, data, headers);
    SweatAlert(String(response.data.message), 'success', '/data-tani/rekap-petani');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};
export const GetLaporanTani = async () => {
  try {
    const response = await Api.get('/laporan-petani');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetListTanaman = async (page, limit, petaniId, isExport = false) => {
  try {
    // Include petaniId in the API call if it's provided

    const url =
      (petaniId
        ? `/list-tanaman?page=${page}&limit=${limit}&petaniId=${petaniId}`
        : `/list-tanaman?page=${page}&limit=${limit}`) + (isExport ? '&isExport=true' : '');

    const response = await Api.get(url);
    return response.data; // Access 'tanaman' property
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const AddTanamanPetani = async (data) => {
  try {
    const response = await Api.post('/list-tanaman', data);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const DeleteTanamanPetani = async (id) => {
  try {
    const response = await Api.delete(`/list-tanaman/${id}`);
    SweatAlert(String(response.data.message), 'success');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetTanamanPetaniById = async (id) => {
  try {
    const response = await Api.get(`/list-tanaman/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UpdateTanamanPetani = async (id, data) => {
  try {
    const response = await Api.put(`/list-tanaman/${id}`, data);
    SweatAlert(String(response.data.message), 'success', '/tanaman-petani');
    // return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UploadTanamanPetani = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await Api.post('/upload-tanaman', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
// opsi penyuluh untuk pendaftaran petani
export const GetOpsiPenyuluh = async () => {
  try {
    const response = await Api.get('/opsi-penyuluh');
    return response.data.dataDaftarPenyuluh;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetDaftarTani = async (page, limit, verified) => {
  console.log(verified);
  try {
    const response = await Api.get(`/daftar-tani?page=${page}&limit=${limit}&verified=${verified}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetDaftarTaniById = async (id) => {
  try {
    const response = await Api.get(`/daftar-tani/${id}`);
    return response.data.detailTani;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetTanmanPetani = async (id) => {
  try {
    const response = await Api.get(`/tanaman-petani/${id}`);
    return response.data.tani;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetDetailTanmanTani = async (id) => {
  try {
    const response = await Api.get(`/tanaman-petani/detail/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const AddTanmanPetani = async (data) => {
  try {
    const response = await Api.post('/tanaman-petani', data);
    SweatAlert(String(response.data.message), 'success');
    setTimeout(() => {
      window.location.href = `/data-tani/detail/${data.dataPersonId}`;
    }, 500);
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const editTanmanPetani = async (id, data) => {
  try {
    const response = await Api.put(`/tanaman-petani/${id}`, data);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const AddInfoTani = async (data) => {
  try {
    const response = await Api.post('/info-tani/add', data, headers);
    SweatAlert(String(response.data.message), 'success', '/info-tani');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetInfoTani = async (search) => {
  try {
    const response = await Api.get(`/info-tani${search}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetInfoTaniById = async (id) => {
  try {
    const response = await Api.get(`/info-tani/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const AddEventTani = async (data) => {
  try {
    const response = await Api.post('/event-tani/add', data, headers);
    SweatAlert(String(response.data.message), 'success', '/info-tani/event-tani');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetEventTani = async () => {
  try {
    const response = await Api.get('/event-tani');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetEventTaniById = async (id) => {
  try {
    const response = await Api.get(`/event-tani/${id}`);
    return response.data?.infotani;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const DeleteEventTani = async (id) => {
  try {
    const response = await Api.delete(`/event-tani/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const DeleteInfoTani = async (id) => {
  try {
    const response = await Api.delete(`/info-tani/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const updateEventTani = async (id, data) => {
  try {
    const response = await Api.put(`/event-tani/${id}`, data, headers);
    SweatAlert(String(response.data.message), 'success', '/info-tani/event-tani');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const updateInfoTani = async (id, data) => {
  try {
    const response = await Api.put(`/info-tani/${id}`, data, headers);
    return response.data;
    // SweatAlert(String(response.data.message), "success", "/info-tani");
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

// toko tani
export const AddPenjual = async (data) => {
  try {
    const response = await Api.post('/daftar-penjual/add', data, headers);
    SweatAlert(String(response.data.message), 'success', '/toko-tani');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};
export const EditPenjual = async (id, data) => {
  try {
    const response = await Api.post('/daftar-penjual/' + id, data, headers);
    SweatAlert(String(response.data.message), 'success', '/toko-tani');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error', 'reload');
  }
};
export const ProductsPenyuluh = async () => {
  try {
    const response = await Api.get('/product-penyuluh');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const ProductsPetani = async () => {
  try {
    const response = await Api.get('/product-petani');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const DetailProductsPetani = async (id) => {
  try {
    const response = await Api.get('/product-petani/' + id);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

// data penyuluh
export const AddPenyuluh = async (data) => {
  try {
    const response = await Api.post('/penyuluh/add', data, headers);
    SweatAlert(String(response.data.message), 'success', '/data-penyuluh/rekap-penyuluh');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const UploadDataPenyuluh = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await Api.post('/upload-data-penyuluh', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const AddPresesiKehadiran = async (data) => {
  try {
    const response = await Api.post('/presesi-kehadiran/add', data);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const AddJurnalKegiatan = async (data) => {
  try {
    const response = await Api.post('/jurnal-kegiatan/add', data, headers);
    SweatAlert(String(response.data.message), 'success', '/data-penyuluh/jurnal-kegiatan');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GatJurnalKegiatan = async () => {
  try {
    const response = await Api.get('/jurnal-kegiatan');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetJurnalKegiatanById = async (id) => {
  try {
    const response = await Api.get(`/jurnal-kegiatan/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const DeleteJurnalKegiatan = async (id) => {
  try {
    const response = await Api.delete(`/jurnal-kegiatan/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const UpdateJurnalKegiatan = async (id, data) => {
  try {
    const response = await Api.put(`/jurnal-kegiatan/${id}`, data, headers);
    SweatAlert(String(response.data.message), 'success', '/data-penyuluh/jurnal-kegiatan');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetPreseiKehadiran = async () => {
  try {
    const response = await Api.get('/presensi-kehadiran/web');
    return response.data?.DataPresesiKehadiran;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetRiwayatChat = async () => {
  try {
    const response = await Api.get('/riwayat-chat');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const getDaftarPenyuluh = async (page, limit) => {
  try {
    const response = await Api.get(`/daftar-penyuluh?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const DeleteDaftarPenyuluh = async (id) => {
  try {
    const response = await Api.delete(`/daftar-penyuluh/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

// live chat
export const AddChat = async (data) => {
  try {
    const response = await Api.post('/chat/add', data);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const AddRating = async () => {
  try {
    const response = await Api.post('/rating-add');
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetChatt = async () => {
  try {
    const response = await Api.get('/chat');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const GetRatting = async () => {
  try {
    const response = await Api.get('/ratting');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

// laporan tanaman
export const tambahLaporanTanam = async (data) => {
  try {
    const response = await Api.post('/laporan-tanam', data, headers);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
    throw new Error(error);
  }
};
export const editLaporanTanam = async (id, data) => {
  try {
    const response = await Api.put(`/laporan-tanam/${id}`, data, headers);
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
    throw new Error(error);
  }
};
export const getAllLaporanTanam = async (id) => {
  try {
    const response = await Api.get(`/laporan-tanam/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const deleteLaporanTanam = async (id) => {
  try {
    const response = await Api.delete(`/laporan-tanam/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const getByIdLaporanTanam = async (id) => {
  try {
    const response = await Api.get(`/laporan-tanam/detail/${id}`);
    return response.data.daftarTani;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const select = async (desa) => {
  try {
    const response = await Api.get(`/kelompok-tani/desa/${desa}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const selectPenyuluh = async (kecamatan) => {
  try {
    const response = await Api.get(`/select-tani/${kecamatan}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const getNotification = async () => {
  try {
    const response = await Api.get('/auth/verify');
    return response.data.user;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const updateStatusUser = async (id) => {
  try {
    const response = await Api.get(`/auth/verify/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
export const getPenyuluhById = async (id) => {
  try {
    const response = await Api.get(`/daftar-penyuluh/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
    throw new Error('error');
  }
};
export const updatePenyuluhById = async (payload, id) => {
  try {
    const response = await Api.put(`/daftar-penyuluh/${id}`, payload, headers);
    SweatAlert(String(response.data.message), 'success', '/data-penyuluh/rekap-penyuluh');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

/**
 * @Description Router for Operator
 */
export const GetDaftarOperator = async (page, limit) => {
  try {
    const response = await Api.get(`/daftar-operator?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetOperatorDetail = async (id) => {
  try {
    const response = await Api.get(`/daftar-operator/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const DeleteOperator = async (id) => {
  try {
    const response = await Api.delete(`/daftar-operator/${id}`);
    SweatAlert(String(response.data.message), 'success', 'reload');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const AddOperator = async (data) => {
  try {
    const response = await Api.post('/daftar-operator/add', data, headers);
    SweatAlert(String(response.data.message), 'success', '/list-operator');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UpdateOperator = async (id, data) => {
  try {
    const response = await Api.put(`/daftar-operator/${id}`, data, headers);
    SweatAlert(String(response.data.message), 'success', '/list-operator');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UploadDataOperator = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await Api.post('/upload-data-operator', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    SweatAlert(String(response.data.message), 'success');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
/** @description End of Operator Routes*/
