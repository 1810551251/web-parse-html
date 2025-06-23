import { create } from 'zustand';
import { ParsedImageData, ParserStatus } from '@/types';

interface AppState {
  images: ParsedImageData[];
  status: ParserStatus;
  error: string | null;
  setImages: (images: ParsedImageData[]) => void;
  updateImageDescription: (id: string, description: string) => void;
  setStatus: (status: ParserStatus) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  images: [],
  status: 'idle',
  error: null,
  setImages: (images) => set({ images, status: 'success', error: null }),
  updateImageDescription: (id, description) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, description } : img
      ),
    })),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: 'error', images: [] }),
  reset: () => set({ images: [], status: 'idle', error: null }),
}));