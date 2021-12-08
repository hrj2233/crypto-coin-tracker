import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcvp', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'price',
              data: data?.map((price) => {
                const date = price.time_close;
                const open = price.open;
                const high = price.high;
                const low = price.low;
                const close = price.close;
                return { x: date, y: [open, high, low, close] };
              }),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            yaxis: {
              labels: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close.slice(5, 10)),
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
