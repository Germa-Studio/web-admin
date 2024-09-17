import { Button, Select, TextInput } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditableKelompokTani } from '../../types/kelompokTani';
import {
  GetKelompokById,
  UpdateKelompok,
  GetKecamatan,
  GetDesaByKecamatan
} from '../../infrastucture';
import { fecthDesa, fecthKecamatan } from '../../infrastucture/daerah';
import { TKecamatanBinaan } from '../../types/petani';

export default function DataKelompokForm({ type }: { type: 'add' | 'detail' | 'edit' }) {
  const params = useParams();
  const id = Number(params.id);

  const [data, setData] = React.useState<EditableKelompokTani | null>(null);
  const [daftarKecamatan, setDaftarKecamatan] = React.useState<string[]>([]);
  const [daftarDesa, setDaftarDesa] = React.useState<string[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    fecthKecamatan().then((res) => {
      setDaftarKecamatan(
        res.data.map((kecamatan: TKecamatanBinaan) => ({
          value: `${kecamatan.id}`,
          label: kecamatan.nama
        }))
      );
    });
  }, []);

  React.useEffect(() => {
    GetKelompokById(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  React.useEffect(() => {
    if (data?.kecamatanId) {
      fecthDesa(data.kecamatanId).then((res) => {
        setDaftarDesa(res.data.map((desa) => ({ value: `${desa.id}`, label: desa.nama })));
      });
    }
  }, [data?.kecamatanId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === 'edit') {
      UpdateKelompok(id, data).then(() => {
        navigate('/list-kelompok');
      });
    }
  };

  return (
    <form className={clsx('bg-[#D9D9D9] rounded-lg block')} onSubmit={handleSubmit}>
      <div className="relative bg-[#136B09] mt-6 p-4 flex w-full justify-between rounded-t-lg shadow-lg items-center">
        <h3 className="text-white text-2xl font-bold">
          {type === 'add' ? 'Tambah' : type === 'edit' ? 'Edit' : 'Detail'} Data Kelompok
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-6">
        <div>
          <p>Gapoktan</p>
          <TextInput
            placeholder="Gapoktan"
            value={data?.gapoktan}
            onChange={(e) => {
              setData((prev) => ({ ...prev, gapoktan: e.currentTarget.value ?? '' }));
            }}
          />
        </div>
        <div>
          <p>Kecamatan</p>
          <Select
            placeholder="-Pilih Kecamatan-"
            value={`${data?.kecamatanId}`}
            onChange={(value) => {
              setData((prev) => ({ ...prev, kecamatanId: value ?? '' }));
            }}
            data={daftarKecamatan}
          />
        </div>
        <div>
          <p>Nama Kelompok</p>
          <TextInput
            placeholder="Nama Kelompok"
            value={data?.namaKelompok}
            onChange={(e) => {
              setData((prev) => ({ ...prev, namaKelompok: e.currentTarget.value ?? '' }));
            }}
          />
        </div>
        <div>
          <p>Desa</p>
          <Select
            placeholder="-Pilih Desa-"
            value={`${data?.desaId}`}
            onChange={(value) => {
              setData((prev) => ({ ...prev, desaId: value ?? '' }));
            }}
            data={daftarDesa}
            disabled={!data?.kecamatanId}
          />
        </div>
      </div>
      <div className="flex px-6 pb-6 justify-end gap-4">
        <Button
          type="button"
          className="bg-blue-500"
          onClick={() => {
            navigate('/list-kelompok');
          }}>
          Kembali
        </Button>
        <Button type="submit" className="bg-[#307B28]">
          Simpan Data
        </Button>
      </div>
    </form>
  );
}
