import { StateCreator } from "zustand";

export interface PersonSlice {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;

}

// ¿Por qué no creo un objeto person de frente?
// porque es un slice y no va estar todo unido, además es un
// simple curso de react zustand
export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
});