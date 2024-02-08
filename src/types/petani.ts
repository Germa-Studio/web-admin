import { TKelompokTani } from './kelompokTani';

type TAkun = {
  id: number;
  accountID: number;
  nik: string;
  nama: string;
  foto: string;
  alamat: string;
  desa: string;
  kecamatan: string;
  email: string;
  noTelp: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type TPetani = {
  fk_kelompokId: number;
  fk_penyuluhId: number;
  nkk: string;

  kelompok?: TKelompokTani;
} & TAkun;

export type TPenyuluh = {
  desaBinaan: string;
  kecamatanBinaan: string;
  namaProduct: string;
} & TAkun;
