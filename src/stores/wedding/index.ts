import { create } from 'zustand';
import { PersonSlice, createPersonSlice } from './person.slice';
import { GuestSlice, createGuestSlice } from './guest.slice';
import { DateSlice, createDateSlice } from './date.slice';
import { devtools } from 'zustand/middleware';

type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    (...a) => ({ // a: set, get
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
    })
  )
)