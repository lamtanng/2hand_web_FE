import { Card, Flex, Image, Typography } from 'antd';
import defaultImg from '../../../../assets/blob.webp';
import { Link } from 'react-router-dom';
import useCategorySlider from './useCategorySlider';
import { CategoryProps } from '../../../../types/category.type';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const CategorySlider = () => {
  const { category } = useCategorySlider();

  return (
    <div className="relative mt-10 w-full overflow-hidden">
      {category && (
        <Carousel responsive={responsive} className="z-0 p-2">
          {category.filter((cate: CategoryProps) => !cate.parentID).map((item: CategoryProps) => (
            <div className="card h-full" key={item._id}>
              <Link to={'/product-list'} className='h-full'>
                <Card hoverable size="small" className="h-full mx-2 md:mx-3 xl:mx-5">
                  <Flex vertical justify="space-between" align="center" gap={'middle'} className='h-full'>
                    <Image width={100} height={100} alt={item.slug} src={item.image} fallback={defaultImg} preview={false} className="rounded-sm" />
                    <Typography.Paragraph className="m-0 text-sm xl:text-base">{item.name}</Typography.Paragraph>
                  </Flex>
                </Card>
              </Link>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategorySlider;
