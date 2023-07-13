import axios from 'axios';

const API_BASE_URL = 'https://resume-frontend-five.vercel.app/'; // Замените на URL вашего FastAPI-сервера

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const improveResume = async (resumeData) => {
  try {
    const response = await api.post('/imp', resumeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const analyzeResume = async (resumeData) => {
  try {
    const response = await api.post('/analyze', resumeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const professionResume = async (resumeData) => {
  try {
    const response = await api.post('/prof', resumeData );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
