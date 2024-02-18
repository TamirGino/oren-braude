import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import level_one from '../Admin/Imgs/chartImgVL.png';
import level_two from '../Admin/Imgs/‏‏chartImgL.png'
import level_three from '../Admin/Imgs/‏‏chartImgM.png'
import level_four from '../Admin/Imgs/‏‏chartImgH.png'
import level_five from '../Admin/Imgs/‏‏chartImgVH.png'
import fonts from '../Admin/fonts.module.css'



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

      const getYvalue = (score) => {
        if (score >= 0 && score <= 40) {
            return (score + 20);
        } else if (score >= 41 && score <= 80) {
            return (score + 10);
        } else if (score >= 81 && score <= 90) {
            return (score);
        } else if (score >= 91 && score <= 100) {
            return (score - 20);
        } 
      }

      const getImage = (score) => {
        let imageName;
    
        if (score >= 0 && score <= 20) {
            imageName = level_one;
        } else if (score >= 21 && score <= 40) {
            imageName = level_two;
        } else if (score >= 41 && score <= 60) {
            imageName = level_three;
        } else if (score >= 61 && score <= 80) {
            imageName = level_four;
        } else if (score >= 81 && score <= 100) {
            imageName = level_five;
        } else {
            // Handle scores outside the specified range, if needed
            console.error('Score out of range');
            return null;
        }
    
        const img = new Image();
        img.src = imageName;
        return img;
    };

      
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
        content: getImage(data[0]),
        xValue: 0.2,
        yValue: getYvalue(data[0]),
        width: 130,
        height: 130,
        callout: {
            display: true,
            // position: 'left' 0-40 +20  ----- 41-80 +10 ------ 81-100 +0
        }
      };

      const annotation2 = {
        type: 'label',
        drawTime: 'afterDraw',
        content: getImage(data[1]),
        xValue: 1,
        yValue: getYvalue(data[1]),
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
        content: getImage(data[2]),
        xValue: 1.8,
        yValue: getYvalue(data[2]),
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
                        //  anchor: 'center',
                        // backgroundColor: '#2196f3',
                        // borderRadius: 20,
                        // borderColor:'black',
                        // crossAlign:'start',
                        // borderRadius: 20,
                        // borderColor:'pink',
                        
                        color: 'black',
                        align: 'right',
                        offset: 60,
                        opacity:0.8,
                        padding: 0,
                        font: {
                          weight: 'bold',
                          size:'20px',
                          style:'italic',
                          family:'Cookie',
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
