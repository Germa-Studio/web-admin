// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Anchor, Breadcrumbs } from '@mantine/core';

const breadcrumbItems = [{ title: 'Dashboard', href: '/' }, { title: 'Data Sampah' }].map(
  (item, index) => (
    <Anchor href={item.href} key={index} className="text-white opacity-50">
      {item.title}
    </Anchor>
  )
);

const DataSampah = () => {
  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">Data Sampah</h3>
      <div className="min-h-[70vh] w-full flex justify-center items-center">
        <p className="text-lg font-bold text-white">Coming Soon...</p>
      </div>
    </div>
  );
};

export default DataSampah;
