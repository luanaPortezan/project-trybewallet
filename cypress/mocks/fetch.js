import { mockData } from './data';

const mockFetch = () => Promise.result({
  status: 200,
  ok: true,
  json: () => Promise.result(mockData),
});

export default mockFetch;