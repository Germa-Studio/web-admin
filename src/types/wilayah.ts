export type TDataWilayah = {
  kecamatanId: number | null;
  kecamatanData: TDataWilayahDetail | null;
  desaId: number | null;
  desaData:
    | (TDataWilayahDetail & {
        type: 'desa' | 'kelurahan';
      })
    | null;
};

export type TDataWilayahDetail = {
  id: number;
  nama: string;
};

export type TTableDataWilayahDetail = {
  no: number;
  actions: React.ReactNode;
} & TDataWilayahDetail;
