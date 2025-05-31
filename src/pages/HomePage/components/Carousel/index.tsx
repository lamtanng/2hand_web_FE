import { Carousel, Image } from 'antd';
import banner1 from '../../../../assets/banner1.webp';
import banner2 from '../../../../assets/banner2.webp';
import banner3 from '../../../../assets/banner3.webp';

const CustomCarousel = () => {
  const onChange = (currentSlide: number) => {};
  return (
    <Carousel dots={false} arrows autoplay infinite={true} afterChange={onChange}>
      <div>
        <Image alt="" src={banner1} preview={false} width={'100%'} className="rounded-lg" />
      </div>
      <div>
        <Image alt="" src={banner2} preview={false} width={'100%'} className="rounded-lg" />
      </div>
      <div>
        <Image alt="" src={banner3} preview={false} width={'100%'} className="rounded-lg" />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
