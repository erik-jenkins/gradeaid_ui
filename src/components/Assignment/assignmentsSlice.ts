import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { createCategory } from '../../app/actions/createCategory';
import { deleteCategory } from '../../app/actions/deleteCategory';
import { stripDndId } from '../Category/types';
import { Assignment } from './types';

interface AssignmentsState {
  assignmentsById: Record<string, Assignment>;
  allIds: string[];
}

const initialState: AssignmentsState = {
  assignmentsById: {
    '1': {
      id: '1',
      name: 'Example Assignment 1',
      categoryIds: ['1', '2'],
      maxScore: 100,
      useMasteryScoring: true,
      masteryPoints: 2,
    },
    '2': {
      id: '2',
      name: 'Example Assignment 2',
      categoryIds: [],
      maxScore: 12,
      useMasteryScoring: true,
      masteryPoints: 2,
    },
  },
  allIds: ['1', '2'],
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    updateAssignment(
      state: AssignmentsState,
      { payload: assignment }: PayloadAction<Assignment>
    ) {
      state.assignmentsById[assignment.id] = assignment;
    },
    reorderCategories(
      state: AssignmentsState,
      { payload }: PayloadAction<DropResult>
    ) {
      const { source, destination, draggableId } = payload;
      const categoryId = stripDndId(draggableId);

      if (!destination) {
        return;
      }

      if (source.index === destination.index) {
        return;
      }

      const assignment = state.assignmentsById[source.droppableId];
      assignment.categoryIds.splice(source.index, 1);
      assignment.categoryIds.splice(destination.index, 0, categoryId);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        createCategory.fulfilled,
        (state: AssignmentsState, { payload }) => {
          const { newCategory, assignmentId } = payload;

          state.assignmentsById[assignmentId].categoryIds.push(newCategory.id);
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state: AssignmentsState, { payload }) => {
          const { deletedCategoryId, assignmentId } = payload;

          state.assignmentsById[
            assignmentId
          ].categoryIds = state.assignmentsById[
            assignmentId
          ].categoryIds.filter((id) => id !== deletedCategoryId);
        }
      ),
});

export const { updateAssignment, reorderCategories } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
