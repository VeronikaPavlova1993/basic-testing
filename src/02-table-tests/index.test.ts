import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 4, action: Action.Add, expected: 9 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 16, b: 4, action: Action.Divide, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 9, action: 'add', expected: null },
  { a: '2', b: 7, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `The mathematical operation`,
    ({ a, b, action, expected }) => {
      const outcome = simpleCalculator({ a, b, action });
      expect(outcome).toBe(expected);
    },
  );
});
