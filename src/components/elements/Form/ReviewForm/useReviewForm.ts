import { useState } from 'react';
import { UserProps } from '../../../../types/user.type';
import { OrderDetailProps } from '../../../../types/orderDetail.type';
import { handleError } from '../../../../utils/handleError';
import { reviewAPIs } from '../../../../apis/review.api';
import eventEmitter from '../../../../utils/eventEmitter';
import { OrderProps } from '../../../../types/order.type';

const useReviewForm = (
  user: UserProps,
  product: OrderDetailProps,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  order?: OrderProps,
) => {
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [content, setContent] = useState<string>();
  const [rate, setRate] = useState<number>();
  const [isDirty, setDirty] = useState<boolean>(true);

  const addNewReview = async () => {
    try {
      if (!rate || rate === 0) {
        throw new Error('Product quality is required.');
      }

      const data = {
        content: content?.trim(),
        rate: rate,
        image: base64Images,
        productID: product.productID._id,
        reviewerID: user._id,
        orderDetailID: product._id,
      };
      await reviewAPIs.createReview(data);
      eventEmitter.emit('addReview', order?._id);
      setIsModalOpen(false);
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
    setDirty,
    isDirty
  };
};
export default useReviewForm;
