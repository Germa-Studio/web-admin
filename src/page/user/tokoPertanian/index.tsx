import React from 'react';
import MainCard from '../../../components/MainCard';
import UserLayout from '../../../components/UserLayout';
// import CarouselPromo from './components/CarouselPromo';
import { useLocation } from 'react-router-dom';
import { TokoTani } from '../../../@types/toko';
import { PaginationControl } from '../../../components/table/Pagination';
import API from '../../../infrastucture/base';
import { PaginatedRespApiData } from '../../../types/paginatedRespApi';
import Card from './components/Card';
import CarouselUnggulan from './components/CarouselUnggulan';

export default function Index() {
  const [tokoTani, setTokoTani] = React.useState<TokoTani[]>([]);
  const [groupedToko, setGroupedToko] = React.useState<TokoTani[][]>([]);
  const [resp, setResp] = React.useState<PaginatedRespApiData<TokoTani> | undefined>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') || 1;

  React.useEffect(() => {
    const url = `/product-petani-no-auth?page=${page}`;
    API.get(url).then((res) => {
      setResp(res.data);
      const response = res.data.data as TokoTani[];
      setTokoTani(response);
      const groupedToko = response.reduce<TokoTani[][]>((acc, curr, index) => {
        if (index % 2 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
      }, []);
      setGroupedToko(groupedToko);
    });
  }, [page]);

  return (
    <UserLayout>
      <section>
        <div className="pb-5 container mx-auto flex flex-col gap-12 justify-center items-center">
          {/* Produk Unggulan Petani */}
          <MainCard className="w-3/4">
            <div className="py-8">
              <p className="text-lg lg:text-2xl font-bold text-green-primary text-center pb-5">
                PRODUK PETANI
              </p>
              <div className="hidden md:block">
                <div className="grid md:grid-cols-3 lg:grid-cols-5">
                  {tokoTani.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            {/* Dekstop */}

            {/* Mobile */}
            <div className="md:hidden">
              <CarouselUnggulan tokoArray={groupedToko} />
            </div>

            <PaginationControl respData={resp} />
          </MainCard>
        </div>
      </section>
    </UserLayout>
  );
}
