import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { createCategory } from '../../app/actions/createCategory';
import { createCrit } from '../../app/actions/createCrit';
import { deleteCrit } from '../../app/actions/deleteCrit';
import { editCategory } from '../../app/actions/editCategory';
import { Category } from './types';

interface CategoriesState {
  categoriesByID: Record<string, Category>;
  allIds: string[];
}

const initialState: CategoriesState = {
  categoriesByID: {
    'category-1': {
      id: 'category-1',
      name: 'General Requirements',
      critIds: ['crit-1', 'crit-2', 'crit-3', 'crit-4', 'crit-5'],
    },
    'category-2': {
      id: 'category-2',
      name: 'Code Style',
      critIds: ['crit-6', 'crit-7', 'crit-8', 'crit-9', 'crit-10'],
    },
  },
  allIds: ['category-1', 'category-2'],
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
  extraReducers: (builder) =>
    builder
      .addCase(
        createCategory.fulfilled,
        (state: CategoriesState, { payload }) => {
          const { newCategory } = payload;

          state.categoriesByID[newCategory.id] = newCategory;
          state.allIds.push(newCategory.id);
        }
      )
      .addCase(
        editCategory.fulfilled,
        (state: CategoriesState, { payload }) => {
          const { updatedCategory } = payload;

          state.categoriesByID[updatedCategory.id] = updatedCategory;
        }
      )
      .addCase(createCrit.fulfilled, (state: CategoriesState, { payload }) => {
        const { newCrit, categoryId } = payload;

        state.categoriesByID[categoryId].critIds.push(newCrit.id);
      })
      .addCase(deleteCrit.fulfilled, (state: CategoriesState, { payload }) => {
        const { deletedCritId, categoryId } = payload;

        state.categoriesByID[categoryId].critIds = state.categoriesByID[
          categoryId
        ].critIds.filter((id) => id !== deletedCritId);
      }),
});

export const { reorderCrits } = categoriesSlice.actions;

export default categoriesSlice.reducer;
