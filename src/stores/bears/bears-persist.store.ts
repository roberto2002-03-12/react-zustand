import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  pandaBears: number;
  blackBears: number;
  polarBears: number;

  bears: Bear[];

  totalBears: () => number;

  increase: (by: number) => void;
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;

  doNothing: () => void;

  addBears: () => void;
  clearBeras: () => void;
}

export const useBearPersistStore = create<BearState>()(
  persist(
    (set, get) => ({
      pandaBears: 0,
      polarBears: 5,
      blackBears: 10,

      bears: [
        {
          id: 1,
          name: 'Oso #1'
        }
      ],
      // esto no va funcionar en un persist
      // computed: {
      //   get totalBears(): number {
      //     get().blackBears;

      //     return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
      //   }
      // },

      // esto si va funcionar en un persist
      totalBears: () => {
        return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
      },

      increase: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
      increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
      
      // se crea una nuevo estado con los mismos valores
      doNothing: () => set(state => ({ bears: [...state.bears] })),
      
      addBears: () => set(state => ({ 
        bears: [
          ...state.bears,
          { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }
        ],
      })),
      clearBeras: () => set(({ bears: [] }))
    }),
    { name: 'bears-store' }
  )
)