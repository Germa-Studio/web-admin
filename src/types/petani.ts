import { TKelompokTani } from './kelompokTani';
import { TDataWilayah, TDataWilayahDetail } from './wilayah';

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
} & TAkun &
  TDataWilayah;

export type TPenyuluh = {
  desaBinaan: string;
  kecamatanBinaan: string;
  namaProduct: string;
  kecamatanBinaanData: TKecamatanBinaan[];
  desaBinaanData: TDesaBinaan[];
} & TAkun &
  TDataWilayah;

export type TKecamatanBinaan = {
  id: number;
  kecamatan: TDataWilayahDetail;
  penyuluhId: number;
};

export type TDesaBinaan = {
  id: number;
  desa: TDataWilayahDetail;
  penyuluhId: number;
};

export type TTableKecamatanBinaan = {
  no: number;
  actions: React.ReactNode;
} & TKecamatanBinaan;

export type TTableDesaBinaan = {
  no: number;
  actions: React.ReactNode;
} & TDesaBinaan;
