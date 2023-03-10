export type PwType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UpdateInfo = {
  nickName: string | undefined;
  intro: string | undefined;
  image: string | undefined;
  phoneNumber: string | undefined;
  address1: string | undefined;
  address2: string | undefined;
};

export type UserType = {
  _id: string;
  name: string;
  image: string;
  nickName: string;
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  reports: Array<any>;
  suspension: boolean;
  role: string;
  createdAt: string;
  updatedAt?: string;
  intro: string;
};

export type UpdateUserType = {
  image?: string;
  nickName?: string;
  password?: string;
  phoneNumber?: string;
  postalCode?: string;
  address1?: string;
  address2?: string;
  suspension?: boolean;
};
