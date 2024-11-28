import { reasonPaths } from "../constants/apiPaths/reasonPaths";
import { axiosClient } from "./axios";

const getReasonUrl = (url: string) => `${reasonPaths.reasonPath}/${url}`;
const reasonUrl = getReasonUrl('');

const getAllReason = () => {
  return axiosClient.get(reasonUrl);
};

export const reasonAPIs = {
  getAllReason,
};