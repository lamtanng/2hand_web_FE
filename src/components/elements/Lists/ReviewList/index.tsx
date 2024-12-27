import { ReviewProps } from '../../../../types/review.type';
import { Pagination } from 'antd';
import ReviewItem from './components/ReviewItem';

const ReviewList = ({ reviews }: { reviews: ReviewProps[] }) => {
  return (
    <>
      <div id='review-list'>
        {reviews.map((item: ReviewProps) => (
          <div id="review list">
            <ReviewItem review={item} />
          </div>
        ))}
      </div>
      <Pagination align="center" defaultCurrent={1} total={reviews.length} />
    </>
  );
};

export default ReviewList;
