export interface GetProductParams {
  page: number;
  limit: number;
  search: string;
  sort: { price?: number; createAt?: number };
  quality: string[];
  price: { min?: number; max?: number };
  cateID: string[];
}
