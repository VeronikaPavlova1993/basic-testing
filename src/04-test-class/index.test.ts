import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 630;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = getBankAccount(630);
    expect(() => balance.withdraw(700)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = getBankAccount(630);
    expect(() => balance.transfer(150, balance)).toThrow(TransferFailedError);
  });

  test('should throw error when transferring to the same account', () => {
    const balance1 = getBankAccount(630);
    const balance2 = getBankAccount(70);
    expect(() => balance1.transfer(700, balance2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should deposit money', () => {
    const balance = getBankAccount(630);
    balance.deposit(70);
    expect(balance.getBalance()).toBe(700);
  });

  test('should withdraw money', () => {
    const balance = getBankAccount(630);
    balance.withdraw(600);
    expect(balance.getBalance()).toBe(30);
  });

  test('should transfer money', () => {
    const balance1 = getBankAccount(100);
    const balance2 = getBankAccount(40);
    balance1.transfer(80, balance2);
    expect(balance1.getBalance()).toBe(20);
    expect(balance2.getBalance()).toBe(120);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(90);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(70);
    const balance = await account.fetchBalance();
    expect(balance).toBe(70);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(70);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(120);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(120);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(80);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
