/* global d3 */
import { remove } from 'lodash';
import { graphScroll } from '../graph-scroll';

/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.chartRev = function init(options) {
  function createChart(el) {
    // dom elements
    const $chart = d3.select(el);
    let $svg = null;
    let $axis = null;
    let $vis = null;
    let $container = d3.select('.container-2 #graph')

    // data
    let data = $chart.datum();

    let shares_default = {"track1":{"artist":0.5,
                          "distr_label":0.5}
              };

    let streams_default = {"track1":600000,
                    "other_tracks":2000000,
                };

    const total_streams_maxv = 10000000000;
    const track_streams_maxv = 5000000000;

    let dsp_revenue_default = 70;
    let dsp_share_default = 100;
    let artist_shareOfStreams_default = 30;
    let artist_share_default = 0.7;

    var shares = shares_default;
    var streams = streams_default;
    var total_other_streams;
    var track_streams;
    var dsp_revenue = dsp_revenue_default;  
    var dsp_share = dsp_share_default;
    var artist_shareOfStreams = 0;
    var artist_share = artist_share_default;
    var revshare_drawn = false;
    var revshare_x_ticks_drawn = false;
    var revshare_x_label_drawn = false;
    let transition_duration = 1000;

    let data_revshare = {
      "other_tracks":
          {"label":"other_tracks",
          "share_of_streams":55,
          "dsp_revenue":dsp_revenue_default,
          "annotation":"Other Tracks",
          "color":"#ffffff",
          "color_highlight":'#363636',
          "opacity":0.4,
          "opacity_highlight":0.3},
      "artist_share":
          {"label":"artist_share",
          "share_of_streams":45,
          "share":0.8,
          "dsp_revenue":dsp_revenue_default,
          "annotation":"Artist",
          "color":"#00ba0e",
          "color_highlight":'#6bff53',
          "opacity":0.8,
          "opacity_highlight":0.4},
      "dist_share":
          {"label":"distributor_share",
          "share_of_streams":45,
          "share":0.2,
          "dsp_revenue":dsp_revenue_default,
          "annotation":"Dist/Label",
          "color":"#3683ff",
          "color_highlight":'#6bff53',
          "opacity":0.8,
          "opacity_highlight":0.4},
      "dsp_share":
          {"label":"dsp_share",
          "share_of_streams":100,
          "dsp_revenue":dsp_revenue_default,
          "annotation":"DSP",
          "color":"#d70000",
          "color_highlight":'#d70000',
          "opacity":0.8,
          "opacity_highlight":0.4}
    }

    let revshare_rendering_options = {
      "y_axis":false,
      "y_axis_ticks":false,
      "x_axis_ticks":false,
      "x_axis_label":false,
      "annotations":false,
      "legend_other_tracks":false,
      "legend_artist":false,
      "legend_dist":false
    }

   //console.log(data_revshare)

    // dimensions
    let width = 0;
    let height = 0;
    const MARGIN_TOP = 40;
    const MARGIN_BOTTOM = 40;
    const MARGIN_LEFT = 40;
    const MARGIN_RIGHT = 40;
    let widthContainer = 0;
    let heightContainer = 0;

    // scales
    let scaleX = null;
    let scaleY = null;

    let axisX;
    let axisY;

    let dollarWidth;
    let dollarNum = 20;
    let dollarData = [];

    let $dollars;
    let $dollarImages;
    let $DSPShareRect;
    let $otherTracksRect;
    let $distTracksRect;
    let $artistTracksRect;

    const revshare_scale_ends = {x_min:0, x_max:100, y_min:0, y_max:100};
    const rect_total_users_max = 400;
    const rect_arpu_max = 5;

    // helper functions
    function drawDollars(N) {

      var i;
      var j;
      for (i=0; i<N;  i++){
        for (j=N; j>0;  j--){
          var idx = i+j*N;

      $dollarImages = $dollars
            .append("image")
            .attr('xlink:href', './assets/images/money_nofill.png')
            .attr("id","dollar_"+idx)
            .attr("class", "dollar-imgs")
            .attr("data-i", i)
            .attr("data-j", j)
        }
      }
    }

    function updateData() {
      data_revshare.dsp_share.dsp_revenue = dsp_share;
  
      data_revshare.other_tracks.dsp_revenue = dsp_revenue;
      data_revshare.other_tracks.share_of_streams = 100 - artist_shareOfStreams;
  
      data_revshare.artist_share.dsp_revenue = dsp_revenue;
      data_revshare.artist_share.share_of_streams = artist_shareOfStreams;
      data_revshare.artist_share.share = artist_share;
  
      data_revshare.dist_share.dsp_revenue = dsp_revenue;
      data_revshare.dist_share.share_of_streams = artist_shareOfStreams;
      data_revshare.dist_share.share = 1 - artist_share;
    }

    function updateChart(i) {
      console.log(i)
      switch(i) {
        case 0:
          $otherTracksRect.transition().duration(transition_duration)
            .attr("height", 0)
            .attr("y", height + MARGIN_TOP + MARGIN_BOTTOM)
        break;
      case 1:
        $otherTracksRect.transition().duration(transition_duration)
            .attr("height", height - dollarWidth/2)
            .attr("y", dollarWidth)
        
        $DSPShareRect.transition().duration(transition_duration)
            .attr("height", 0)
        break;
      case 2:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $DSPShareRect.transition().duration(transition_duration)
          .attr("height", height*0.3)
        break;
      case 3:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $DSPShareRect.transition().duration(transition_duration)
          .attr("height", 0)
        break;
      case 4:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("height", height - dollarWidth/2)
          .attr("y", dollarWidth)
        break;
      case 5:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)
        
        $artistTracksRect.transition().duration(transition_duration)
          .attr("width", 0)
        break;
      case 6:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $artistTracksRect.transition().duration(transition_duration)
          .attr("width", dollarWidth)
          .attr("x", width - dollarWidth)
          break;
      case 7:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $artistTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.5)
          .attr("x", width*0.5)
        break;
      case 8:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $artistTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.3)
          .attr("x", width*0.7)
        break;
      case 9:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $artistTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.3)
          .attr("x", width*0.7)
        break;
      case 10:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $artistTracksRect.transition().duration(transition_duration)
          .attr("width", dollarWidth)
          .attr("x", width - dollarWidth)
        break;
      case 11:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $artistTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.3)
          .attr("x", width*0.7)
        
        $distTracksRect.transition().duration(transition_duration)
          .attr("width", 0)
        break;
      case 12:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $distTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.3)
          .attr("x", width*0.7)
        break;
      case 13:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $distTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.3)
          .attr("x", width*0.7)
          .attr("y", height*0.8 + dollarWidth/2)
          .attr("height", height*0.2)
        break;
      case 14:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $distTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.3)
          .attr("x", width*0.7)
          .attr("y", height*0.5 + dollarWidth/2)
          .attr("height", height*0.5)
        break;
      case 15:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)

        $distTracksRect.transition().duration(transition_duration)
          .attr("width", width*0.3)
          .attr("x", width*0.7)
          .attr("y", height - dollarWidth/2)
          .attr("height", dollarWidth)
        break;
      case 16:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)
        break;
      case 17:
        $otherTracksRect.transition().duration(transition_duration)
          .attr("y", height*0.3 + dollarWidth)
          .attr("height", height*0.7 - dollarWidth/2)
        break;
      case 18:
        $otherTracksRect.transition().duration(transition_duration)
            .attr("height", height - dollarWidth/2)
            .attr("y", dollarWidth)
        
        $artistTracksRect.transition().duration(transition_duration)
            .attr("width", dollarWidth/2)
            .attr("x", width - dollarWidth/2)
            .attr("y", dollarWidth)
            .attr("height", height - dollarWidth/2)
        
        $distTracksRect.transition().duration(transition_duration)
            .attr("width", dollarWidth/2)
            .attr("x", width - dollarWidth/2)
            .attr("y", height*0.7 + dollarWidth)
            .attr("height", height*0.3 - dollarWidth/2)
        break;
      }
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

        let gs2 = graphScroll()
            .container(d3.select('.container-2'))
            .graph(d3.selectAll('container-2 #graph'))
            .eventId('uniqueId2')  // namespace for scroll and resize events
            .sections(d3.selectAll('.container-2 #sections > div'))
            .offset(100)
            .on('active', function(i){
                updateChart(i)


            });
      },
      // on resize, update new dimensions
      resize() {

        let strokeWidth = 10;

        // defaults to grabbing dimensions from container element
        width = $chart.node().offsetWidth - MARGIN_LEFT - MARGIN_RIGHT - strokeWidth;
        height = $chart.node().offsetWidth - MARGIN_TOP - MARGIN_BOTTOM;

        //container widths
        widthContainer = $container.node().offsetWidth - strokeWidth;
        heightContainer = $container.node().offsetWidth - strokeWidth;

        $container.style('height', heightContainer)

        $svg
          .attr('width', width + MARGIN_LEFT + MARGIN_RIGHT)
          .attr('height', height + MARGIN_TOP + MARGIN_BOTTOM);

        scaleX = d3.scaleLinear()
          .domain([0, rect_total_users_max])
          .range([0, width]);
        
        scaleY = d3.scaleLinear()
          .domain([0, rect_arpu_max])
          .range([-height, 0]);

        axisX
          .attr('transform', `translate(${0}, ${width})`)
          .call(d3.axisBottom(scaleX)
          .tickSize(-height)
          .tickPadding(10))
          .style("opacity", 0);
      
        axisY
            .attr('transform', `translate(${0}, ${width})`)
            .call(d3.axisLeft(scaleY)
            .tickSize(-width)
            .tickPadding(10))
            .style("opacity", 0);
        
        $DSPShareRect
            .attr("x", revshare_scale_ends.x_min )
            .attr("y", revshare_scale_ends.y_min + dollarWidth )
            .attr("width", width)
            .attr("height", 0) //Needs to be y_axis_range - coordinate because vertical coordinates go from top to bottom
        
        $otherTracksRect
            .attr("x", revshare_scale_ends.x_min )
            .attr("y", revshare_scale_ends.y_min + dollarWidth )
            .attr("width", width )
            .attr("height", height - dollarWidth/2) //Needs to be y_axis_range - coordinate because vertical coordinates go from top to bottom
        
        $distTracksRect
            .attr("x", width - dollarWidth)
            .attr("y", height*0.8 + dollarWidth/2)
            .attr("width", 0)
            .attr("height", height*0.2)

        $artistTracksRect
            .attr("x", width - dollarWidth)
            .attr("y", height*0.3 + dollarWidth)
            .attr("width", 0)
            .attr("height", height*0.7 - dollarWidth/2)
  
        dollarWidth = width/dollarNum;
        
        $dollarImages = d3.selectAll('.dollar-imgs')
          .each(function(d, i) {
            d3.select(this)
              .attr("width", dollarWidth)
              .attr("height", dollarWidth)
              .attr("x", function(d) {
                let elementX = d3.select(this).attr('data-i') * dollarWidth;
                return elementX;
              })
              .attr("y", function(d) {
                let elementY = d3.select(this).attr('data-j') * dollarWidth;
                return elementY;
              })
          })

        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);

        $axis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);

        axisX = $axis.append("g")
        axisY = $axis.append("g")

        $otherTracksRect = $vis.append("rect").attr("id", data_revshare.other_tracks.label)
        $DSPShareRect = $vis.append("rect").attr("id", data_revshare.dsp_share.label)
        $artistTracksRect = $vis.append("rect").attr("id", "artist_share")
        $distTracksRect = $vis.append("rect").attr("id", "distributor_share")
        
        $dollars = $vis.append("g").attr("class","dollars");

        drawDollars(dollarNum);

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
