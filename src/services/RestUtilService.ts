import axios, { AxiosResponse } from 'axios';
import { User } from '../interface/CommonInterface';

// Base URL for your API
const BASE_URL = 'https://api.nobelprize.org/2.1';

export interface LaureatesResponse {
    laureates: User[]
}


class RestUilService {
  // Generic method to handle GET requests
  private async get<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    return (await this.get<LaureatesResponse>('/laureates')).laureates;
  }

  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
}

export default new RestUilService();