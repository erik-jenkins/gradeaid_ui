const assignments = {
  1: {
    id: 1,
    name: 'Exercise M1: A Battery is Driving a Motor',
    categoryIds: [1, 2],
  },
  allIds: [1],
};

const categories = {
  1: {
    id: 1,
    name: 'General Requirements',
    critIds: [1, 2, 3],
  },
  2: {
    id: 2,
    name: 'Coding Style',
    critIds: [4, 5, 6],
  },
  allIds: [1, 2],
};

const crits = {
  1: {
    id: 1,
    text:
      'Exercitation aliqua quis veniam id magna excepteur exercitation nulla enim ipsum veniam do ut.',
    pointValue: 10,
  },
  2: {
    id: 2,
    text: 'Laborum anim esse duis id aute ad deserunt ea amet officia irure.',
    pointValue: 10,
  },
  3: {
    id: 3,
    text:
      'Id ad ipsum consectetur consequat nostrud culpa aliquip occaecat amet duis.',
    pointValue: 10,
  },
  4: {
    id: 4,
    text: 'Qui officia cillum consequat aliquip.',
    pointValue: 10,
  },
  5: {
    id: 5,
    text:
      'Veniam ipsum minim elit fugiat ipsum est sint sint reprehenderit sunt.',
    pointValue: 10,
  },
  6: {
    id: 6,
    text: 'Incididunt elit id nulla fugiat ipsum aute.',
    pointValue: 10,
  },
};

export { assignments, categories, crits };
