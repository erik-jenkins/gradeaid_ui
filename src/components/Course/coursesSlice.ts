import { createSlice } from '@reduxjs/toolkit';
import { loremIpsum } from 'lorem-ipsum';
import { createCourse } from '../../app/actions/createCourse';
import { Course } from './types';

interface CoursesState {
  coursesById: Record<string, Course>;
  allIds: string[];
}

const initialState: CoursesState = {
  coursesById: {
    '1': {
      id: '1',
      name: 'ECE 202: Computational Tools for ECE (Fall 2020)',
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
  extraReducers: (builder) =>
    builder.addCase(
      createCourse.fulfilled,
      (state: CoursesState, { payload }) => {
        const { newCourse } = payload;

        state.coursesById[newCourse.id] = newCourse;
        state.allIds.push(newCourse.id);
      }
    ),
});

export default coursesSlice.reducer;
