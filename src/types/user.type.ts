export interface UserProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: string[];
  createAt?: Date;
  updateAt?: Date;
  isActive?: boolean;
  isVerified?: boolean;
  roleID?: string[];
  followerID?: string[];
  followingID?: string[];
  blockedID?: string[];
}
