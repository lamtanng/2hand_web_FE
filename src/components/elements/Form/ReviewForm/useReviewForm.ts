import { useState, useEffect } from 'react';
import { UserProps } from '../../../../types/user.type';
import { OrderDetailProps } from '../../../../types/orderDetail.type';
import { handleError } from '../../../../utils/handleError';
import { reviewAPIs } from '../../../../apis/review.api';
import eventEmitter from '../../../../utils/eventEmitter';
import { OrderProps } from '../../../../types/order.type';
import { openAIAPIs } from '../../../../apis/openai.api';
import { message } from 'antd';

const useReviewForm = (
  user: UserProps,
  product: OrderDetailProps,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  order?: OrderProps,
) => {
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [rate, setRate] = useState<number>();
  const [isDirty, setDirty] = useState<boolean>(true);
  const [violatingImages, setViolatingImages] = useState<number[]>([]);
  const [violatingTexts, setViolatingTexts] = useState<string[]>([]);
  const [highlightedContent, setHighlightedContent] = useState<string>('');
  const [isCheckingStandards, setIsCheckingStandards] = useState<boolean>(false);

  // Reset violations when content changes
  useEffect(() => {
    if (violatingTexts.length > 0) {
      setViolatingTexts([]);
    }
  }, [content]);

  // Reset violations when images change
  useEffect(() => {
    if (violatingImages.length > 0 && base64Images.length === 0) {
      setViolatingImages([]);
    }
  }, [base64Images]);

  // Function to highlight text violations
  const highlightViolations = (text: string, violations: string[]): string => {
    if (!text || !violations || violations.length === 0) {
      return text;
    }

    let result = text;
    // Sort by length (descending) to avoid nested highlighting issues
    const sortedViolations = [...violations].sort((a, b) => b.length - a.length);

    sortedViolations.forEach((violation) => {
      if (!violation.trim()) return;
      const regex = new RegExp(`(${violation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(
        regex,
        '<span style="background-color: #ffccc7; padding: 2px; border-radius: 2px; display: inline-block;">$1</span>',
      );
    });

    return result;
  };

  const addNewReview = async () => {
    try {
      if (!rate || rate === 0) {
        throw new Error('Product quality is required.');
      }

      setIsCheckingStandards(true);
      const res = await openAIAPIs.checkCommunityStandards([content], base64Images);
      setIsCheckingStandards(false);

      if (!res.data.status) {
        // Extract violation data
        const textViolations = Array.isArray(res.data.text) ? res.data.text : [];
        const imageViolations = Array.isArray(res.data.images) ? res.data.images : [];

        // Update state with violations
        setViolatingImages(imageViolations);
        setViolatingTexts(textViolations);

        // Generate highlighted content if there are text violations
        if (textViolations.length > 0 && content) {
          setHighlightedContent(highlightViolations(content, textViolations));
        }

        // Show warning message
        message.warning(
          'Your review contains content that may violate community standards. Please review the highlighted areas.',
        );
        return;
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
      message.success('Review submitted successfully');
    } catch (error) {
      handleError(error);
    }
  };

  return {
    base64Images,
    setBase64Images,
    content,
    setContent,
    rate,
    setRate,
    isDirty,
    setDirty,
    addNewReview,
    violatingImages,
    violatingTexts,
    highlightedContent,
    isCheckingStandards,
  };
};

export default useReviewForm;
