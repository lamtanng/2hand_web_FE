import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from 'antd';
import defaultPic from '../../../../assets/blob.jpg';
import { ProductProps } from '../../../../types/product.type';

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

const ImageSlider = ({
  product,
  setSelectedImage,
}: {
  product: ProductProps | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <>
      {product && product.image.length !== 0 && (
        <Carousel responsive={responsive} className="z-0">
          {product.image.map((image: string) => (
            <Image
              width={'100%'}
              src={image}
              fallback={defaultPic}
              preview={false}
              className="pr-3"
              onClick={() => {
                setSelectedImage(image);
              }}
            />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ImageSlider;
