// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { Anchor, Breadcrumbs } from '@mantine/core';
import Table from '../../components/table/Table';
import { getLogActivity } from '../../infrastucture/logActivity';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import { DataPerson } from '../../@types/toko';

const breadcrumbItems = [{ title: 'Dashboard', href: '/' }, { title: 'Log Aktivitas' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index} className="text-white opacity-50">
      {item.title}
    </Anchor>
  )
);

const columns = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'nama',
    header: 'Nama User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'role',
    header: 'Role User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'aktivitas',
    header: 'Aktivitas User',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  }
];

const activityType = [
  {
    type: 'CREATE',
    message: 'Menambahkan data '
  },
  {
    type: 'EDIT',
    message: 'Mengubah data '
  },
  {
    type: 'DELETE',
    message: 'Menghapus data '
  }
];

const LogActivity = () => {
  const [dataTable, setDataTable] = useState<
    | PaginatedRespApiData<{
        no: number;
        nama: string;
        role: string;
        aktivitas: string;
        date: string;
      }>
    | undefined
  >();
  const [resp, setResp] = useState<
    | PaginatedRespApiData<{
        user_id: number;
        activity: string;
        detail: string;
        tbl_akun: DataPerson;
        createdAt: string;
      }>
    | undefined
  >();

  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  useEffect(() => {
    getLogActivity(page, limit).then((data) => {
      setResp(data);
      // console.log(data);
    });
  }, [page, limit]);

  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,
        data: resp.data.map((item, index) => {
          const msg = activityType.find((type) => type.type === item.activity)?.message;
          const itemDetailArr = item.detail.split(' ');
          const msg2 = itemDetailArr[1]
            ? itemDetailArr[0] + ' TANI dengan id: ' + itemDetailArr[1]
            : itemDetailArr[0] + ' TANI';
          return {
            no: index + 1,
            nama: item.tbl_akun.nama,
            role: item.tbl_akun.peran,
            aktivitas: msg + msg2,
            date: item.createdAt.split('T')[0]
          };
        })
      });
    }
  }, [resp]);

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">Log Aktivitas</h3>
      <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
    </div>
  );
};

export default LogActivity;
