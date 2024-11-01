import { Button, Flex, Pagination, Rate, Typography } from "antd";
import ReviewItem from "../ReviewItem";

const ReviewList = () => {
  return (
    <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
      <Typography.Title level={3} className="m-0 mb-6">
        All Reviews
      </Typography.Title>
      <div className="mb-6 rounded-md bg-blue-50 p-6">
        <Flex gap={'middle'} className="mb-4">
          <Rate allowHalf defaultValue={4} disabled />
          <Typography.Paragraph className="m-0">(0/5)</Typography.Paragraph>
          <Typography.Paragraph className="m-0">(number reviews)</Typography.Paragraph>
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
      </div>
      <div id="review list">
        <ReviewItem />
      </div>
      <Pagination align="center" defaultCurrent={1} total={10} />
    </div>
  );
};

export default ReviewList;
