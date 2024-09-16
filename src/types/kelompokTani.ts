export type TKelompokTani = {
  id: number;
  gapoktan: string;
  namaKelompok: string;
  desa: string;
  kecamatan: string;
  penyuluh: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  kecamatanId: number | null;
  kecamatanData: {
    nama: string;
  } | null;
  desaId: number | null;
  desaData: {
    nama: string;
  } | null;
};

export type EditableKelompokTani = {
  gapoktan?: string;
  namaKelompok?: string;
  desa?: string;
  kecamatan?: string;
  penyuluh?: string | null;
};
