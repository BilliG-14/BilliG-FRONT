import create from 'zustand';

// 카테고리 store
export interface CategoryType {
  _id?: string;
  name?: string;
  __v?: number;
  categoryId?: string | undefined;
}

interface CategoryState {
  categorys: [CategoryType];
  filteredCategory: string | undefined;
  setCategorys: (category: [CategoryType]) => void;
  setFilteredCategory: (categoryid: string | undefined) => void;
}

export const categoryStore = create<CategoryState>((set) => ({
  categorys: [
    {
      _id: '',
      name: '',
      __v: 0,
    },
  ],
  filteredCategory: '',
  setCategorys: (category) =>
    set(() => ({
      categorys: category,
    })),
  setFilteredCategory: (categoryId) =>
    set(() => ({
      filteredCategory: categoryId,
    })),
}));

// 상세설명 store
interface DescriptionState {
  description: string | undefined;
  setDescription: (descriptions: string | undefined) => void;
}

export const descriptionStore = create<DescriptionState>((set) => ({
  description: '',
  setDescription: (descriptions) =>
    set(() => ({
      description: descriptions,
    })),
}));

// 예약일 store
interface ReservationState {
  reservationDate: {
    start: string | undefined;
    end: string | undefined;
  };
  setReservationDate: (
    start: string | undefined,
    end: string | undefined,
  ) => void;
}

export const reservationStore = create<ReservationState>((set) => ({
  reservationDate: {
    start: '',
    end: '',
  },
  setReservationDate: (start, end) =>
    set((state) => ({
      reservationDate: { ...state.reservationDate, start, end },
    })),
}));

// 사진 업로드 store
interface ImageUploadState {
  imgFiles: File[];
  setImgFile: (imgFileList: File[]) => void;
}

export const imageUploadStore = create<ImageUploadState>((set) => ({
  imgFiles: [],
  setImgFile: (imgFileList) => set((state) => ({ imgFiles: imgFileList })),
}));

interface UpdateImageUploadState {
  imgUrlList: string[];
  setImgUrlList: (imgUrl: string[]) => void;
}

export const UpdateImageUploadStore = create<UpdateImageUploadState>((set) => ({
  imgUrlList: [],
  setImgUrlList: (urlList) => set((state) => ({ imgUrlList: urlList })),
}));

// 거래방법 store
interface TradeWayState {
  tradeWay: {
    direct: boolean | undefined;
    delivery: boolean | undefined;
  };
  setTradeWay: (
    direct: boolean | undefined,
    delivery: boolean | undefined,
  ) => void;
}

export const tradeWayStore = create<TradeWayState>((set) => ({
  tradeWay: {
    direct: false,
    delivery: false,
  },
  setTradeWay: (direct, delivery) =>
    set((state) => ({
      tradeWay: { ...state.tradeWay, direct, delivery },
    })),
}));

// 해시태그 store

interface HashTagState {
  hashTagInputText: string;
  hashTags: string[];
  setHashTags: (text: string) => void;
  setHashTagInputText: (text: string) => void;
  deleteHashTags: (newTags: string[]) => void;
  serverHashTags: (tagList: string[]) => void;
}

export const hashTagStore = create<HashTagState>((set) => ({
  hashTagInputText: '',
  hashTags: [],
  setHashTagInputText: (text) => set(() => ({ hashTagInputText: text })),
  setHashTags: (hashTagInputText) =>
    set((state) => ({
      hashTags: [...state.hashTags, hashTagInputText.trim()],
    })),
  deleteHashTags: (newTags) =>
    set(() => ({
      hashTags: newTags,
    })),
  serverHashTags: (tagList) => set(() => ({ hashTags: tagList })),
}));
