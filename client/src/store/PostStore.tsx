import create from 'zustand';

// 사진 업로드 store
interface ImageUploadState {
  imgFiles: FileList | undefined;
  setImgFile: (imgFileList: FileList) => void;
}

export const imageUploadStore = create<ImageUploadState>((set) => ({
  imgFiles: undefined,
  setImgFile: (imgFileList) => set(() => ({ imgFiles: imgFileList })),
}));

// 거래방법 store
interface TradeWayState {
  tradeWay: object;
  setDirect: (checked: boolean) => void;
  setDelivery: (checked: boolean) => void;
}

export const tradeWayStore = create<TradeWayState>((set) => ({
  tradeWay: {
    direct: false,
    delivery: false,
  },
  setDirect: (checked) =>
    set((state) => ({
      tradeWay: { ...state.tradeWay, direct: checked },
    })),
  setDelivery: (checked) =>
    set((state) => ({
      tradeWay: { ...state.tradeWay, delivery: checked },
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
