import { create, type StateCreator } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import customSessionStorage from '../storages/session.storage';
import { logger } from '../middlewares/logger.middleware';

interface IPersonState {
  firstName: string;
  lastName: string;
}

interface IPersonActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

type PersonStore = IPersonState & IPersonActions

const storeApi: StateCreator<PersonStore, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => // el tercer argumento sirve para declararle el nombre de la acción
    set(state => ({ firstName: value }), false, 'setFirstName'),
  setLastName: (value: string) => 
    set(state => ({ lastName: value }), false, 'setLastName'),
});

export const usePersonStore = create<PersonStore>()(
  // poder usar devtools
  logger(
    devtools(
      persist(storeApi, {
        name: 'person-storage',
        storage: customSessionStorage
      })
    )
  )
);