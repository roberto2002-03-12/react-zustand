import { StateStorage, createJSONStorage } from "zustand/middleware";

// guardar los datos en sessionstorage no en localstorage
// ¿Cual es la diferencia entre esas dos?
// el primero es que se elimina cuando se cierra la ventana o
// se apaga la pc, mientras que el otro ya sabes cómo es
const storageApi: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): void | Promise<void> {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): unknown {
    return null;
  }
}

const customSessionStorage = createJSONStorage( () => storageApi );

export default customSessionStorage;