import create from 'zustand';

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
  setHashTag: (text: string) => void;
  setHashTagInputText: (text: string) => void;
  deleteHashTags: (newTags: string[]) => void;
}

export const hashTagStore = create<HashTagState>((set) => ({
  hashTagInputText: '',
  hashTags: [],
  setHashTagInputText: (text) => set(() => ({ hashTagInputText: text })),
  setHashTag: (hashTagInputText) =>
    set((state) => ({
      hashTags: [...state.hashTags, hashTagInputText.trim()],
    })),
  deleteHashTags: (newTags) =>
    set(() => ({
      hashTags: newTags,
    })),
}));

// interface

export interface CategoryType {
  _id: string;
  name: string;
  __v: number;
}
