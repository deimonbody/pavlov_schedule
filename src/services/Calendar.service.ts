import { DataService } from '@/services/Data.service';
import { ICalendarDay, IIdea, ILocalStorageDays, LocalStorageKeys } from '@/types';
import dayjs from 'dayjs';

export class CalendarService {
  private dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  async getData(currentYear: number, currentMonth: number, daysOfMonth: number): Promise<ICalendarDay[]> {
    const result: ICalendarDay[] = [];

    let daysFromLocalStorage: ICalendarDay[] = [];
    const dataFromDB = await this.dataService.getData<ILocalStorageDays[]>(LocalStorageKeys.DAYS);

    if (dataFromDB) {
      const daysByCurrentYearAndMonth = dataFromDB.find(
        ({ year, month }) => year === currentYear && month === currentMonth
      )?.days;
      daysFromLocalStorage = daysByCurrentYearAndMonth || [];
    }

    for (let i = 1; i <= daysOfMonth; i++) {
      const date = dayjs().month(currentMonth).date(i);
      const sameElement = daysFromLocalStorage.find((el) => el.fullDate === date.format('DD/MM/YYYY'));
      if (sameElement) {
        result.push(sameElement);
      } else {
        result.push({
          dayNumber: date.date(),
          dayOfWeek: dayjs().date(date.date()).format('dd'),
          fullDate: date.format('DD/MM/YYYY'),
          ideas: [],
        });
      }
    }

    return result;
  }

  async addData(newIdea: IIdea, dataOfIdea: dayjs.Dayjs, yearOfIdea: number, monthOfIdea: number): Promise<void> {
    const dayOfIdea = dataOfIdea.date();
    const dayOfWeek = dayjs().date(dataOfIdea.date()).format('dd');
    const dataFromDB = await this.dataService.getData<ILocalStorageDays[]>(LocalStorageKeys.DAYS);

    const newDay = {
      dayNumber: dayOfIdea,
      dayOfWeek,
      fullDate: dataOfIdea.format('DD/MM/YYYY'),
      ideas: [newIdea],
    };

    if (dataFromDB && dataFromDB.length) {
      const existingYearAndMonthIndex = dataFromDB.findIndex(
        (el) => el.year === yearOfIdea && el.month === monthOfIdea
      );

      let newCalendarDays = dataFromDB;
      if (existingYearAndMonthIndex >= 0) {
        newCalendarDays = newCalendarDays.map((el, index) => {
          if (index === existingYearAndMonthIndex) {
            let days = [...el.days];
            // IF WE HAVE CREATED THIS CALENDAR DAY BEFORE
            if (days.map((day) => day.dayNumber).includes(dayOfIdea)) {
              days = days.map((day) =>
                day.dayNumber === dayOfIdea ? { ...day, ideas: [...day.ideas, newIdea] } : day
              );
            } else {
              days = [...days, newDay];
            }
            return {
              ...el,
              days,
            };
          }
          return el;
        });
      } else {
        newCalendarDays = [
          ...newCalendarDays,
          {
            year: yearOfIdea,
            month: monthOfIdea,
            days: [newDay],
          },
        ];
      }

      await this.dataService.editData(LocalStorageKeys.DAYS, newCalendarDays);
    } else {
      await this.dataService.editData(LocalStorageKeys.DAYS, [
        {
          year: yearOfIdea,
          month: monthOfIdea,
          days: [newDay],
        },
      ]);
    }
  }

  async editData(editIdea: IIdea): Promise<void> {
    const dataFromDB = await this.dataService.getData<ILocalStorageDays[]>(LocalStorageKeys.DAYS);
    if (dataFromDB) {
      const newCalendarDays = dataFromDB.map((el) => {
        const newDays = el.days.map((day) => {
          const newIdeas = day.ideas.map((idea) => (idea.id === editIdea.id ? editIdea : idea));
          return {
            ...day,
            ideas: newIdeas,
          };
        });
        return {
          ...el,
          days: newDays,
        };
      });
      await this.dataService.editData(LocalStorageKeys.DAYS, newCalendarDays);
    }
  }

  async deleteData(id: string): Promise<void> {
    const dataFromDB = await this.dataService.getData<ILocalStorageDays[]>(LocalStorageKeys.DAYS);
    if (dataFromDB) {
      let newCalendarDays = dataFromDB.map((el) => {
        const newDays = el.days.map((day) => {
          const newIdeas = day.ideas.filter((idea) => idea.id !== id);
          return {
            ...day,
            ideas: newIdeas,
          };
        });
        return {
          ...el,
          days: newDays,
        };
      });

      newCalendarDays = newCalendarDays.filter((el) => {
        // IF DAY HAS`NT ANY IDEAS;
        if (el.days.length === 1 && el.days[0].ideas.length === 0) {
          return false;
        }
        return true;
      });

      newCalendarDays = newCalendarDays.map((el) => ({
        // Delete Days withoud ideas
        ...el,
        days: el.days.filter((day) => day.ideas.length),
      }));

      await this.dataService.editData(LocalStorageKeys.DAYS, newCalendarDays);
    }
  }
}
