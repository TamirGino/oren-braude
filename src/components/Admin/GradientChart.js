import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import lowLevel from '../Admin/Imgs/chartImgLow.png'
import mediumLevel from '../Admin/Imgs/chartImgLow.png'
import highLevel from '../Admin/Imgs/chartImgLow.png'


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

      Chart.register(ChartDataLabels, annotationPlugin);

       const getImage=(scoreLevel) => {
        const img = new Image();
        img.src = scoreLevel;
        return img;
      }

      
    //   const annotation1 = {
    //     type: 'box',
    //     yMin: 0,
    //     yMax: 20,
    //     backgroundColor: 'rgba(221, 29, 33, 0.3)',
    //     borderColor: 'rgba(0,0,0,0)',
                    
    //   };
    //   const annotation2 = {
    //     type: 'box',
    //     yMin: 21,
    //     yMax: 40,
    //     backgroundColor: 'rgba(251, 206, 7, 0.3)',
    //     borderColor: 'rgba(0,0,0,0)', 
    //   };

    //   const annotation3 = {
    //     type: 'point',
    //     drawTime: 'afterDraw',
    //     xValue: 1,
    //     yValue: 30,
    //     radius: 10
    //   };


      const annotation1 = {
        type: 'label',
        drawTime: 'afterDraw',
        content: getImage(lowLevel),
        xValue: 0.2,
        yValue: data[0] + 20,
        width: 130,
        height: 130,
        callout: {
            display: true,
            // position: 'left'
        }
      };

      const annotation2 = {
        type: 'label',
        drawTime: 'afterDraw',
        content: getImage(mediumLevel),
        xValue: 1,
        yValue: data[1] + 10,
        width: 130,
        height: 130,
        callout: {
            display: true,
            position: 'left'
        }
      };

      const annotation3 = {
        type: 'label',
        drawTime: 'afterDraw',
        content: getImage(highLevel),
        xValue: 1.7,
        yValue: data[2],
        width: 130,
        height: 130,
        
        callout: {
            display: true,
            position: 'left',
        }
      };

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
                        suggestedMax: 100,
                        ticks: {
                            crossAlign: "center",
                            // align:'start',
                            font: {
                                weight: 'bold',
                                color:'black',
                                // size:'10px',
                              },
                        }
                    },
                    
                    x: {
                        ticks: {
                            labelOffset:10,
                            maxRotation: 20,
                            minRotation: 20,
                            // padding:10,
                            // align:'start',
                            font: {
                                weight: 'bold',
                                color:'black',
                                // size:'10px',
                              },
                        }
                    }
                    
                },
                plugins: {
                    legend: {
                        display: false,
                     },

                     title: {
                        display: true,
                        text: 'מד גמישות מטבולית',
                        font: {
                            weight: 'bold',
                            color:'#000000',
                            style:'italic',
                            size:20,
                          },
                    },

                     annotation: {
                        annotations: {
                            annotation1,
                            annotation2,
                            annotation3
                        }
                      },
                     
                     datalabels: {
                        // backgroundColor: '#2196f3',
                        // anchor: 'start',
                        // borderRadius: 10,
                        align: 'right',
                        offset: 10,
                        opacity:0.5,
                        // borderColor:'black',
                        color: 'black',
                        // crossAlign:'center',
                        borderRadius: 10,
                        borderColor:'black',
                        padding: 10,
                        font: {
                          weight: 'bold',
                          size:'20px',
                        },
                      },


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
            <canvas id="myChart" width="600" height="400"></canvas>
        </div>
    );
};

export default GradientChart;
