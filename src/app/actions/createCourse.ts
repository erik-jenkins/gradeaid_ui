import { createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../../components/Course/types';
import { RootState } from '../store';

interface CreateCourseParams {
  course: Course;
}

interface CreateCoursePayload {
  newCourse: Course;
}

export const createCourse = createAsyncThunk(
  'courses/create',
  async (
    params: CreateCourseParams,
    { getState }
  ): Promise<CreateCoursePayload> => {
    const { course } = params;

    const courseIds = (getState() as RootState).courses.allIds;
    const newIdNumber = Math.max(...courseIds.map((id) => +id)) + 1;
    const newId = `${newIdNumber}`;

    const createdCourse: CreateCoursePayload = {
      newCourse: { ...course, id: newId },
    };

    return new Promise<CreateCoursePayload>((resolve) =>
      setTimeout(() => resolve(createdCourse), 200)
    );
  }
);
