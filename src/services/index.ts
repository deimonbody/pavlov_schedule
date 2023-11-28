import { CalendarService } from '@/services/Calendar.service';
import { LocalStorageService } from './LocalStorage.service';

const localStorageService = new LocalStorageService();
const calendarService = new CalendarService(localStorageService);

export { calendarService };
