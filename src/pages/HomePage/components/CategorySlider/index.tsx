import { Card, Flex, Image, Typography } from 'antd';
import defaultImg from '../../../../assets/blob.jpg';
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
        <Carousel responsive={responsive} className="z-0">
          {category.filter((cate: CategoryProps) => !cate.parentID).map((item: CategoryProps) => (
            <div className="card" key={item.id}>
              <Link to={'/product-list'}>
                <Card size="small" className="mx-2 md:mx-3 xl:mx-5">
                  <Flex vertical justify="center" align="center" gap={'middle'}>
                    <Image alt="" src="" fallback={defaultImg} preview={false} className="rounded-md" />
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
