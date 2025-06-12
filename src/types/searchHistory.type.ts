export interface SearchHistoryProps {
  _id: string;
  userId: string;
  searchText: string;
  searchTextUnaccented: string;
  slug: string;
  embedding: number[];
  createdAt: Date;
}
