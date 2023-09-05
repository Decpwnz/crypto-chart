import {
  coinDateRange, coinList, singleCoin,
} from '../api/coinDataFetcher';
import showNotification from '../utils/notification';

const coinsController = {
  getCoinList: async () => {
    try {
      const response = await coinList();
      return response;
    } catch (error) {
      showNotification('Failed to get coin list', error);
      return null;
    }
  },
  getSingleCoin: async (id) => {
    try {
      const response = await singleCoin(id);
      return response;
    } catch (error) {
      showNotification('Failed to get single coin', error);
      return null;
    }
  },
  getCoinDateRange: async (id, from, to) => {
    try {
      const response = await coinDateRange(id, from, to);
      return response;
    } catch (error) {
      showNotification('Failed to get coin date range list', error);
      return null;
    }
  },
};

export default coinsController;
