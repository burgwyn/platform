var drawChart;

Template.chartLayout.rendered = function () {

  // TODO: dynamic input data
  var input = {
    index : "api-umbrella-logs-v1-2015-07",
    type  : "log",
    limit : 30000,
    query : {
      match_all: {}
    }
  };

  drawChart(input);
};

Template.chartLayout.created = function () {

  drawChart = function (input) {

    Meteor.call("getChartData", input, function (err, data) {
      if (err) {

        console.log(err)

      } else {

        var items = data.hits.hits;

        var index = new crossfilter(items);

        var dateFormat = d3.time.format("%Y-%m-%d-%H");

        items.forEach(function (d) {

          var stamp = moment(d._source.request_at);
          stamp = stamp.format("YYYY-MM-DD-HH");
          d.ymd = dateFormat.parse(stamp);

        });

        var dimension = index.dimension(function(d){ return d.ymd; });

        var group = dimension.group();

        var minDate = d3.min(items, function(d) { return d.ymd; });
        var maxDate = d3.max(items, function(d) { return d.ymd; });

        var timeScale = d3.time.scale().domain([minDate, maxDate]);

        var chart = dc.lineChart("#chart");
        chart
          .width(570)
          .height(480)
          .elasticX(true)
          .x(timeScale)
          .dimension(dimension)
          .group(group)
          .renderArea(true)
          .dotRadius(3)
          .renderHorizontalGridLines(true)
          .renderVerticalGridLines(true);
        chart.render();

      }
    });
  }

};

Template.chartLayout.events({
  "submit .filtering" : function(e){
    e.preventDefault();

    var month = e.target.month.value;
    var year  = e.target.year.value;

    var input = {
      index : "api-umbrella-logs-v1-"+year+"-"+month,
      type  : "log",
      limit : 1000,
      query : {
        match_all: {}
      }
    };

    drawChart(input)
  }
});

