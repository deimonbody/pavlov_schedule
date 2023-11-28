import { DataService } from '@/services/Data.service';

export class LocalStorageService extends DataService {
  async getData<T>(key: string): Promise<T | null> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  async addData<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async editData<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async deleteData(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
