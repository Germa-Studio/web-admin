// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { TokoTani } from '../../../../@types/toko';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, NumberFormatter } from '@mantine/core';
import ShareModal from '../../../../components/ShareModal';
import { FaShareAlt } from 'react-icons/fa';

export default function Card({ item }: { item: TokoTani }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false);
  const url = `https://api.whatsapp.com/send?phone=62${item.tbl_akun?.no_wa.substring(1)}&text=Halo%20saya%20ingin%20membeli%20${item.namaProducts}%20apakah%20masih%20tersedia%3F%20Terima%20kasih%20%F0%9F%98%80`;

  return (
    <>
      <div className="hover:scale-110 p-2 cursor-pointer" onClick={openDetail}>
        <div className="bg-white rounded-md p-3 flex flex-col gap-1 shadow-2xl h-full">
          {item.fotoTanaman && (
            <img className="aspect-square" src={item.fotoTanaman} alt={item.namaProducts} />
          )}
          <h4 className="font-bold text-sm text-green-primary">
            {item.namaProducts.toUpperCase()}
          </h4>
          <h4
            className="mt-auto font-bold text-sm"
            style={{
              color: 'orange'
            }}>
            Harga : Rp. {item.harga}
          </h4>
          <h4
            className="font-bold text-sm"
            style={{
              color: 'grey'
            }}>
            Stok : {item.stok}
          </h4>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full w-full text-center text-sm text-white font-bold bg-green-primary">
            Hubungi
          </a>
        </div>
      </div>
      <Modal opened={detailOpened} onClose={closeDetail} withCloseButton={false} centered>
        <div className="p-5 flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-green-primary">{item.namaProducts}</h1>
          {item.fotoTanaman && (
            <img
              className="aspect
              -square"
              src={item.fotoTanaman}
              alt={item.namaProducts}
            />
          )}
          <h4 className="font-bold">
            <NumberFormatter
              value={item.harga}
              prefix="Rp "
              thousandSeparator="."
              decimalSeparator=","
            />
          </h4>
          <div className="grid grid-cols-2">
            <p className="text-xs">Penjual: {item.tbl_akun?.nama}</p>
            <p className="text-xs">Status: {item.status}</p>
            <p className="text-xs">Stok: {item.stok}</p>
            <p className="text-xs">Satuan: {item.satuan}</p>
          </div>
          <p className="text-sm text-justify">{item.deskripsi}</p>
          <Button variant="light" onClick={open}>
            <FaShareAlt />
          </Button>
        </div>
      </Modal>
      <Modal opened={opened} onClose={close} title="Bagikan Produk" centered>
        <ShareModal url={url} title={item.namaProducts + '\n' + item.deskripsi} />
      </Modal>
    </>
  );
}
