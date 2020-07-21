import { createAsyncThunk } from '@reduxjs/toolkit';

interface DeleteCritParams {
  critId: string;
  categoryId: string;
}

interface DeleteCritPayload {
  deletedCritId: string;
  categoryId: string;
}

export const deleteCrit = createAsyncThunk(
  'crits/delete',
  async ({ critId, categoryId }: DeleteCritParams) => {
    // simulate delete latency
    return new Promise<DeleteCritPayload>((resolve) =>
      setTimeout(() => resolve({ deletedCritId: critId, categoryId }), 200)
    );
  }
);
