// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { TokoTani } from '../../../../@types/toko';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';
import ShareModal from '../../../../components/ShareModal';
import { FaShareAlt } from 'react-icons/fa';

export default function Card({ item }: { item: TokoTani }) {
  const [opened, { open, close }] = useDisclosure(false);
  const url = `https://api.whatsapp.com/send?phone=62${item.tbl_akun?.no_wa.substring(1)}&text=Halo%20saya%20ingin%20membeli%20${item.namaProducts}%20apakah%20masih%20tersedia%3F%20Terima%20kasih%20%F0%9F%98%80`;

  return (
    <>
      <div className="hover:scale-110 p-2 cursor-pointer">
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
          <Button variant="light" onClick={open}>
            <FaShareAlt />
          </Button>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Bagikan Produk" centered>
        <ShareModal url={url} title={item.namaProducts + '\n' + item.deskripsi} />
      </Modal>
    </>
  );
}
