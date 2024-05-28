import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

interface IPersonState {
  firstName: string;
  lastName: string;
}

interface IPersonActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

type PersonStore = IPersonState & IPersonActions

const storeApi: StateCreator<PersonStore> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set(state => ({ firstName: value })),
  setLastName: (value: string) => set(state => ({ lastName: value })),
});

export const usePersonFirebaseStore = create<PersonStore>()(
  persist(storeApi, {
    name: 'person-storage',
  })
);
