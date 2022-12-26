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
  hashtag: [
    {
      createdAt: string;
      mentions: number;
      name: string;
      updatedAt: string;
      __v: number;
      _id: string;
    },
  ];
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

export interface UserInformationPostType {
  lender?: string;
  borrower?: string;
  stateOfTransaction: number;
  period: {
    start: string | undefined;
    end: string | undefined;
  };
}

// 서버 해시태그 타입
export interface ServerHashTags {
  createdAt: string;
  mentions: number;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
