import { Carousel, Image } from 'antd';
import banner1 from '../../../../assets/banner1.png'
import banner2 from '../../../../assets/banner2.png'
import banner3 from '../../../../assets/banner3.png'

const CustomCarousel = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <Carousel dots={false} arrows autoplay infinite={true} afterChange={onChange}>
      <div>
        <Image alt='' src={banner1} preview={false} width={'100%'} className='rounded-lg' />
      </div>
      <div>
        <Image alt='' src={banner2} preview={false} width={'100%'} className='rounded-lg' />
      </div>
      <div>
        <Image alt='' src={banner3} preview={false} width={'100%'} className='rounded-lg' />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
