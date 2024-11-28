import { reviewPaths } from '../constants/apiPaths/reviewPaths';
import { axiosClient } from './axios';

const getReviewUrl = (url: string) => `${reviewPaths.reviewPath}/${url}`;
const reviewUrl = getReviewUrl('');

const createReview = (data: any) => {
  return axiosClient.post(reviewUrl, data);
};

export const reviewAPIs = {
  createReview,
};
