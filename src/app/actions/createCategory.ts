import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../components/Category/types';
import { RootState } from '../store';

interface CreateCategoryParams {
  category: Category;
  assignmentId: string;
}

interface CreateCategoryPayload {
  newCategory: Category;
  assignmentId: string;
}

export const createCategory = createAsyncThunk(
  'categories/create',
  async (
    params: CreateCategoryParams,
    { getState }
  ): Promise<CreateCategoryPayload> => {
    const { category, assignmentId } = params;

    const categoryIds = (getState() as RootState).categories.allIds;
    const newIdNumber =
      Math.max(...categoryIds.map((id) => +id.replace('category-', ''))) + 1;
    const newId = `category-${newIdNumber}`;

    const createdCategory: CreateCategoryPayload = {
      newCategory: { ...category, id: newId },
      assignmentId,
    };

    return new Promise<CreateCategoryPayload>((resolve) =>
      setTimeout(() => resolve(createdCategory), 200)
    );
  }
);
