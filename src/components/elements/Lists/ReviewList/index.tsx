import { ReviewProps } from '../../../../types/review.type';
import { Pagination } from 'antd';
import ReviewItem from './components/ReviewItem';
import EmptyReview from './components/EmptyReview';

const ReviewList = ({ reviews }: { reviews: ReviewProps[] }) => {
  return (
    <>
      {reviews.length !== 0 ? (
        <>
          <div id="review-list">
            {reviews.map((item: ReviewProps) => (
              <div id="review list">
                <ReviewItem review={item} />
              </div>
            ))}
          </div>
          {reviews.length > 10 && <Pagination align="center" defaultCurrent={1} total={reviews.length} />}
        </>
      ) : (
        <EmptyReview/>
      )}
    </>
  );
};

export default ReviewList;
