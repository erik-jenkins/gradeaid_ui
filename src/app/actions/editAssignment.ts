import { createAsyncThunk } from '@reduxjs/toolkit';
import { Assignment } from '../../components/Assignment/types';

interface EditAssignmentParams {
  assignment: Assignment;
}

interface EditAssignmentPayload {
  updatedAssignment: Assignment;
}

export const editAssignment = createAsyncThunk(
  'assignments/edit',
  async ({
    assignment,
  }: EditAssignmentParams): Promise<EditAssignmentPayload> => {
    return new Promise<EditAssignmentPayload>((resolve) =>
      setTimeout(() => resolve({ updatedAssignment: assignment }), 200)
    );
  }
);
