export interface CategoryProps {
  id: string;
  name: string;
  isActive: boolean;
  parentID?: string;
  createAt?: Date;
  updateAt?: Date;
}
