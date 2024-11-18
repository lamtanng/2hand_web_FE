export interface CategoryProps {
  _id: string;
  name: string;
  isActive: boolean;
  image: string;
  slug: string;
  parentID?: CategoryProps;
  childrenIDs?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
