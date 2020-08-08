import moment from 'moment';
import { endsWithPunct, splitPunct } from '../../lib/punct';
import { Crit } from '../Crit/types';

const constructFeedbackText = (feedbackCrits: Crit[]): string => {
  let feedbackText = '';

  if (feedbackCrits.length > 0) {
    feedbackText += `[${moment().format('DD MMM YYYY, h:mm a')}] `;
  }

  feedbackText += feedbackCrits.reduce((accumulator, crit) => {
    let textToAdd = crit.text.trim();

    if (!endsWithPunct(textToAdd)) {
      textToAdd += '.';
    }

    if (crit.occurs > 1) {
      const [prePunct, punct] = splitPunct(textToAdd);
      textToAdd = `${prePunct} (${crit.occurs} times)${punct}`;
    }

    // add a space to the beginning of the crit text if the current feedback
    // ends with punctuation.
    if (endsWithPunct(accumulator)) {
      textToAdd = ` ${textToAdd}`;
    }

    return accumulator + textToAdd;
  }, '');

  return feedbackText;
};

export { constructFeedbackText };
