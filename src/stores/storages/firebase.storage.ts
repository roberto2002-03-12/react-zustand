import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = '';


// todo esto es una mala idea porque estas enviando varias veces peticiones
// se denomina estos casos como peticiones de carrera
const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json());
      
      return JSON.stringify(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then(res => res.json())
    console.log(data);
  },
  removeItem: function (name: string): unknown {
    console.log('removeItem', name);

    return null;
  }
}

const firebaseStorage = createJSONStorage( () => storageApi );

export default firebaseStorage;