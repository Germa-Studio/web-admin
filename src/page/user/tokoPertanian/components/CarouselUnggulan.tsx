// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Carousel } from '@mantine/carousel';
import Card from './Card';
import { TokoTani } from '../../../../@types/toko';

type Props = {
  tokoArray: TokoTani[][];
};

export default function Demo({ tokoArray }: Props) {
  return (
    <Carousel mx="auto">
      {tokoArray.map((group, groupIndex) => (
        <div key={groupIndex}>
          <Carousel.Slide>
            <div className="grid grid-cols-2">
              {group.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </Carousel.Slide>
        </div>
      ))}
    </Carousel>
  );
}
