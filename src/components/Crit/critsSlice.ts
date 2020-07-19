import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loremIpsum } from 'lorem-ipsum';
import { DropResult } from 'react-beautiful-dnd';

export interface Crit {
  id: string;
  text: string;
  pointValue: number;
  occurs: number;
}

interface CritsState {
  critsById: Record<string, Crit>;
  feedbackCritIds: string[];
}

const initialState: CritsState = {
  critsById: {
    'crit-1': {
      id: 'crit-1',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-2': {
      id: 'crit-2',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-3': {
      id: 'crit-3',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-4': {
      id: 'crit-4',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-5': {
      id: 'crit-5',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-6': {
      id: 'crit-6',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-7': {
      id: 'crit-7',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-8': {
      id: 'crit-8',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-9': {
      id: 'crit-9',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
    'crit-10': {
      id: 'crit-10',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
    },
  },
  feedbackCritIds: [],
};

const feedbackCritExists = (
  feedbackCritIds: string[],
  critId: string
): boolean =>
  feedbackCritIds.some((feedbackCritId) => critId === feedbackCritId);

const critsSlice = createSlice({
  name: 'crits',
  initialState,
  reducers: {
    addFeedbackCrit(
      state: CritsState,
      { payload: critId }: PayloadAction<string>
    ) {
      if (!feedbackCritExists(state.feedbackCritIds, critId)) {
        state.feedbackCritIds.push(critId);
      }

      state.critsById[critId].occurs++;
    },
    removeFeedbackCrit(
      state: CritsState,
      { payload: critId }: PayloadAction<string>
    ) {
      if (!feedbackCritExists(state.feedbackCritIds, critId)) {
        return;
      }

      state.critsById[critId].occurs--;

      if (state.critsById[critId].occurs === 0) {
        state.feedbackCritIds = state.feedbackCritIds.filter(
          (feedbackCritId) => feedbackCritId !== critId
        );
      }
    },
    reorderFeedbackCrits(
      state: CritsState,
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
      const crit = state.critsById[critId];

      if (!crit) {
        return;
      }

      state.feedbackCritIds.splice(source.index, 1);
      state.feedbackCritIds.splice(destination.index, 0, crit.id);
    },
    resetFeedbackCrits(state: CritsState) {
      state.feedbackCritIds.forEach(
        (critId) => (state.critsById[critId].occurs = 0)
      );
      state.feedbackCritIds = [];
    },
  },
});

export const {
  addFeedbackCrit,
  removeFeedbackCrit,
  reorderFeedbackCrits,
  resetFeedbackCrits,
} = critsSlice.actions;

export default critsSlice.reducer;
