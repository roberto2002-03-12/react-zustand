import { StateCreator } from "zustand";

export interface DateSlice {
  // esto no va funcionar en persist
  // debes convertirlo en primitivo
  eventDate: Date; // number, string, primitivo

  eventYYYYMMDD: () => string;
  eventHHMM: () => string;

  setEventDate: (parcialDate: string) => void;
  setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),
  eventYYYYMMDD: () => get().eventDate.toISOString().split('T')[0],
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, '0');
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`
  },
  setEventDate: (parcialDate: string) => {
    const date = new Date(parcialDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // la base es 0 por eso el +1
    const day = date.getDate() + 1;

    const newDate = new Date(get().eventDate)
    newDate.setFullYear(year)
    newDate.setMonth(month)
    newDate.setDate(day)
    set({ eventDate: newDate })
  },
  setEventTime: (eventTime: string) => {
    const hours = parseInt(eventTime.split(':')[0]);
    const minutes = parseInt(eventTime.split(':')[1]);

    const newDate = new Date(get().eventDate)
    newDate.setHours(hours, minutes)
    console.log(newDate)
    set({ eventDate: newDate })
  }
});