import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loremIpsum } from 'lorem-ipsum';
import { DropResult } from 'react-beautiful-dnd';
import { createCrit } from '../../app/actions/createCrit';
import { deleteCrit } from '../../app/actions/deleteCrit';
import { Crit } from './types';

interface CritsState {
  critsById: Record<string, Crit>;
  feedbackCritIds: string[];
  allIds: string[];
}

const exampleComment = `${loremIpsum({ count: 1, units: 'paragraph' })}

Use the form $kx + \\omega t$ to blah blah blah...

Example link: [Google](https://google.com/)

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

\`\`\`
console.log('hello!')
\`\`\`

$$ax^2 + bx + c$$
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

![random image](https://picsum.photos/200)
`;

const initialState: CritsState = {
  critsById: {
    'crit-1': {
      id: 'crit-1',
      text: exampleComment,
      pointValue: 1,
      occurs: 0,
      isComment: true,
    },
    'crit-2': {
      id: 'crit-2',
      text: 'This is a question?',
      pointValue: 5,
      occurs: 0,
      isComment: false,
    },
    'crit-3': {
      id: 'crit-3',
      text: "I'm upset about something!!!",
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
    'crit-4': {
      id: 'crit-4',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
    'crit-5': {
      id: 'crit-5',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
    'crit-6': {
      id: 'crit-6',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
    'crit-7': {
      id: 'crit-7',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
    'crit-8': {
      id: 'crit-8',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
    'crit-9': {
      id: 'crit-9',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
    'crit-10': {
      id: 'crit-10',
      text: loremIpsum(),
      pointValue: 1,
      occurs: 0,
      isComment: false,
    },
  },
  allIds: [
    'crit-1',
    'crit-2',
    'crit-3',
    'crit-4',
    'crit-5',
    'crit-6',
    'crit-7',
    'crit-8',
    'crit-9',
    'crit-10',
  ],
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
    setCrit(state: CritsState, { payload: crit }: PayloadAction<Crit>) {
      const { id } = crit;
      state.critsById[id] = crit;
    },
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
  extraReducers: (builder) => {
    builder
      .addCase(createCrit.fulfilled, (state: CritsState, { payload }) => {
        const { newCrit } = payload;
        state.critsById[newCrit.id] = newCrit;
        state.allIds.push(newCrit.id);
      })
      .addCase(deleteCrit.fulfilled, (state: CritsState, { payload }) => {
        const { deletedCritId } = payload;
        delete state.critsById[deletedCritId];
        state.feedbackCritIds = state.feedbackCritIds.filter(
          (id) => id !== deletedCritId
        );
        state.allIds = state.allIds.filter((id) => id !== deletedCritId);
      });
  },
});

export const {
  setCrit,
  addFeedbackCrit,
  removeFeedbackCrit,
  reorderFeedbackCrits,
  resetFeedbackCrits,
} = critsSlice.actions;

export default critsSlice.reducer;
