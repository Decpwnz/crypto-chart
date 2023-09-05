import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import coinsController from '../controllers/coinsController';
import { endDateStringToUnix, startDateStringToUnix, unixTimestampToDDMMYYYY } from '../utils/unixTimestamp';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const chartOptions = {
  responsive: true,
  elements: {
    point: {
      radius: 1,
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Cryptocurrency Chart',
    },
  },
};

const DateRange = {
  StartDate: '2023-08-04',
  EndDate: '2023-08-31',
};

function CoinInfo({ coin }) {
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState(DateRange.StartDate);
  const [endDate, setEndDate] = useState(DateRange.EndDate);

  const coinDateRangeFrom = startDateStringToUnix(startDate);
  const coinDateRangeTo = endDateStringToUnix(endDate);

  const fetchMarketChart = async () => {
    const response = await coinsController.getCoinDateRange(
      coin.id,
      coinDateRangeFrom,
      coinDateRangeTo,
    )
      .then((data) => setChartData({
        labels: data.prices.map((val) => unixTimestampToDDMMYYYY(val[0])),
        datasets: [
          {
            label: 'DATA OVER TIME',
            data: data.prices.map((val) => val[1]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }));
    return response;
  };

  useEffect(() => {
    if (startDate && endDate) fetchMarketChart();
  }, [startDate, endDate]);

  return (
    <div>
      <div>
        <label htmlFor="startDate">
          Start Date:
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="startDate">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      {chartData ? <Line options={chartOptions} data={chartData} /> : null}
    </div>
  );
}

export default CoinInfo;
