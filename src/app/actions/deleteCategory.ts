import { createAsyncThunk } from '@reduxjs/toolkit';

interface DeleteCategoryParams {
  categoryId: string;
  assignmentId: string;
}

interface DeleteCategoryPayload {
  deletedCategoryId: string;
  assignmentId: string;
}

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async ({ categoryId, assignmentId }: DeleteCategoryParams) => {
    return new Promise<DeleteCategoryPayload>((resolve) =>
      setTimeout(
        () => resolve({ deletedCategoryId: categoryId, assignmentId }),
        200
      )
    );
  }
);
