import { reviewPaths } from '../constants/apiPaths/reviewPaths';
import { axiosClient } from './axios';

const getReviewUrl = (url: string) => `${reviewPaths.reviewPath}/${url}`;
const reviewUrl = getReviewUrl('');
const reviewerUrl = getReviewUrl(reviewPaths.reviewerPath);
const productUrl = getReviewUrl(reviewPaths.productPath);

const createReview = (data: any) => {
  return axiosClient.post(reviewUrl, data);
};

const getReviewByReviewer = (userID: string | undefined) => {
  const url = `${reviewerUrl}/${userID}`;
  return axiosClient.get(url);
};

const getReviewByProduct = (productID: string | undefined) => {
  const url = `${productUrl}/${productID}`;
  return axiosClient.get(url);
};

export const reviewAPIs = {
  createReview,
  getReviewByReviewer,
  getReviewByProduct,
};
