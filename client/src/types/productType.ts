export type PostDataType = {
  _id: string;
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
};

export type UserType = {
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
};

export type PostIdType = {
  postType: string;
  postId: string | undefined;
  stateNumber: number;
  loginedUserId?: string | null;
  authorId?: string;
  lenderId?: string | undefined;
  borrowerId?: string | undefined;
};

export type UserInformationPostType = {
  lender?: string;
  borrower?: string;
  stateOfTransaction: number;
  period: {
    start: string | undefined;
    end: string | undefined;
  };
};

// 서버 해시태그 타입
export type ServerHashTags = {
  createdAt: string;
  mentions: number;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

// 상품 상세 지도의 주소 좌표관련 타입
export type ResultType = {
  x: number;
  y: number;
};

export type AddressType = {
  address: string;
};

// 글 작성 시 업로드한 이미지 프리뷰 타입
export type PreviewImg = {
  pictureName: string;
  URL: string;
};

export type PropsType = {
  bringImgUrlList: string[];
};
