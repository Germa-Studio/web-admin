import { TPenyuluh, TPetani } from '../types/petani';

export type TokoTani = {
  id: number;
  profesiPenjual: string;
  namaProducts: string;
  stok: number;
  satuan: string;
  harga: number;
  deskripsi: string;
  fotoTanaman: string;
  status: string;
  accountID: string;
  createdAt: string;
  updatedAt: string;

  tbl_akun?: DataPerson;
};

export type TableTokoTani = {
  no: number;
  actions: React.ReactNode;
} & TokoTani;

export type FilteredTokoTani = {
  kecamatan: string;
  desa: string;
  NIK: string;
  nama: string;
  namaProducts: string;
  stok: string;
  satuan: string;
  harga: string;
  deskripsi: string;
  fotoProduk: string;
  status: string;
};

export type DataPerson = {
  id: number;
  accountID: string;
  email: string;
  no_wa: string;
  nama: string;
  pekerjaan: string;
  peran: string;
  foto: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;

  dataPetani: TPetani | null;
  dataPenyuluh: TPenyuluh | null;
};
