import { useEffect, useState } from 'react';
import { UserProps } from '../../../types/user.type';
import { handleError } from '../../../utils/handleError';
import { reviewAPIs } from '../../../apis/review.api';
import { ReviewProps } from '../../../types/review.type';

const useCustomerReviewPage = (profile: UserProps | undefined) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  const getReviews = async (userID: string | undefined) => {
    try {
      const res = await reviewAPIs.getReviewByReviewer(userID);
      setReviews(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (profile) {
      getReviews(profile._id);
    }
  }, [profile]);
  return {
    reviews
  };
};
export default useCustomerReviewPage;
