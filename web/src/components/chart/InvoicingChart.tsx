import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface InvoicingChartProps {
    columns: string[],
    values: number[],
}

export default function InvoicingChart(props : InvoicingChartProps) {

    const labels = props.columns;

    const options = {
      resposive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };

    const data = {
        labels,
        datasets: [
          {
            label: 'Faturamento em Reais (R$) ',
            data: props.values,
            backgroundColor: '#1F78B4',
          },
        ],
      };

    return (
        <Bar options={options} data={data} />
    )
}