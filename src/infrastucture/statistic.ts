import SweatAlert from '../components/uiComponents/swetAlert';
import { TDataTanaman, TDataTanamanInput } from '../types/dataTanaman';
import { PaginatedRespApi, RespApiData } from '../types/paginatedRespApi';
import { TRequestQuery } from '../types/query';
import { TKomoditasResponse, TSummaryKategoriResponse } from '../types/statistik';
import { TTanamanPetani } from '../types/tanamanPetani';
import Api from './base';

export const AddNewDataTanaman = async (data: TDataTanamanInput) => {
  try {
    const response = await Api.post('/statistik', data);
    SweatAlert(String(response.data.message), 'success');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetStatistikTanamanAll = async (poktan_id?: number, query?: TRequestQuery) => {
  const { isExport } = query ?? {};
  try {
    if (!isExport) {
      const response = await Api.get(
        `/statistik?poktan_id=${poktan_id}&limit=${query?.limit ?? 10}&page=${
          query?.page ?? 1
        }&sortBy=${query?.sortBy ?? 'id'}&sortType=${
          query?.sortType ?? 'ASC'
        }&search=${query?.search ?? ''}`
      );
      return response.data as PaginatedRespApi<TDataTanaman>;
    } else {
      const response = await Api.get(`/statistik?isExport=${isExport}`);
      return response.data;
    }
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetStatistikTanamanById = async (id: number) => {
  try {
    const response = await Api.get(`/statistik/${id}`);
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UpdateStatistikTanamanById = async (id: number, data: TDataTanamanInput) => {
  try {
    const response = await Api.put(`/statistik/${id}`, data);
    SweatAlert(String(response.data.message), 'success');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const DeleteStatistikTanamanById = async (id: number) => {
  try {
    const response = await Api.delete(`/statistik/${id}`);
    SweatAlert(String(response.data.message), 'success');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const GetStatistikTanamanPetani = async (
  month: number,
  year: number,
  lineType = 'komoditas',
  pieType = 'kategori'
) => {
  try {
    const response = await Api.get(
      `/tanaman-petani/statistik?month=${month}&year=${year}&lineType=${lineType}&pieType=${pieType}`
    );

    return response.data as RespApiData<{
      latest: TTanamanPetani[];
      statistik: TKomoditasResponse[];
      summary: TSummaryKategoriResponse[];
    }>;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};

export const UploadStatistikTanaman = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await Api.post('/statistik/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    SweatAlert(String(response.data.message), 'success');
    return response.data;
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'error');
  }
};
