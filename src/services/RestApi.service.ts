// TODO:Remove this line when we will add rest api methods
/* eslint-disable @typescript-eslint/no-empty-function */
import { DataService } from '@/services/Data.service';

export class RestApiService extends DataService {
  async getData<T>(key: string): Promise<T | null> {
    return null;
  }

  async editData<T>(key: string, data: T): Promise<void> {}

  async addData<T>(key: string, data: T): Promise<void> {}

  async deleteData(key: string): Promise<void> {}
}
