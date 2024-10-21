import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
describe('throttledGetDataFromApi', () => {
  const mockedData = { data: 'test' };
  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockedData }),
    });
  });

  test('should perform request to correct provided url', async () => {
    const client = axios.create();
    await throttledGetDataFromApi('/posts/1');
    expect(client.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/posts/1');
    expect(data).toEqual(mockedData);
  });
});
