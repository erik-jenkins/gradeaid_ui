import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../components/Category/types';

interface EditCategoryParams {
  category: Category;
}

interface EditCategoryPayload {
  updatedCategory: Category;
}

export const editCategory = createAsyncThunk(
  'categories/edit',
  async ({ category }: EditCategoryParams): Promise<EditCategoryPayload> => {
    return new Promise<EditCategoryPayload>((resolve) =>
      setTimeout(() => resolve({ updatedCategory: category }), 200)
    );
  }
);
