/* global d3 */
import { graphScroll } from '../graph-scroll';
import coinPathFunc from '../coin-path';
import enterView from 'enter-view';

/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.chartUser = function init(options) {
  function createChart(el) {
    // dom elements
    const $chart = d3.select(el);
    let $svg = null;
    let $axis = null;
    let $vis = null;

    // data
    let data = $chart.datum();

    // dimensions
    let width = 0;
    let height = 0;
    const MARGIN_TOP = 0;
    const MARGIN_BOTTOM = 0;
    const MARGIN_LEFT = 0;
    const MARGIN_RIGHT = 0;

    // scales
    const scaleX = null;
    const scaleY = null;

    let dollarWidth;
    let dollarNum = 10;

    // svg components
    let $users;
    let $userImages;

    let $dollars;
    let $dollarImages;
    let text_users;
    let text_money;

    // helper functions
    function drawDollars(N) {

        var i;
        var j;
        for (i=0; i<N;  i++){
          for (j=N; j>0;  j--){
            var idx = i+j*N;
  
        $userImages = $users
            .append("image")
            .attr('xlink:href', './assets/images/user_neon.png')
            .attr("id","user_"+idx)
            .attr("class", "user-imgs")
            .attr("data-i", i)
            .attr("data-j", j)

        $dollarImages = $dollars
            .append("image")
            .attr('xlink:href', './assets/images/money_neon.png')
            .attr("id","dollar_"+idx)
            .attr("class", "money-imgs")
            .attr("data-i", i)
            .attr("data-j", j)
            .style("opacity", 0)
      }
        
        }
    }

    function updateChart(i) {
        switch(i) {
            case 0:
                $users
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${width/4 + dollarWidth}, ${height/4 - dollarWidth*3})`)
                $dollars
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${width/4 + dollarWidth}, ${height/4 - dollarWidth*3})`)

                $dollarImages
                    .transition()
                    .duration(1000)
                    .style('opacity', 0)
                    .attr('xlink:href', './assets/images/money_neon.png')
                    
                d3.selectAll('.user-imgs')
                        .transition()
                        .delay(function(d,i){ return 50*i; }) 
                        .duration(1000)
                        .attr('xlink:href', './assets/images/user_neon.png')
                
                text_users
                    .transition()
                    .duration(1000)
                    .attr('x',width/2)
                    .attr('y',height - 200);
                    
                text_money
                    .transition()
                    .duration(1000)
                    .attr('x',width/2)
                    .attr('y',height - 200)
                    .style('opacity', 0);
            
                break;
            case 1:
                $users
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${width/4 + dollarWidth}, ${height/4 - dollarWidth*3})`)
                $dollars
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${width/4 + dollarWidth}, ${height/4 - dollarWidth*3})`)
                
                $dollarImages
                    .transition()
                    .duration(1000)
                    .style('opacity', 0)
                    .attr('xlink:href', './assets/images/money_neon.png')
                    
                d3.selectAll('.user-imgs')
                        .transition()
                        .delay(function(d,i){ return 50*i; }) 
                        .duration(1000)
                        .attr('xlink:href', function(d, i) {
                            if (i < 45) { return './assets/images/user_neon_green.png'}
                            else { return './assets/images/user_neon.png'}
                        })

                text_users
                    .transition()
                    .duration(1000)    
                    .attr('x',width/2)
                    .attr('y',height - 200);
                    
                text_money
                    .transition()
                    .duration(1000)
                    .attr('x',width/2)
                    .attr('y',height - 200)
                    .style('opacity', 0);
                        
                break;
            case 2:
                $users
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${dollarWidth}, ${height/4 - dollarWidth*3})`)
                $dollars
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${width - dollarWidth*11}, ${height/4 - dollarWidth*3})`)
                
                $dollarImages
                    .transition()
                    .delay(function(d,i){ return 25*i; }) 
                    .duration(1000)
                    .style('opacity', 1)
                    .attr('xlink:href', './assets/images/money_neon.png')
                
                text_users
                    .transition()
                    .duration(1000)    
                    .attr('x',dollarWidth*6)
                    .attr('y',height - 200);
                    
                text_money
                    .transition()
                    .duration(1000)
                    .attr('x',width - dollarWidth*6)
                    .attr('y',height - 200)
                    .style('opacity', 1)
                break;
            case 3:
                $users
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${dollarWidth}, ${height/4 - dollarWidth*3})`)
                $dollars
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(${width - dollarWidth*11}, ${height/4 - dollarWidth*3})`)

                d3.selectAll('.money-imgs')
                        .transition()
                        .delay(function(d,i){ return 50*i; }) 
                        .duration(1000)
                        .style('opacity', 1)
                        .attr('xlink:href', function(d, i) {
                            if (i < 10) { return './assets/images/money_neon_green.png'}
                            else { return './assets/images/money_neon.png'}
                        })
                break;
            case 4:
                coinPathFunc.drawPath(3);
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

        enterView({
          selector: '#triggerDiv2',
          offset: 0.4,
          enter: function(el) {
            d3.selectAll("#coinGroup2, #coinImgG2").transition()
              .delay(200)
              .duration(500)
              .style("opacity", 0)
          },
          exit: function(el) {
            d3.selectAll("#coinGroup2, #coinImgG2").transition()
              .delay(200)
              .duration(500)
              .style("opacity", 1)
          }
        })

        enterView({
          selector: '#lastDiv2',
          offset: 1,
          enter: function(el) {
            d3.selectAll("#coinGroup3, #coinImgG3").transition()
              .delay(200)
              .duration(500)
              .style("opacity", 1)
          },
          exit: function(el) {
            d3.selectAll("#coinGroup3, #coinImgG3").transition()
              .delay(200)
              .duration(500)
              .style("opacity", 0)
          }
        })

        let gs1 = graphScroll()
            .container(d3.select('.container-1'))
            .graph(d3.selectAll('container-1 #graph'))
            .eventId('uniqueId1')  // namespace for scroll and resize events
            .sections(d3.selectAll('.container-1 #sections > div'))
            .offset(100)
            .on('active', function(i){
                console.log(i)
                updateChart(i);
            });
      },
      // on resize, update new dimensions
      resize() {
        // defaults to grabbing dimensions from container element
        let strokeWidth = 10;

        width = $chart.node().offsetWidth - MARGIN_LEFT - MARGIN_RIGHT - strokeWidth;
        height = $chart.node().offsetWidth - 50;
        dollarWidth = width/dollarNum/2.5;
        console.log(width, height)

        $svg
          .attr('width', width + MARGIN_LEFT + MARGIN_RIGHT)
          .attr('height', height + MARGIN_TOP + MARGIN_BOTTOM);

        $users.attr('transform', `translate(${width/4 + dollarWidth}, ${height/4 - dollarWidth*3})`)
        $dollars.attr('transform', `translate(${width/4 + dollarWidth}, ${height/4 - dollarWidth*3})`)

        $dollarImages = d3.selectAll('.money-imgs')
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

        $userImages = d3.selectAll('.user-imgs')
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

        text_users
          .attr('x',width/2)
          .attr('y',height - 200);
        
        text_money
          .attr('x',width/2)
          .attr('y',height - 200);

        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);

        $users = $vis.append("g").attr("class","users");
        $dollars = $vis.append("g").attr("class","dollars");

        drawDollars(dollarNum);

        text_users = $vis.append('text')
          .text("Users")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"user_text");
        
        text_money = $vis.append('text')
          .text("Revenue")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"revenue_text")
          .style("opacity", 0);

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
