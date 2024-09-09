import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart_Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: 'bar',
        },
        xaxis: {
          categories: Object.keys(props.data),
        },
        plotOptions: {
          bar: {
            horizontal: true,
            colors: {
              ranges: [{
                color: '#58A58F' // Change bar color here
              }]
            }
          }
        },
      }
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const seriesData = Object.values(data);
    this.setState({ series: [{ data: seriesData }] });
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart_Location;
