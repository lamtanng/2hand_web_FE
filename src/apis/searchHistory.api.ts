import { SearchHistoryByUserResponse } from '../types/http/searchHistory.type';
import { axiosClient } from './axios';

export const findAllHintByUserId = async (userId?: string) => {
  return await axiosClient.get<SearchHistoryByUserResponse[]>(`/search-history`, {
    params: {
      userId,
    },
  });
};

export const findBySearchText = async (searchText: string) => {
  return await axiosClient.get<SearchHistoryByUserResponse[]>(`/search-history/search`, {
    params: {
      searchText,
    },
  });
};

export const createSearchHistory = async (searchText: string, userId: string) => {
  return await axiosClient.post('/search-history', { searchText, userId });
};
