import create from 'zustand';

// 사진 업로드 store
interface ImageUploadState {
  imgFiles: FileList | undefined;
  setimgFile: (imgFileList: FileList) => void;
}

export const imageUploadStore = create<ImageUploadState>((set) => ({
  imgFiles: undefined,
  setimgFile: (imgFileList) => set(() => ({ imgFiles: imgFileList })),
}));

// 거래방법 store
interface TradeWayState {
  direct: boolean;
  delivery: boolean;
  tradeWay: object;
  setDirect: (checked: boolean) => void;
  setDelivery: (checked: boolean) => void;
  setTradeWay: (direct: boolean, delivery: boolean) => void;
}

export const tradeWayStore = create<TradeWayState>((set) => ({
  direct: false,
  delivery: false,
  tradeWay: {
    direct: false,
    delivery: false,
  },
  setDirect: (checked) => set(() => ({ direct: checked })),
  setDelivery: (checked) => set(() => ({ delivery: checked })),
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
