import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loremIpsum } from 'lorem-ipsum';
import { DropResult } from 'react-beautiful-dnd';

export interface Crit {
  id: string;
  text: string;
  pointValue: number;
  occurs: number;
  isComment: boolean;
}

interface CritsState {
  critsById: Record<string, Crit>;
  feedbackCritIds: string[];
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
      pointValue: 1,
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
});

export const {
  setCrit,
  addFeedbackCrit,
  removeFeedbackCrit,
  reorderFeedbackCrits,
  resetFeedbackCrits,
} = critsSlice.actions;

export default critsSlice.reducer;
