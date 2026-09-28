import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AnalysisResponse {
  id: string;
  image_url: string;
  analyses: Array<{
    type: string;
    confidence: number;
    description: string;
    data: any;
  }>;
  created_at: string;
}

export const imageService = {
  async uploadAndAnalyze(base64Image: string): Promise<AnalysisResponse> {
    try {
      const response = await api.post('/api/analyze', {
        image: base64Image,
        format: 'base64',
      });
      return response.data;
    } catch (error) {
      throw new Error(`Analysis failed: ${error}`);
    }
  },

  async getAnalysisHistory(): Promise<AnalysisResponse[]> {
    try {
      const response = await api.get('/api/analyses');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch history: ${error}`);
    }
  },

  async getAnalysis(id: string): Promise<AnalysisResponse> {
    try {
      const response = await api.get(`/api/analyses/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analysis: ${error}`);
    }
  },

  async deleteAnalysis(id: string): Promise<void> {
    try {
      await api.delete(`/api/analyses/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete analysis: ${error}`);
    }
  },
};

export default api;
