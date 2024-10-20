import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const test = await resolveValue(false);
    expect(test).toBe(false);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'An error has occurred! Repeat laterng went wrong!';
    expect(() => throwError(msg)).toThrow(new Error(msg));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(
      new MyAwesomeError(),
    );
  });
});
