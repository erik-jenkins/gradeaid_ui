import { createSlice } from '@reduxjs/toolkit';
import { loremIpsum } from 'lorem-ipsum';
import { Course } from './types';

interface CoursesState {
  coursesById: Record<string, Course>;
  allIds: string[];
}

const initialState: CoursesState = {
  coursesById: {
    '1': {
      id: '1',
      name: 'ECE 212',
      description: loremIpsum({ count: 1, units: 'paragraph' }),
      assignmentIds: ['1', '2'],
    },
  },
  allIds: ['1'],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
});

export default coursesSlice.reducer;
