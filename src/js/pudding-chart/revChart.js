/* global d3 */
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

    // data
    let data = $chart.datum();

    let dsp_revenue_default = 70;
    let dsp_share_default = 100;
    let artist_shareOfStreams_default = 30;
    let artist_share_default = 0.7;

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

   console.log(data_revshare)

    // dimensions
    let width = 0;
    let height = 0;
    const MARGIN_TOP = 40;
    const MARGIN_BOTTOM = 40;
    const MARGIN_LEFT = 40;
    const MARGIN_RIGHT = 40;

    // scales
    let scaleX = null;
    let scaleY = null;

    let axisX;
    let axisY;

    let $dollars;
    let $DSPShareRect;
    let $otherTracksRect;
    let $distTracksRect;
    let $artistTracksRect;

    const revshare_scale_ends = {x_min:0, x_max:100, y_min:0, y_max:100};
    const rect_total_users_max = 400;
    const rect_arpu_max = 5;

    // helper functions
    function drawDollars(N) {
      $dollars = $vis.append("g")
        .attr("class","dollars");

      var i;
      var j;
      for (i=0; i<N;  i++){
        for (j=N; j>0;  j--){
          var idx = i+j*N;
          $dollars
            .append("image")
            .attr('xlink:href', './assets/images/money_nofill.png')
            .attr("x", scaleX(i*revshare_scale_ends.x_max/N))
            .attr("y", scaleY(j*revshare_scale_ends.x_max/N))
            .attr("width", scaleX(revshare_scale_ends.x_max/N)+1)
            .attr("height", scaleX(revshare_scale_ends.x_max/N)+1) 
            .attr("id","dollar_"+idx)
        }
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
        drawDollars(20);

        let gs2 = graphScroll()
            .container(d3.select('.container-2'))
            .graph(d3.selectAll('container-2 #graph'))
            .eventId('uniqueId2')  // namespace for scroll and resize events
            .sections(d3.selectAll('.container-2 #sections > div'))
            .offset(100)
            .on('active', function(i){
                //console.log('graph 2 change', i)
            });
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
          .range([-height, 0]);

        axisX
          .attr('transform', `translate(${0}, ${height})`)
          .call(d3.axisBottom(scaleX)
          .tickSize(-height)
          .tickPadding(10))
          .style("opacity", 0);
      
        axisY
            .call(d3.axisLeft(scaleY)
            .tickSize(-width)
            .tickPadding(10))
            .style("opacity", 0);
        
        console.log(scaleY(data_revshare.dsp_share.dsp_revenue))
        
        $DSPShareRect
            .attr("x", scaleX(revshare_scale_ends.x_min) )
            .attr("y",scaleY(revshare_scale_ends.y_max))
            .attr("width", scaleX(data_revshare.dsp_share.share_of_streams) )
            .attr("height", scaleY(data_revshare.dsp_share.dsp_revenue)) //Needs to be y_axis_range - coordinate because vertical coordinates go from top to bottom
        
        $otherTracksRect
            .attr("x", scaleX(revshare_scale_ends.x_min) )
            .attr("y",scaleY(data_revshare.other_tracks.dsp_revenue))
            .attr("width", scaleX(data_revshare.other_tracks.share_of_streams) )
            .attr("height", scaleY(revshare_scale_ends.y_max-data_revshare.other_tracks.dsp_revenue)) //Needs to be y_axis_range - coordinate because vertical coordinates go from top to bottom
        
        $distTracksRect
            .attr("x", scaleX(data_revshare.other_tracks.share_of_streams) )
            .attr("y", scaleY(data_revshare.dist_share.dsp_revenue * (1 - data_revshare.artist_share.share)))
            .attr("width", scaleX(data_revshare.dist_share.share_of_streams) )
            .attr("height", scaleY(revshare_scale_ends.y_max-data_revshare.dist_share.dsp_revenue*data_revshare.dist_share.share))

        $artistTracksRect
            .attr("x", scaleX(data_revshare.other_tracks.share_of_streams) )
            .attr("y",scaleY(data_revshare.artist_share.dsp_revenue))
            .attr("width", scaleX(data_revshare.artist_share.share_of_streams) )
            .attr("height", scaleY(revshare_scale_ends.y_max-data_revshare.artist_share.dsp_revenue*data_revshare.artist_share.share))

        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);

        axisX = $axis.append("g")
        axisY = $axis.append("g")

        $DSPShareRect = $vis.append("rect").attr("id", data_revshare.dsp_share.label)
        $otherTracksRect = $vis.append("rect").attr("id", data_revshare.other_tracks.label)
        $distTracksRect = $vis.append("rect").attr("id", "distributor_share")
        $artistTracksRect = $vis.append("rect").attr("id", "artist_share")


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
