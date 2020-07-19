import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';

interface Category {
  id: string;
  name: string;
  critIds: string[];
}

interface CategoriesState {
  categoriesByID: Record<string, Category>;
}

const initialState: CategoriesState = {
  categoriesByID: {
    'category-1': {
      id: 'category-1',
      name: 'General Requirements',
      critIds: ['crit-1', 'crit-2', 'crit-3', 'crit-4', 'crit-5'],
    },
    'category-2': {
      id: 'category-1',
      name: 'Code Style',
      critIds: ['crit-6', 'crit-7', 'crit-8', 'crit-9', 'crit-10'],
    },
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    reorderCrits(
      state: CategoriesState,
      { payload }: PayloadAction<DropResult>
    ) {
      const { source, destination, draggableId: critId } = payload;

      if (!destination) {
        return;
      }

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const sourceCategory = state.categoriesByID[source.droppableId];
      sourceCategory.critIds.splice(source.index, 1);

      const destCategory = state.categoriesByID[destination.droppableId];
      destCategory.critIds.splice(destination.index, 0, critId);
    },
  },
});

export const { reorderCrits } = categoriesSlice.actions;

export default categoriesSlice.reducer;
