import { Anchor, Breadcrumbs, Button } from '@mantine/core';
import React, { useEffect } from 'react';
import { utils, writeFileXLSX } from 'xlsx';
import { PaginatedRespApiData } from '../../../../types/paginatedRespApi';
import { komoditasSemusim, komoditasTahunan, tanamanPerkebunan } from '../../../../types/const';
import { GetListTanaman } from '../../../../infrastucture';
import { TTanamanPetani } from '../../../../types/tanamanPetani';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Statistik' },
  { title: 'Export Data' }
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

export default function ExportTableDataPertanian() {
  const [resp, setResp] = React.useState<PaginatedRespApiData<TTanamanPetani> | undefined>();

  const tbl = React.useRef(null);

  useEffect(() => {
    GetListTanaman(1, 1, 1, true).then((res) => {
      setResp(res);
    });
  }, []);

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <div className="flex justify-end">
        <Button
          variant="filled"
          onClick={() => {
            // console.log(utils, writeFileXLSX);
            const wb = utils.table_to_book(tbl.current);
            writeFileXLSX(
              wb,
              `Tanaman Petani - ${new Date().toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}.xlsx`
            );
          }}>
          Export
        </Button>
      </div>
      <div className="overflow-x-scroll">
        <table ref={tbl} className="table-auto w-fit mt-2 bg-white">
          <thead className="[&_*]:whitespace-nowrap">
            <tr className="[&>th]:text-center">
              <th className="border p-2" rowSpan={2}>
                NO POKTAN
              </th>
              <th className="border p-2" rowSpan={2}>
                KECAMATAN
              </th>
              <th className="border p-2" rowSpan={2}>
                DESA
              </th>
              <th className="border p-2" rowSpan={2}>
                LAHAN BAKU
              </th>
              <th className="border p-2" rowSpan={2}>
                GAPOKTAN
              </th>
              <th className="border p-2" rowSpan={2}>
                NAMA POKTAN
              </th>
              <th
                className="border p-2 text-white"
                colSpan={8}
                style={{ backgroundColor: 'rgb(123, 97, 23)' }}>
                TANAMAN PANGAN
              </th>
              <th
                className="border p-2 text-white"
                colSpan={8}
                style={{ backgroundColor: 'rgb(44, 77, 117)' }}>
                TANAMAN PERKEBUNAN SEMUSIM
              </th>
              <th
                className="border p-2 text-white"
                colSpan={6}
                style={{ backgroundColor: 'rgb(122, 64, 26)' }}>
                TANAMAN PERKEBUNAN TAHUNAN
              </th>
              <th
                className="border p-2 text-white"
                colSpan={9}
                style={{ backgroundColor: 'rgb(82, 82, 82)' }}>
                TANAMAN HORTIKULTURA SEMUSIM
              </th>
              <th
                className="border p-2 text-white"
                colSpan={6}
                style={{ backgroundColor: 'rgb(36, 43, 52)' }}>
                TANAMAN HORTIKULTURA TAHUNAN
              </th>
            </tr>
            <tr className="[&>th]:text-left">
              {/* Tanaman Pangan */}
              <th className="border p-2">KOMODITAS</th>
              <th className="border p-2">LUAS TANAM (HA)</th>
              <th className="border p-2">BULAN TANAM</th>
              <th className="border p-2">PRAKIRAAN BULAN PANEN</th>
              <th className="border p-2">PRAKIRAAN LUAS PANEN (HA)</th>
              <th className="border p-2">PRAKIRAAN HASIL PANEN (TON)</th>
              <th className="border p-2">REALISASI LUAS PANEN (HA)</th>
              <th className="border p-2">REALISASI PRODUKSI PANEN (TON)</th>
              {/* Tanaman Perkebunan Semusim */}
              {/* KOMODITAS	LUAS TANAM (HA)	BULAN TANAM	PRAKIRAAN BULAN PANEN	PRAKIRAAN LUAS PANEN (HA)	PRAKIRAAN HASIL PANEN (TON)	REALISASI LUAS PANEN (HA)	REALISASI HASIL PANEN (TON) */}
              <th className="border p-2">KOMODITAS</th>
              <th className="border p-2">LUAS TANAM (HA)</th>
              <th className="border p-2">BULAN TANAM</th>
              <th className="border p-2">PRAKIRAAN BULAN PANEN</th>
              <th className="border p-2">PRAKIRAAN LUAS PANEN (HA)</th>
              <th className="border p-2">PRAKIRAAN HASIL PANEN (TON)</th>
              <th className="border p-2">REALISASI LUAS PANEN (HA)</th>
              <th className="border p-2">REALISASI HASIL PANEN (TON)</th>
              {/* Tanaman Perkebunan Tahunan */}
              {/* KOMODITAS	"LUAS TANAMAN (HA)"	PRAKIRAAN BULAN PANEN	PRAKIRAAN PRODUKSI PANEN (KW)	"LUAS PANEN (HA)"	REALISASI PRODUKSI PANEN (KW) */}
              <th className="border p-2">KOMODITAS</th>
              <th className="border p-2">LUAS TANAM (HA)</th>
              <th className="border p-2">PRAKIRAAN BULAN PANEN</th>
              <th className="border p-2">PRAKIRAAN LUAS PANEN (HA)</th>
              <th className="border p-2">PRAKIRAAN HASIL PANEN (TON)</th>
              <th className="border p-2">REALISASI LUAS PANEN (HA)</th>
              {/* Tanaman Hortikultura Semusim */}
              {/* KOMODITAS	LUAS TANAM (HA)	BULAN TANAM	PRAKIRAAN BULAN PANEN	PRAKIRAAN LUAS PANEN (HA)	PRAKIRAAN HASIL PANEN (KW)	REALISASI BULAN PANEN	REALISASI LUAS PANEN (HA)	REALISASI PRODUKSI PANEN (KW) */}
              <th className="border p-2">KOMODITAS</th>
              <th className="border p-2">LUAS TANAM (HA)</th>
              <th className="border p-2">BULAN TANAM</th>
              <th className="border p-2">PRAKIRAAN BULAN PANEN</th>
              <th className="border p-2">PRAKIRAAN LUAS PANEN (HA)</th>
              <th className="border p-2">PRAKIRAAN HASIL PANEN (KW)</th>
              <th className="border p-2">REALISASI BULAN PANEN</th>
              <th className="border p-2">REALISASI LUAS PANEN (HA)</th>
              <th className="border p-2">REALISASI PRODUKSI PANEN (KW)</th>
              {/* Tanaman Hortikultura Tahunan */}
              {/* KOMODITAS	JUMLAH TANAMAN (POHON)	PRAKIRAAN BULAN PANEN	PRAKIRAAN PRODUKSI PANEN (KW)	REALISASI PANEN (POHON)	REALISASI PRODUKSI PANEN (KW) */}
              <th className="border p-2">KOMODITAS</th>
              <th className="border p-2">JUMLAH TANAMAN (POHON)</th>
              <th className="border p-2">PRAKIRAAN BULAN PANEN</th>
              <th className="border p-2">PRAKIRAAN PRODUKSI PANEN (KW)</th>
              <th className="border p-2">REALISASI PANEN (POHON)</th>
              <th className="border p-2">REALISASI PRODUKSI PANEN (KW)</th>
            </tr>
          </thead>
          <tbody>
            {resp?.data.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.dataPetani?.fk_kelompokId ?? '-'}</td>
                <td className="border p-2">{item.dataPetani?.kecamatanData?.nama ?? '-'}</td>
                <td className="border p-2">{item.dataPetani?.desaData?.nama ?? '-'}</td>
                {/* TODO: Lahan baku itu apa? */}
                <td className="border p-2">{item.luasLahan}</td>
                <td className="border p-2">{item.dataPetani?.kelompok?.gapoktan}</td>
                <td className="border p-2">{item.dataPetani?.kelompok?.namaKelompok}</td>
                {/* Tanaman Pangan */}
                {item.kategori.includes('pangan'.toUpperCase()) ? (
                  <>
                    <td className="border p-2 capitalize">{item.komoditas}</td>
                    <td className="border p-2">{item.luasLahan}</td>
                    <td className="border p-2">{item.periodeBulanTanam}</td>
                    <td className="border p-2">{item.prakiraanBulanPanen}</td>
                    <td className="border p-2">{item.prakiraanLuasPanen}</td>
                    <td className="border p-2">{item.prakiraanProduksiPanen}</td>
                    <td className="border p-2">{/* TODO: Realisasi sebelah mana? */}-</td>
                    <td className="border p-2">-</td>
                  </>
                ) : (
                  <BlankCell numberOfCol={8} />
                )}
                {/* Tanaman Perkebunan Semusim */}
                {item.kategori.includes('kebun'.toUpperCase()) &&
                tanamanPerkebunan.includes(item.komoditas) ? (
                  <>
                    <td className="border p-2 capitalize">{item.komoditas}</td>
                    <td className="border p-2">{item.luasLahan}</td>
                    <td className="border p-2">{item.periodeBulanTanam}</td>
                    <td className="border p-2">{item.prakiraanBulanPanen}</td>
                    <td className="border p-2">{item.prakiraanLuasPanen}</td>
                    <td className="border p-2">{item.prakiraanProduksiPanen}</td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">-</td>
                  </>
                ) : (
                  <BlankCell numberOfCol={8} />
                )}
                {/* Tanaman Perkebunan Tahunan */}
                {item.kategori.includes('kebun'.toUpperCase()) &&
                ['Perkebunan Tembakau', 'Perkebunan Tebu'].includes(item.komoditas) ? (
                  <>
                    <td className="border p-2 capitalize">{item.komoditas}</td>
                    <td className="border p-2">{item.luasLahan}</td>
                    {/* GAADA PERIODE TANAM? */}
                    <td className="border p-2">{item.prakiraanBulanPanen}</td>
                    <td className="border p-2">{item.prakiraanLuasPanen}</td>
                    <td className="border p-2">{item.prakiraanProduksiPanen}</td>
                    <td className="border p-2">-</td>
                    {/* GAADA REALISASI HASIL PANEN? */}
                  </>
                ) : (
                  <BlankCell numberOfCol={6} />
                )}
                {/* Tanaman Hortikurtira Semusim */}
                {item.kategori.includes('hortikultura'.toUpperCase()) &&
                komoditasSemusim.includes(item.komoditas) ? (
                  <>
                    <td className="border p-2 capitalize">{item.komoditas}</td>
                    <td className="border p-2">{item.luasLahan}</td>
                    <td className="border p-2">{item.periodeBulanTanam}</td>
                    <td className="border p-2">{item.prakiraanBulanPanen}</td>
                    <td className="border p-2">{item.prakiraanLuasPanen}</td>
                    <td className="border p-2">{item.prakiraanProduksiPanen}</td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">-</td>
                  </>
                ) : (
                  <BlankCell numberOfCol={9} />
                )}
                {/* Tanaman Hortikurtira Tahunan */}
                {item.kategori.includes('hortikultura'.toUpperCase()) &&
                komoditasTahunan.includes(item.komoditas) ? (
                  <>
                    <td className="border p-2 capitalize">{item.komoditas}</td>
                    {/* Jumlah tanaman?? */}
                    <td className="border p-2">??</td>
                    <td className="border p-2">{item.prakiraanBulanPanen}</td>
                    <td className="border p-2">{item.prakiraanProduksiPanen}</td>
                    {/* Realisasi panen (Pohon)?? */}
                    <td className="border p-2">??</td>
                    <td className="border p-2">-</td>
                  </>
                ) : (
                  <BlankCell numberOfCol={6} />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlankCell({ numberOfCol }: { numberOfCol: number }) {
  return (
    <>
      {Array.from({ length: numberOfCol }).map((_, index) => (
        <td key={index} className="border p-2">
          -
        </td>
      ))}
    </>
  );
}
