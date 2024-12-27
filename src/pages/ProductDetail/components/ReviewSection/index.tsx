import { Flex, Tabs, TabsProps, Typography } from 'antd';
import { ReviewProps } from '../../../../types/review.type';
import ReviewList from '../../../../components/elements/Lists/ReviewList';

const ReviewSection = ({ reviews }: { reviews: ReviewProps[] }) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const fiveStars = reviews.filter((review: ReviewProps) => review.rate === 5);
  const fourStars = reviews.filter((review: ReviewProps) => review.rate === 4);
  const threeStars = reviews.filter((review: ReviewProps) => review.rate === 3);
  const twoStars = reviews.filter((review: ReviewProps) => review.rate === 2);
  const oneStar = reviews.filter((review: ReviewProps) => review.rate === 1);
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `All (${reviews.length})`,
      children: <ReviewList reviews={reviews}/>,
    },
    {
      key: '2',
      label: `5 stars (${fiveStars.length})`,
      children: <ReviewList reviews={fiveStars}/>,
    },
    {
      key: '3',
      label: `4 stars (${fourStars.length})`,
      children: <ReviewList reviews={fourStars}/>,
    },
    {
      key: '4',
      label: `3 stars (${threeStars.length})`,
      children: <ReviewList reviews={threeStars}/>,
    },
    {
      key: '5',
      label: `2 stars (${twoStars.length})`,
      children: <ReviewList reviews={twoStars}/>,
    },
    {
      key: '6',
      label: `1 stars (${oneStar.length})`,
      children: <ReviewList reviews={oneStar}/>,
    },
  ];
  
  return (
    <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
      <Flex gap={'small'} align="baseline" className='mb-6'>
        <Typography.Title level={3} className="m-0">
          Product Reviews
        </Typography.Title>
        <Typography.Paragraph className="m-0">({reviews.length})</Typography.Paragraph>
      </Flex>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default ReviewSection;
