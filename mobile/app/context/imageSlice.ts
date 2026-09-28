import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  uri: string | null;
  base64: string | null;
  timestamp: number | null;
}

const initialState: ImageState = {
  uri: null,
  base64: null,
  timestamp: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<{ uri: string; base64: string }>) => {
      state.uri = action.payload.uri;
      state.base64 = action.payload.base64;
      state.timestamp = Date.now();
    },
    clearImage: (state) => {
      state.uri = null;
      state.base64 = null;
      state.timestamp = null;
    },
  },
});

export const { setImage, clearImage } = imageSlice.actions;
export default imageSlice.reducer;
