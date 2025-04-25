import axios from 'axios';
import { UnsplashResponse } from '../types/unsplash';

const API_KEY = "u4pLimyEtmO5GUhd3tfFC4RwJvNMlYr6Lr9BS8SOCPM"; 
const BASE_URL = "https://api.unsplash.com";

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<UnsplashResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: 20,
        client_id: API_KEY,
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};