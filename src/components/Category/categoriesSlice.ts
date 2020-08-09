import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { createCategory } from '../../app/actions/createCategory';
import { createCrit } from '../../app/actions/createCrit';
import { deleteCategory } from '../../app/actions/deleteCategory';
import { deleteCrit } from '../../app/actions/deleteCrit';
import { editCategory } from '../../app/actions/editCategory';
import { Category } from './types';

interface CategoriesState {
  categoriesByID: Record<string, Category>;
  allIds: string[];
}

const initialState: CategoriesState = {
  categoriesByID: {
    '1': {
      id: '1',
      name: 'General Requirements',
      critIds: ['1', '2', '3', '4', '5'],
    },
    '2': {
      id: '2',
      name: 'Code Style',
      critIds: ['6', '7', '8', '9', '10'],
    },
  },
  allIds: ['1', '2'],
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
      .addCase(
        deleteCategory.fulfilled,
        (state: CategoriesState, { payload }) => {
          const { deletedCategoryId } = payload;

          delete state.categoriesByID[deletedCategoryId];
          state.allIds = state.allIds.filter((id) => id !== deletedCategoryId);
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
