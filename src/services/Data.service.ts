export abstract class DataService {
  abstract getData<T>(key: string): Promise<T | null>;

  abstract addData<T>(key: string, data: T): Promise<void>;

  abstract editData<T>(key: string, data: T): Promise<void>;

  abstract deleteData(key: string): Promise<void>;
}
