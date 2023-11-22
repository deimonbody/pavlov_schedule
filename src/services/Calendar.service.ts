import { IIdea, ILocalStorageDays, LocalStorageKeys } from '@/types';
import dayjs from 'dayjs';

export class CalendarService {
  static addNewIdea(newIdea: IIdea, dataOfIdea: dayjs.Dayjs, yearOfIdea: number, monthOfIdea: number) {
    const dayOfIdea = dataOfIdea.date();
    const dayOfWeek = dayjs().date(dataOfIdea.date()).format('dd');

    const localStorageData = localStorage.getItem(LocalStorageKeys.DAYS);
    const daysFromLocalStorage: ILocalStorageDays[] = localStorageData
      ? (JSON.parse(localStorageData) as ILocalStorageDays[])
      : [];

    const newDay = {
      dayNumber: dayOfIdea,
      dayOfWeek,
      fullDate: dataOfIdea.format('DD/MM/YYYY'),
      ideas: [newIdea],
    };

    if (daysFromLocalStorage.length) {
      const existingYearAndMonthIndex = daysFromLocalStorage.findIndex(
        (el) => el.year === yearOfIdea && el.month === monthOfIdea
      );

      let newCalendarDays = daysFromLocalStorage;
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

      localStorage.setItem(LocalStorageKeys.DAYS, JSON.stringify(newCalendarDays));
    } else {
      localStorage.setItem(
        LocalStorageKeys.DAYS,
        JSON.stringify([
          {
            year: yearOfIdea,
            month: monthOfIdea,
            days: [newDay],
          },
        ])
      );
    }
  }

  static editIdea(editIdea: IIdea) {
    const localStorageData = localStorage.getItem(LocalStorageKeys.DAYS);
    const daysFromLocalStorage = JSON.parse(localStorageData as string) as ILocalStorageDays[];

    const newCalendarDays = daysFromLocalStorage.map((el) => {
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
    localStorage.setItem(LocalStorageKeys.DAYS, JSON.stringify(newCalendarDays));
  }

  static deleteIdea(id: string) {
    const localStorageData = localStorage.getItem(LocalStorageKeys.DAYS);
    const daysFromLocalStorage = JSON.parse(localStorageData as string) as ILocalStorageDays[];

    let newCalendarDays = daysFromLocalStorage.map((el) => {
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

    localStorage.setItem(LocalStorageKeys.DAYS, JSON.stringify(newCalendarDays));
  }
}
