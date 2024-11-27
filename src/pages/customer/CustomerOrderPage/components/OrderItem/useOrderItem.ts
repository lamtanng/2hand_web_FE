import { useState } from 'react';

const useOrderItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReviewModal = () => {
    setIsModalOpen(true);
  }

  return { isModalOpen, setIsModalOpen, openReviewModal };
};
export default useOrderItem;
