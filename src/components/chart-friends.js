import React, { Component } from "react";
import { processFriendsData } from "../functions/process-data";
import Chart from "chart.js";
import ReactChart from "./react-chart";
import { actions } from "../functions/store";
import { connect } from "unistore/react";
import Loader from "./loader";
import { chartColors } from "../functions/colors";
import { titleCase } from "../functions/title-case";
import { fitLegend } from "../functions/plugin-legend";

const canvas = document.createElement("canvas");
canvas.classList.add("chart");
const isMobile = window.matchMedia("(max-width: 767px)").matches;
const chart = new Chart(canvas, {
  type: "bar",
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    aspectRatio: isMobile ? 9/16 : 4/3,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: { color: "#ccc" },
          ticks: {
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          gridLines: { color: "#ccc" },
        }
      ]
    }
  },
  plugins: [fitLegend]
});

class ChartFriends extends Component {
  constructor() {
    super();
    this.state = {
      cumulative: false,
      format: "day",
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.zip) {
      this.props.extractFriends();
    }
  }

  componentDidUpdate() {
    if (!this.props.zip) {
      this.setState({ loading: true });
    }
    if (!this.props.friends) {
      this.props.extractFriends();
    }
    if (this.props.friends && this.state.loading) {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if (!this.props.zip || this.props.friends === false) return null;
    if (this.state.loading || !this.props.friends) {
      return <Loader />;
    }

    const data = processFriendsData(this.props.friends, this.state.format);
    chart.data.labels = data.map(d => d.label);

    chart.options.title = {
      display: true,
      fontSize: 22,
      fontColor: "black",
      padding: 12,
      text: titleCase(
        `Friends by ${this.state.format}${
          this.state.cumulative ? " (cumulative)" : ""
        }`
      )
    };

    const xLength = data.length;

    chart.data.datasets = this.state.cumulative
      ? [
          {
            label: `Friends`,
            data: data
              .map(d => d.value)
              // Create cumulative sum
              .reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []),
            type: "line",
            borderWidth: 3,
            borderColor: Chart.helpers.color(chartColors.red).rgbString(),
            backgroundColor: Chart.helpers
              .color(chartColors.red)
              .alpha(0.5)
              .rgbString()
          }
        ]
      : [
          {
            label: `Friends`,
            data: data.map(d => d.value),
            type: xLength > 50 ? "line" : "bar",
            borderWidth: 3,
            borderColor: Chart.helpers
              .color(chartColors.red)
              .lighten(0.025)
              .rgbString(),
            backgroundColor: Chart.helpers
              .color(chartColors.red)
              .alpha(0.5)
              .rgbString()
          }
        ];

    return (
      <div className="py-5">
        <ReactChart chart={chart} canvas={canvas} />
        <div className="row justify-content-center mt-5">
          <div className="custom-control pr-4 custom-radio">
            <input
              className="custom-control-input"
              onClick={e => {
                this.setState({ format: "day" });
              }}
              defaultChecked
              type="radio"
              id="FriendsByDay"
              name="FriendsPeriod"
            />
            <label className="custom-control-label" htmlFor="FriendsByDay">
              By Day
            </label>
          </div>

          <div className="custom-control pr-4 custom-radio">
            <input
              className="custom-control-input"
              onClick={e => {
                this.setState({ format: "month" });
              }}
              type="radio"
              id="FriendsByMonth"
              name="FriendsPeriod"
            />
            <label className="custom-control-label" htmlFor="FriendsByMonth">
              By Month
            </label>
          </div>

          <div className="custom-control pr-4 custom-checkbox">
            <input
              className="custom-control-input"
              onChange={e => {
                this.setState({ cumulative: e.target.checked });
              }}
              type="checkbox"
              id="FriendsCumulative"
            />
            <label className="custom-control-label" htmlFor="FriendsCumulative">
              Cumulative
            </label>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedChartFriends = connect(
  "zip, friends",
  actions
)(ChartFriends);

export default WrappedChartFriends;
