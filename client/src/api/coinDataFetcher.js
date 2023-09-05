import api from './service';

export const coinList = async () => {
  const response = await api.get('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en');
  return response.data;
};

export const singleCoin = async (id) => {
  const response = await api.get(`/coins/${id}`);
  return response.data;
};

export const coinDateRange = async (id, from, to) => {
  const response = await api.get(`/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`);
  return response.data;
};
