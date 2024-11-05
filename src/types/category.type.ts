export interface CategoryProps {
  _id: string;
  name: string;
  isActive: boolean;
  parentID?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
