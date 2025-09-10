import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ContentItem } from '../types/content';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

export interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk('content/fetch', async () => {
  const res = await axios.get(API_URL);
  return res.data as ContentItem[];
});

const slice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ContentItem[]>) {
      state.items = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed';
    });
  }
});

export const { setItems } = slice.actions;
export default slice.reducer;
