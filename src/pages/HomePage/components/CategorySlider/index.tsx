import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, Typography } from 'antd';
import defaultImg from '../../../../assets/blob.jpg';
import { Link } from 'react-router-dom';

const CategorySlider = () => {
  const data = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 6 },
    { key: 7 },
    { key: 8 },
    { key: 9 },
    { key: 10 },
    { key: 11 },
    { key: 12 },
    { key: 13 },
    { key: 14 },
    { key: 15 },
    { key: 16 },
    { key: 17 },
  ];

  const onPrevClick = () => {
    const slider = document.getElementById('cate-slider');
    slider?.classList.remove('-translate-x-full');
  };

  const onNextClick = () => {
    const slider = document.getElementById('cate-slider');
    slider?.classList.add('-translate-x-full', 'ease-in-out', 'duration-500');
  };

  return (
    <div className="relative mt-10 w-full overflow-hidden">
      <div>
        <Button type="text" className="absolute top-1/2 z-10 rounded-full px-2 py-1" onClick={onPrevClick}>
          <LeftOutlined />
        </Button>
      </div>
      <div>
        <Button type="text" className="absolute right-0 top-1/2 z-10 rounded-full px-2 py-1" onClick={onNextClick}>
          <RightOutlined />
        </Button>
      </div>
      <div className="mx-10 overflow-hidden">
        <div id="cate-slider" className="flex">
          {data.map((item: any) => (
            <Link to={'#'} key={item.key} id="cate-card" className="w-[12.5%] flex-shrink-0">
              <div className='pr-6'>
                <Card size="small">
                  <Flex vertical justify="center" align="center" gap={'middle'}>
                    <Image alt="" src="" fallback={defaultImg} preview={false} className="rounded-md" />
                    <Typography.Paragraph className="m-0">Cate name {item.key}</Typography.Paragraph>
                  </Flex>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
