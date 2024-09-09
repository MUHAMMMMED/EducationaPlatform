import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart_Total_profit_LiveCourses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
            colors: {
              ranges: [{
                color: '#58A58F' // Change bar color here
              }]
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + " ";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#58A58F"]
          }
        },
        xaxis: {
          categories: Object.keys(this.props.data),
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#58A58F',
                colorTo: '#58A58F',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + " $";
            }
          }
        },
        title: {
          text: 'Monthly LiveCourses Profit',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#58A58F'
          }
        }
      },
      series: [{
        name: 'Profit',
        data: Object.values(this.props.data)
      }]
    };
  }

  render() {
    return (
      <div style={{ float: 'left', width: '100%', marginTop: '10px' }}>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart_Total_profit_LiveCourses;

