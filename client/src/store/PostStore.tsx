import create from 'zustand';

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
  tradeWay: object;
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
