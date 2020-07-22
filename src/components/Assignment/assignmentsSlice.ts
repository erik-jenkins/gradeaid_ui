import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { Assignment } from './types';

interface AssignmentsState {
  assignmentsById: Record<string, Assignment>;
}

const initialState: AssignmentsState = {
  assignmentsById: {
    'assignment-1': {
      id: 'assignment-1',
      name: 'Example Assignment 1',
      categoryIds: ['category-1', 'category-2'],
      maxScore: 100,
      useMasteryScoring: true,
      masteryPoints: 2,
    },
  },
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
      const { source, destination, draggableId: categoryId } = payload;

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
});

export const { updateAssignment, reorderCategories } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
