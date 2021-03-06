import { createAsyncThunk } from '@reduxjs/toolkit';
import { Crit } from '../../components/Crit/types';
import { RootState } from '../store';

interface CreateCritParams {
  crit: Crit;
  categoryId: string;
}

export interface CreateCritPayload {
  newCrit: Crit;
  categoryId: string;
}

export const createCrit = createAsyncThunk(
  'crits/create',
  async (
    params: CreateCritParams,
    { getState }
  ): Promise<CreateCritPayload> => {
    const { crit, categoryId } = params;

    const critIds = (getState() as RootState).crits.allIds;
    const newIdNumber = Math.max(...critIds.map((id) => +id)) + 1;
    const newId = `${newIdNumber}`;

    const createdCrit: CreateCritPayload = {
      newCrit: { ...crit, id: newId },
      categoryId,
    };

    // simulate latency
    return new Promise<CreateCritPayload>((resolve) =>
      setTimeout(() => resolve(createdCrit), 200)
    );
  }
);
