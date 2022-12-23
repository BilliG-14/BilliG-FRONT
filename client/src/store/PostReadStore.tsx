export type PostDataType = {
  imgUrl: string[];
  postType: string;
  category: {
    _id: string;
    name: string;
    __v: number;
  };
  author: {
    image: string;
    suspension: boolean;
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
  };
  title: string;
  description: string;
  lender: {
    image: string;
    suspension: boolean;
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
  };
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
};
