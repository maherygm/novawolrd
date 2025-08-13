import { useState } from 'react';
import axios from 'axios';

const link = import.meta.env.VITE_DETECT_MODEL_LINK

interface AIAnalysis {
  type: string;
  estDechet: boolean;
  ideesRecyclage: string[];
  typesEntreprises: string[];
  raw?: string;
  warning?: string;
}

interface DescribeImageResponse {
  caption: string;
  analysis: AIAnalysis;
}

const useImageDescription = () => {
  const [description, setDescription] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const describeImage = async (file: File) => {
    setLoading(true);
    setError(null);
    setDescription(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post<DescribeImageResponse>(
        link+'analyze_image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setDescription(response.data.caption);
      setAnalysis(response.data.analysis);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return {
    describeImage,
    description,
    analysis,
    loading,
    error,
  };
};

export default useImageDescription;
