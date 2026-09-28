import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalysisResult {
  id: string;
  type: string;
  confidence: number;
  description: string;
  data: any;
}

interface AnalysisState {
  results: AnalysisResult[];
  loading: boolean;
  error: string | null;
  currentAnalysis: AnalysisResult | null;
}

const initialState: AnalysisState = {
  results: [],
  loading: false,
  error: null,
  currentAnalysis: null,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    startAnalysis: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAnalysisResults: (state, action: PayloadAction<AnalysisResult[]>) => {
      state.results = action.payload;
      state.currentAnalysis = action.payload[0] || null;
      state.loading = false;
    },
    setAnalysisError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAnalysis: (state) => {
      state.results = [];
      state.currentAnalysis = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { startAnalysis, setAnalysisResults, setAnalysisError, clearAnalysis } = analysisSlice.actions;
export default analysisSlice.reducer;
