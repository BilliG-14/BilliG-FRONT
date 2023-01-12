export type NoticeType = {
  _id: string;
  title: string;
  writer: {
    _id: string;
    nickName: string;
    name: string;
  };
  content: string;
  createdAt: string;
};
export type UpdatedNoticeType = {
  updated: {
    title: string;
    content: string;
  };
  _id: string;
};
export type CreatedNoticeType = {
  title: string;
  content: string;
};
export type NoticesPaginateType = {
  docs: [NoticeType];
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
};
