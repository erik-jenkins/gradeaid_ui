import { createSlice } from '@reduxjs/toolkit';
import { loremIpsum } from 'lorem-ipsum';

export interface Crit {
  id: string;
  text: string;
  pointValue: number;
}

interface CritsState {
  critsById: Record<string, Crit>;
}

const initialState: CritsState = {
  critsById: {
    'crit-1': {
      id: 'crit-1',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-2': {
      id: 'crit-2',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-3': {
      id: 'crit-3',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-4': {
      id: 'crit-4',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-5': {
      id: 'crit-5',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-6': {
      id: 'crit-6',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-7': {
      id: 'crit-7',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-8': {
      id: 'crit-8',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-9': {
      id: 'crit-9',
      text: loremIpsum(),
      pointValue: 1,
    },
    'crit-10': {
      id: 'crit-10',
      text: loremIpsum(),
      pointValue: 1,
    },
  },
};

const critsSlice = createSlice({
  name: 'crits',
  initialState,
  reducers: {},
});

export default critsSlice.reducer;
