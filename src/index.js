import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import LandingText from "./components/landing-text";
import DropZone from "./components/dropzone";
import { Provider } from "unistore/react";
import { store } from "./functions/store";
import DropMessage from "./components/drop-message";
import ChartFriends from "./components/chart-friends";
import ChartMessages from "./components/chart-messages";
import ChartReactions from "./components/chart-reactions";
import NoData from "./components/no-data";

import Chart from "chart.js";
Chart.defaults.global.defaultFontColor = "#AAA";
// Chart.defaults.global.title = { display: true };  // Title kills everything :(

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <LandingText>
            <div className="row justify-content-center">
              <div className="col-12 col-md-10">
                <DropZone>
                  <DropMessage />
                  <ChartFriends />
                  <ChartMessages />
                  <ChartReactions />
                  <NoData />
                </DropZone>
              </div>
            </div>
          </LandingText>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
