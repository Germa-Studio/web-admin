// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Image } from '@mantine/core';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Slider = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="embla overflow-hidden max-h-[80vh]" ref={emblaRef}>
      <div className="embla__container flex">
        <Image
          src="/image/icon-sawah.png"
          alt="Icon Sawah"
          className="embla__slide min-w-0 max-h-[80vh]"
          style={{ flex: '0 0 100%' }}
        />
        <Image
          src="https://th.bing.com/th/id/OIP.JoF3kIHep-H8Au2kQCqLPgHaEz?rs=1&pid=ImgDetMain"
          alt="Icon Sawah"
          className="embla__slide min-w-0 max-h-[80vh]"
          style={{ flex: '0 0 100%' }}
        />
        {/* <div className="embla__slide min-w-0" style={{flex: '0 0 100%'}}>Slide 1</div>
            <div className="embla__slide min-w-0" style={{flex: '0 0 100%'}}>Slide 2</div>
            <div className="embla__slide min-w-0" style={{flex: '0 0 100%'}}>Slide 3</div> */}
      </div>
    </div>
  );
};

export default Slider;
