import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import customSessionStorage from '../storages/session.storage';
import firebaseSessionStorage from '../storages/firebase.storage';

interface IPersonState {
  firstName: string;
  lastName: string;
}

interface IPersonActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

type PersonStore = IPersonState & IPersonActions

// ¿Quieres usar spreeds al momento de importar? esta es la manera de hacerlo

const storeApi: StateCreator<PersonStore> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set(state => ({ firstName: value })),
  setLastName: (value: string) => set(state => ({ lastName: value })),
});

export const usePersonFirebaseStore = create<PersonStore>()(
  // persist: te ahorra el trabajo y lógica de usar "localStorage" que es algo
  // nativo de javascript. Guardas los datos de manera local haciendo que sea
  // persistente, genial para logins o "favoritos", es más fácil que usar 
  // localStorage 
  persist(storeApi, {
    name: 'person-storage',
    // storage: customSessionStorage,
    storage: firebaseSessionStorage
  })
);

// export const usePersonStore = create<PersonStore>()(
//   // persist: te ahorra el trabajo y lógica de usar "localStorage" que es algo
//   // nativo de javascript. Guardas los datos de manera local haciendo que sea
//   // persistente, genial para logins o "favoritos", es más fácil que usar 
//   // localStorage 
//   persist(
//     (set) => ({
//       firstName: '',
//       lastName: '',

//       setFirstName: (value: string) => set(state => ({ firstName: value })),
//       setLastName: (value: string) => set(state => ({ lastName: value })),
//     }),
//     { name: 'person-storage' }
//   )
// );