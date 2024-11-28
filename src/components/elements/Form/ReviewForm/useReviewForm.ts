import { useState } from 'react';
import { UserProps } from '../../../../types/user.type';
import { OrderDetailProps } from '../../../../types/orderDetail.type';
import { handleError } from '../../../../utils/handleError';
import { reviewAPIs } from '../../../../apis/review.api';

const useReviewForm = (user: UserProps, product: OrderDetailProps) => {
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [content, setContent] = useState<string>();
  const [rate, setRate] = useState<number>();

  const addNewReview = async () => {
    try {
      const data = {
        content: content,
        rate: rate,
        image: base64Images,
        productID: product.productID._id,
        reviewerID: user._id,
        orderDetailID: product._id,
      };
      await reviewAPIs.createReview(data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  return {
    base64Images,
    setBase64Images,
    addNewReview,
    setContent,
    setRate,
  };
};
export default useReviewForm;
