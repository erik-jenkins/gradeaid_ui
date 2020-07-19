import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';

interface FeedbackCrit {
  critId: string;
  occurrences: number;
}

interface FeedbackState {
  feedbackCrits: FeedbackCrit[];
}

const initialState: FeedbackState = {
  feedbackCrits: [],
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedbackCrit(
      state: FeedbackState,
      { payload: critId }: PayloadAction<string>
    ) {
      const critIndex = state.feedbackCrits.findIndex(
        (feedbackCrit) => feedbackCrit.critId === critId
      );

      if (critIndex < 0) {
        state.feedbackCrits.push({ critId: critId, occurrences: 1 });
      } else {
        state.feedbackCrits[critIndex].occurrences++;
      }
    },
    removeFeedbackCrit(
      state: FeedbackState,
      { payload: critId }: PayloadAction<string>
    ) {
      const critIndex = state.feedbackCrits.findIndex(
        (feedbackCrit) => feedbackCrit.critId === critId
      );

      if (critIndex < 0) {
        return;
      }

      state.feedbackCrits[critIndex].occurrences--;

      if (state.feedbackCrits[critIndex].occurrences === 0) {
        state.feedbackCrits.splice(critIndex, 1);
      }
    },
    reorderFeedbackCrits(
      state: FeedbackState,
      { payload }: PayloadAction<DropResult>
    ) {
      const { source, destination, draggableId: feedbackCritId } = payload;

      if (!destination) {
        return;
      }

      if (source.index === destination.index) {
        return;
      }

      const critId = feedbackCritId.replace('feedback-', '');
      const crit = state.feedbackCrits.find(
        (feedbackCrit) => feedbackCrit.critId === critId
      );

      if (!crit) {
        return;
      }

      state.feedbackCrits.splice(source.index, 1);
      state.feedbackCrits.splice(destination.index, 0, crit);
    },
  },
});

export const {
  addFeedbackCrit,
  removeFeedbackCrit,
  reorderFeedbackCrits,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
