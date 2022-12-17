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
