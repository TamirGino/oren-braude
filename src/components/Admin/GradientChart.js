import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const GradientChart = ({ xData, data }) => {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        if (chart) {
            chart.destroy(); // Destroy existing chart to avoid memory leaks
        }

        const ctx = document.getElementById('myChart').getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0.8, 'red'); // 0-20
      gradient.addColorStop(0.6, '#FF471A'); // 21-40
      gradient.addColorStop(0.5, 'orange'); // 41-60
      gradient.addColorStop(0.25, '#AEE228'); // 61-80
      gradient.addColorStop(0.1, 'green'); // 81-100

      Chart.register(ChartDataLabels);

        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xData,
                datasets: [{
                    // label: 'Scores',
                    data: data,
                    borderColor: gradient,
                    borderWidth: 5,
                    fill: false,
                    
                }],
            },

            options: {
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                     },
                     
                     datalabels: {
                        // backgroundColor: '#2196f3',
                        borderRadius: 10,
                        // borderColor:'black',
                        color: 'black',
                        borderColor:'black',
                        padding: 10,
                        font: {
                          weight: 'bold',
                          size:'20px',
                        },
                      }
                    }
            }
        });

        setChart(chartInstance);

        return () => {
            if (chartInstance) {
                chartInstance.destroy(); // Destroy chart instance on unmount
            }
        };
    }, [xData, data]);

    return (
        <div>
            <canvas id="myChart" width="500" height="300"></canvas>
        </div>
    );
};

export default GradientChart;
