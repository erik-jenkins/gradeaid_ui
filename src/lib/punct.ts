// This file contains functions that are useful for dealing with punctuation.

// defaultPunct contains what is considered punctuation by default.
export const defaultPunct = ['.', ',', ':', '!', '?'];

/**
 * Returns whether a string ends with punctuation. Punctuation list can
 * optionally be provided by the user.
 * @param str The string to check.
 * @param punctList The list of punctuation to check against.
 * @returns `true` if `str` ends in a string contained within `punctList`,
 *          `false` otherwise
 */
export const endsWithPunct = (
  str: string,
  punctList: string[] = defaultPunct
): boolean => {
  return punctList.some((punct) => str.endsWith(punct));
};

/**
 * Splits the given string into two parts. The first part is everything
 * before the punctuation, and the second part is everything after the
 * punctuation.
 * @param str The string to split.
 * @param punctList (Optional) The list of punctuation to consider.
 */
export const splitPunct = (
  str: string,
  punctList: string[] = defaultPunct
): string[] => {
  if (!endsWithPunct(str, punctList)) {
    return [str, ''];
  }

  let index = str.length - 1;
  while (punctList.includes(str.charAt(index)) && index > 0) {
    index--;
  }

  const prePunct = str.substring(0, index + 1);
  const punct = str.substring(index + 1);

  return [prePunct, punct];
};
