/* global d3 */
import { graphScroll } from '../graph-scroll';
import coinPathFunc from '../coin-path';

/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.chartRect = function init(options) {
  function createChart(el) {
    // dom elements
    const $chart = d3.select(el);
    let $svg = null;
    let $axis = null;
    let $vis = null;

    // data
    let data = $chart.datum();
    let data_rect = {
        "freemium":{
            "label":"Freemium",
            "n_users":185,
            "rev_per_user":0.33,
            "rev":"$",
            "color":"#ffffff",
            "color_highlight":'#ffffff',
            "opacity":0.9},
        "premium":{
            "label":"Premium",
            "n_users":144,
            "rev_per_user":0.33,
            "rev":"$",
            "color":"#1ed760",
            "color_highlight":'#1ed760',
            "opacity":0.9}
    };
    let data_rect_values = Object.keys(data_rect).map(function(key){  
        return data_rect[key];
    });
    let rect_rendering_options = { "y_axis":false, "rev_text":false };
    let rect_total_users_max = 400;
    let rect_arpu_max = 5;
    let rect_drawn = false;
    let rect_text_drawn = false;

    // dimensions
    let width = 0;
    let height = 0;
    const MARGIN_TOP = 20;
    const MARGIN_BOTTOM = 140;
    const MARGIN_LEFT = 80;
    const MARGIN_RIGHT = 40;

    // scales
    let scaleX = null;
    let scaleY = null;

    let axisX;
    let axisY;

    let axisXLabel;
    let axisYLabel;

    let freemiumRect;
    let premiumRect;

    // helper functions
    function rect_data_modifier(i) {
        switch(i){
            case 0:
                data_rect = 
                data_rect = {
                    "freemium":{
                        "label":"Freemium",
                        "n_users":185,
                        "rev_per_user":0.33,
                        "rev":"$",
                        "color":"#ffffff",
                        "color_highlight":'#ffffff',
                        "opacity":1},
                    "premium":{
                        "label":"Premium",
                        "n_users":144,
                        "rev_per_user":0.33,
                        "rev":"$",
                        "color":"#ffffff",
                        "color_highlight":'#1ed760',
                        "opacity":1}
                };
                rect_rendering_options = {"y_axis":false, "rev_text":false};
                rect_rendering_options.rev_text = false;
                break;
            case 1:
                data_rect.premium.rev_per_user = 4.19;
                rect_rendering_options.y_axis = true;
                rect_rendering_options.rev_text = true;
                break;
            case 2: 
                coinPathFunc.drawPath(3)
                break;
            case 3:
                rect_rendering_options.rev_text = true; 
                break;
            case 4:
                data_rect.premium.rev_per_user = 4.19;
                break;
            case 5:
                data_rect.premium.rev_per_user = 4.6;
                break;
            case 6:
                data_rect.premium.rev_per_user = 4.19;
                break;
            case 7:
                data_rect.premium.n_users = 144;
                data_rect.freemium.n_users = 185;
                break;
            case 8:
                data_rect.premium.n_users = 200;
                data_rect.freemium.n_users = 129;
                break;
            case 9:
                data_rect.premium.n_users = 200;
                data_rect.freemium.n_users = 129;
                break;
            case 10:
                data_rect.premium.n_users = 240;
                data_rect.freemium.n_users = 160;
                break;
        }
    }

    function tickScale(width) {
        if (width >= 400) { return 10 }
        else { return 5 }
    }

    const Chart = {
      // called once at start
      init() {
        $svg = $chart.append('svg').attr('class', 'pudding-chart');

        // create axis
        $axis = $svg.append('g').attr('class', 'g-axis');

        // setup viz group
        $vis = $svg.append('g').attr('class', 'g-vis');

        Chart.render();
        Chart.resize();

         let gs1 = graphScroll()
            .container(d3.select('.container-1'))
            .graph(d3.selectAll('container-1 #graph'))
            .eventId('uniqueId1')  // namespace for scroll and resize events
            .sections(d3.selectAll('.container-1 #sections > div'))
            .offset(100)
            .on('active', function(i){
                rect_data_modifier(i)
                Chart.updateRect(data_rect, rect_rendering_options);
            });
      },
      updateRect(data, rect_rendering_options) {

        premiumRect.transition()
            .duration(1000)
            .attr("x", scaleX(0) )
            .attr("y",scaleY(data.premium.rev_per_user))
            .attr("height", scaleY(rect_arpu_max-data.premium.rev_per_user))
            .attr("width", scaleX(data.premium.n_users) )
        
        freemiumRect.transition()
            .duration(1000)
            .attr("x", scaleX(data.premium.n_users) )
            .attr("y",scaleY(data.freemium.rev_per_user))
            .attr("height", scaleY(rect_arpu_max-data.freemium.rev_per_user)) //Needs to be y_axis_range - coordinate because vertical coordinates go from top to bottom
            .attr("width", scaleX(data.freemium.n_users) )
      },
      // on resize, update new dimensions
      resize() {
        let strokeWidth = 10;

        // defaults to grabbing dimensions from container element
        width = $chart.node().offsetWidth - MARGIN_LEFT - MARGIN_RIGHT - strokeWidth;
        height = $chart.node().offsetHeight - MARGIN_TOP - MARGIN_BOTTOM;
        $svg
          .attr('width', width + MARGIN_LEFT + MARGIN_RIGHT)
          .attr('height', height + MARGIN_TOP + MARGIN_BOTTOM);

        scaleX = d3.scaleLinear()
          .domain([0, rect_total_users_max])
          .range([0, width]);
        
        scaleY = d3.scaleLinear()
          .domain([0, rect_arpu_max])
          .range([height, 0]);

        axisX
            .attr('transform', `translate(${0}, ${height})`)
            .call(d3.axisBottom(scaleX)
            .tickSize(-height)
            .ticks(tickScale(width))
            .tickPadding(10));
        
        axisY
            .call(d3.axisLeft(scaleY)
            .tickSize(-width)
            .tickPadding(10));
        
        axisXLabel
            .attr("x", width/2)
            .attr("y", 50)

        axisYLabel
            .attr("y", -50)
            .attr("x", -height/2)

        freemiumRect
            .attr("x", scaleX(data_rect.premium.n_users) )
            .attr("y", scaleY(data_rect.freemium.rev_per_user))
            .attr("height", scaleY(5-data_rect.freemium.rev_per_user)) //Needs to be y_axis_range - coordinate because vertical coordinates go from top to bottom
            .attr("width", scaleX(data_rect.freemium.n_users) )
        
        premiumRect
            .attr("x", scaleX(0) )
            .attr("y",scaleY(data_rect.premium.rev_per_user))
            .attr("height", scaleY(5-data_rect.premium.rev_per_user))
            .attr("width", scaleX(data_rect.premium.n_users) )

        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);
        $axis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);
        
        axisX = $axis.append("g")
        axisY = $axis.append("g")

        axisXLabel = axisX.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .text("Number of users (Millions)");
        
        axisYLabel = axisY.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Revenue per user")

        freemiumRect = $vis.append("rect")
            .attr("id",data_rect.freemium.label)
        
        premiumRect = $vis.append("rect")
            .attr("id",data_rect.premium.label)

        return Chart;
      },
      // get / set data
      data(val) {
        if (!arguments.length) return data;
        data = val;
        $chart.datum(data);
        return Chart;
      },
    };
    Chart.init();

    return Chart;
  }

  // create charts
  const charts = this.nodes().map(createChart);
  return charts.length > 1 ? charts : charts.pop();
};
