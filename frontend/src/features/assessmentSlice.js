import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const evaluateCode = createAsyncThunk(
  'assessment/evaluateCode',
  async ({ code, language }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/evaluate', {
        code,
        language
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to connect to backend');
    }
  }
);

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState: {
    code: '',
    language: 'python',
    loading: false,
    feedback: null,
    history: [],
    error: null,
  },
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(evaluateCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(evaluateCode.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
        state.history.unshift({
          code: state.code,
          language: state.language,
          result: action.payload,
          timestamp: new Date().toLocaleTimeString(),
        });
      })
      .addCase(evaluateCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCode, setLanguage } = assessmentSlice.actions;
export default assessmentSlice.reducer;