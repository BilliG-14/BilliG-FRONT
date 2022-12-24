export interface PostDataType {
  imgUrl: string[];
  postType: string;
  category: {
    _id: string;
    name: string;
    __v: number;
  };
  author: UserType;
  title: string;
  description: string;
  borrower?: UserType;
  lender?: UserType;
  stateOfTransaction: number;
  address: string;
  price: {
    priceDay: number;
    priceTime: number;
  };
  period?: {
    start: string;
    end: string;
  };
  tradeWay: {
    delivery: boolean;
    direct: boolean;
  };
  hashtag: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  image: string;
  suspension: boolean;
  role: string;
  _id: string;
  email: string;
  nickName: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reports: [];
}

export interface PostIdType {
  postType: string;
  postId: string | undefined;
  stateNumber: number;
  loginedUserId?: string | null;
  authorId?: string;
  lenderId?: string | undefined;
  borrowerId?: string | undefined;
}

// export interface LenderInformationType {
//   lender: string;
//   stateOfTransaction: number;
// }

export interface UserInformationType {
  lender?: string;
  borrower?: string;
  stateOfTransaction: number;
}
