import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const testAdd = simpleCalculator({ a: 5, b: 4, action: Action.Add });
    expect(testAdd).toBe(9);
  });

  test('should subtract two numbers', () => {
    const testSubtract = simpleCalculator({
      a: 8,
      b: 3,
      action: Action.Subtract,
    });
    expect(testSubtract).toBe(5);
  });

  test('should multiply two numbers', () => {
    const testMultiply = simpleCalculator({
      a: 5,
      b: 5,
      action: Action.Multiply,
    });
    expect(testMultiply).toBe(25);
  });

  test('should divide two numbers', () => {
    const testDivide = simpleCalculator({ a: 16, b: 4, action: Action.Divide });
    expect(testDivide).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const testExp = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(testExp).toBe(8);
  });

  test('should return null for invalid action', () => {
    const testInvalidAction = simpleCalculator({ a: 5, b: 9, action: 'add' });
    expect(testInvalidAction).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const testInvalidArg = simpleCalculator({
      a: '2',
      b: 7,
      action: Action.Divide,
    });
    expect(testInvalidArg).toBeNull();
  });
});
