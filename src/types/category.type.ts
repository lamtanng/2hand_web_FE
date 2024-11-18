export interface CategoryProps {
  _id: string;
  name: string;
  isActive: boolean;
  image: string;
  slug: string;
  parentID?: string;
  childrenIDs?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
