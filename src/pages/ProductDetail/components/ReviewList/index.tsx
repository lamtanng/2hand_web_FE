import { Divider, Flex, Pagination, Typography } from 'antd';
import ReviewItem from '../ReviewItem';
import { ReviewProps } from '../../../../types/review.type';

const ReviewList = ({ reviews }: { reviews: ReviewProps[] }) => {
  return (
    <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
      <Flex gap={'small'} align="baseline">
        <Typography.Title level={3} className="m-0">
          Product Reviews
        </Typography.Title>
        <Typography.Paragraph className="m-0">({reviews.length})</Typography.Paragraph>
      </Flex>
      <Divider />
      {/* <div className="mb-6 rounded-md bg-blue-50 p-6">
        <Flex gap={'middle'} className="mb-4">
          <Rate allowHalf defaultValue={avgRate} disabled />
          <Typography.Paragraph className="m-0">(0/5)</Typography.Paragraph>
          <Typography.Paragraph className="m-0">({reviews.length})</Typography.Paragraph>
        </Flex>
        <Flex gap={'middle'}>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            All
          </Button>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            5 stars (0)
          </Button>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            4 stars (0)
          </Button>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            3 stars (0)
          </Button>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            2 stars (0)
          </Button>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            1 stars (0)
          </Button>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            Has content (0)
          </Button>
          <Button variant="outlined" color="primary" className="px-5 py-3">
            Has images/videos (0)
          </Button>
        </Flex>
      </div> */}
      {reviews.map((item: ReviewProps) => (
        <div id="review list">
          <ReviewItem review={item} />
        </div>
      ))}
      <Pagination align="center" defaultCurrent={1} total={10} />
    </div>
  );
};

export default ReviewList;
