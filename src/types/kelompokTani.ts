import { TDataWilayah } from './wilayah';

export type TKelompokTani = {
  id: number;
  gapoktan: string;
  namaKelompok: string;
  desa: string;
  kecamatan: string;
  penyuluh: string | null;
  createdAt: string | null;
  updatedAt: string | null;
} & TDataWilayah;

export type EditableKelompokTani = {
  gapoktan?: string;
  namaKelompok?: string;
  desa?: string;
  kecamatan?: string;
  penyuluh?: string | null;
};
