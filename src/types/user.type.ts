import { AddressRequestProps } from "./http/address.type";

export interface UserProps {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: AddressRequestProps[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  isVerified?: boolean;
  roleID?: string[];
  followerID?: string[];
  followingID?: string[];
  blockedID?: string[];
}
