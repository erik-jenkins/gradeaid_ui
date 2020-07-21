import moment from 'moment';
import { Crit } from '../Crit/types';

const punctuationTypes = ['.', ',', ':', '!', '?'];

/**
 * Find the index of the last consecutive punctuation mark. Punctuation marks
 * are defined as the array ['.', ',', ':', '!', '?']. "Consecutive" in this case
 * refers to ellipses at the end of the string, e.g. "hello...", which would return 5.
 * @param str
 * @returns Index of first punctuation at the end of str, or -1 if there is no
 *          punctuation at the end of the str.
 */
const findLastPunctuationIndex = (str: string): number => {
  // quit early if str doesn't end with punctuation
  if (!punctuationTypes.some((punct) => str.endsWith(punct))) {
    return -1;
  }

  for (let index = str.length - 1; index >= 0; index--) {
    const char = str.charAt(index);
    if (!punctuationTypes.includes(char)) {
      return index + 1;
    }
  }

  return -1;
};

const constructFeedbackText = (feedbackCrits: Crit[]): string => {
  let feedbackText = '';

  if (feedbackCrits.length > 0) {
    feedbackText += `[${moment().format('DD MMM YYYY, h:mm a')}] `;
  }

  feedbackText += feedbackCrits.reduce((accumulator, crit) => {
    let textToAdd = '';
    const lastPunctuationIndex = findLastPunctuationIndex(crit.text);

    if (crit.occurs > 1) {
      if (lastPunctuationIndex < 0) {
        textToAdd = `${crit.text.trim()} (${crit.occurs} times).`;
      } else if (lastPunctuationIndex >= 0) {
        const prePunctuation = crit.text
          .substring(0, lastPunctuationIndex)
          .trim();
        const punctuation = crit.text.substring(lastPunctuationIndex).trim();
        textToAdd = `${prePunctuation} (${crit.occurs} times)${punctuation}`;
      }
    } else {
      textToAdd = crit.text.trim();
    }

    if (punctuationTypes.some((punct) => accumulator.endsWith(punct))) {
      textToAdd = ` ${textToAdd}`;
    }

    return accumulator + textToAdd;
  }, '');

  return feedbackText;
};

export { constructFeedbackText };
