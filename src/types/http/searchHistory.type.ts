import { SearchHistoryProps } from '../searchHistory.type';

export interface SearchHistoryByUserResponse extends Pick<SearchHistoryProps, 'searchText' | '_id' | 'userId'> {
  count: number;
}
