export const fitLegend = {
  beforeInit: function(chart, options) {
    chart.legend.afterFit = function() {
      this.height = this.height + 15;
    };
  }
};
