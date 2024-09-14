import { Anchor, Breadcrumbs } from '@mantine/core';
import React, { useEffect } from 'react';
import { GetStatistikTanamanAll } from '../../infrastucture/statistic';
import { PaginatedRespApiData } from '../../types/paginatedRespApi';
import { TDataTanaman } from '../../types/dataTanaman';
import { komoditasSemusim, komoditasTahunan } from '../../types/const';
import { utils, writeFileXLSX } from 'xlsx';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Statistik' },
  { title: 'Export Data' }
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

export default function ExportTable() {
  const [resp, setResp] = React.useState<PaginatedRespApiData<TDataTanaman> | undefined>();
  const [completeMessage, setCompleteMessage] = React.useState<string | undefined>();

  useEffect(() => {
    GetStatistikTanamanAll(undefined, {
      isExport: true
    }).then((res) => {
      setResp(res?.data);
    });
  }, []);

  useEffect(() => {
    if (!resp) return;

    const blankCell = (numberOfCol: number) => {
      return Array.from({ length: numberOfCol }).map(() => '-');
    };

    const headers = [
      'KOMODITAS',
      'LUAS TANAM (HA)',
      'BULAN TANAM',
      'PRAKIRAAN BULAN PANEN',
      'PRAKIRAAN LUAS PANEN (HA)',
      'PRAKIRAAN HASIL PANEN (TON)',
      'REALISASI LUAS PANEN (HA)',
      'REALISASI PRODUKSI PANEN (TON)'
    ];

    const result = resp.data.map((item) => {
      const kategori = item.kategori.toLocaleLowerCase();
      const row = [
        item.fk_kelompokId,
        item.kelompok?.kecamatan,
        item.kelompok?.desa,
        item.luasLahan,
        item.kelompok?.gapoktan,
        item.kelompok?.namaKelompok
      ];

      if (kategori.includes('pangan')) {
        const data = [
          item.komoditas,
          item.luasLahan,
          item.periodeTanam,
          item.prakiraanBulanPanen,
          item.prakiraanLuasPanen,
          item.prakiraanHasilPanen,
          item.realisasiLuasPanen ?? '-',
          item.realisasiHasilPanen ?? '-'
        ];
        row.push(...data);
      } else {
        row.push(...blankCell(8));
      }

      if (
        kategori.includes('kebun') &&
        komoditasSemusim.includes(item.komoditas.replace('Buah ', ''))
      ) {
        const data = [
          item.komoditas,
          item.luasLahan,
          item.periodeTanam,
          item.prakiraanBulanPanen,
          item.prakiraanLuasPanen,
          item.prakiraanHasilPanen,
          item.realisasiLuasPanen ?? '-',
          item.realisasiHasilPanen ?? '-'
        ];
        row.push(...data);
      } else {
        row.push(...blankCell(8));
      }

      if (
        kategori.includes('kebun') &&
        (komoditasTahunan.includes(item.komoditas.replace('Sayur ', '')) ||
          ['Perkebunan Tembakau', 'Perkebunan Tebu'].includes(item.komoditas))
      ) {
        const data = [
          item.komoditas,
          item.luasLahan,
          item.prakiraanBulanPanen,
          item.prakiraanLuasPanen,
          item.prakiraanHasilPanen,
          item.realisasiLuasPanen ?? '-'
        ];
        row.push(...data);
      } else {
        row.push(...blankCell(6));
      }

      if (
        (kategori.includes('sayur') || kategori.includes('buah')) &&
        komoditasSemusim.includes(item.komoditas.replace('Buah ', ''))
      ) {
        const data = [
          item.komoditas,
          item.luasLahan,
          item.periodeTanam,
          item.prakiraanBulanPanen,
          item.prakiraanLuasPanen,
          item.prakiraanHasilPanen,
          item.realisasiBulanPanen ?? '-',
          item.realisasiLuasPanen ?? '-',
          item.realisasiHasilPanen ?? '-'
        ];
        row.push(...data);
      } else {
        row.push(...blankCell(9));
      }

      if (
        (kategori.includes('sayur') || kategori.includes('buah')) &&
        komoditasTahunan.includes(item.komoditas.replace('Sayur ', ''))
      ) {
        const data = [
          item.komoditas,
          item.luasLahan,
          item.prakiraanBulanPanen,
          item.prakiraanHasilPanen,
          item.realisasiLuasPanen ?? '-',
          item.realisasiHasilPanen ?? '-'
        ];
        row.push(...data);
      } else {
        row.push(...blankCell(6));
      }

      return row;
    });

    const data = [
      [
        'NO POKTAN',
        'KECAMATAN',
        'DESA',
        'LAHAN BAKU',
        'GAPOKTAN',
        'NAMA POKTAN',
        'TANAMAN PANGAN',
        ...blankCell(7),
        'TANAMAN PERKEBUNAN SEMUSIM',
        ...blankCell(7),
        'TANAMAN PERKEBUNAN TAHUNAN',
        ...blankCell(5),
        'TANAMAN HORTIKULTURA SEMUSIM',
        ...blankCell(8),
        'TANAMAN HORTIKULTURA TAHUNAN'
      ],
      [
        ...blankCell(6),
        ...headers,
        ...headers,
        ...headers.filter(
          (header) => header !== 'BULAN TANAM' && header !== 'REALISASI PRODUKSI PANEN (TON)'
        ),
        ...headers.slice(0, 6),
        'REALISASI BULAN PANEN',
        ...headers.slice(6),
        ...headers.filter(
          (header) => header !== 'BULAN TANAM' && header !== 'PRAKIRAAN LUAS PANEN (HA)'
        )
      ],
      ...result
    ];

    const worksheet = utils.aoa_to_sheet(data);

    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // NO POKTAN (A1:A2)
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // KECAMATAN (B1:B2)
      { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // DESA (C1:C2)
      { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // LAHAN BAKU (D1:D2)
      { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } }, // GAPOKTAN (E1:E2)
      { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } }, // NAMA POKTAN (F1:F2)

      // Merging for TANAMAN PANGAN
      { s: { r: 0, c: 6 }, e: { r: 0, c: 13 } }, // TANAMAN PANGAN (G1:N1)

      // Merging for TANAMAN PERKEBUNAN SEMUSIM
      { s: { r: 0, c: 14 }, e: { r: 0, c: 21 } }, // TANAMAN PERKEBUNAN SEMUSIM (O1:V1)

      // Merging for TANAMAN PERKEBUNAN TAHUNAN
      { s: { r: 0, c: 22 }, e: { r: 0, c: 27 } }, // TANAMAN PERKEBUNAN TAHUNAN (W1:AB1)

      // Merging for TANAMAN HORTIKULTURA SEMUSIM
      { s: { r: 0, c: 28 }, e: { r: 0, c: 36 } }, // TANAMAN HORTIKULTURA SEMUSIM (AC1:AK1)

      // Merging for TANAMAN HORTIKULTURA TAHUNAN
      { s: { r: 0, c: 37 }, e: { r: 0, c: 42 } } // TANAMAN HORTIKULTURA TAHUNAN (AL1:AQ1)
    ];

    // Create a new workbook
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet);
    writeFileXLSX(
      workbook,
      `Data Tanaman - ${new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}.xlsx`
    );
  }, [resp]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCompleteMessage('Anda dapat mengunduh file data jika proses telah selesai.');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <div>
        <p className="text-white text-2xl font-bold flex justify-center mt-4">
          {completeMessage ? completeMessage : 'Sedang mengunduh data, mohon tunggu sebentar...'}
        </p>
      </div>
    </div>
  );
}
