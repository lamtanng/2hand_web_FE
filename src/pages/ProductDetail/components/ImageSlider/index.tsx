import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from 'antd';
import defaultPic from '../../../../assets/blob.jpg';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const ImageSlider = () => {
  return (
    <Carousel responsive={responsive} className='z-0'>
      <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
      <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
      <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
      <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
      <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
      <Image width={'100%'} src="error" fallback={defaultPic} preview={false} className="pr-3" />
    </Carousel>
  );
};

export default ImageSlider;
