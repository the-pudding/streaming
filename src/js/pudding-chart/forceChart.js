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

d3.selection.prototype.chartForce = function init(options) {
  function createChart(el) {
    // dom elements
    const $chart = d3.select(el);
    let $svg = null;
    let $axis = null;
    let $vis = null;
    let $circleGroup = null;
    let $circles = null;
    let text_premium;
    let text_freemium;
    let text_premium_num;
    let text_freemium_num;

    // data
    let data = $chart.datum();
    data = d3.range(1, 101)
    let currStep;

    function setCategory(d) {
      if (d > 45) { return "freemium" }
      else { return "premium" }
    }

    data = data.map((d) => {
      return {
        count: d,
        x: d,
        y: d,
        category: setCategory(d)
      }
    })

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
    let simulation = null;
    let radius = null;
    let forceX = null;
    let forceCollide = null;

    // helper functions
    function ticked() {
      $circles
        .attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y })
    }

    const Chart = {
      // called once at start
      init() {
        $svg = $chart.append('svg').attr('class', 'pudding-chart');

        // create axis
        $axis = $svg.append('g').attr('class', 'g-axis');

        // setup viz group
        $vis = $svg.append('g').attr('class', 'g-vis');

        $circleGroup = $vis.append('g').attr('class', 'g-vis');

        Chart.render();
        Chart.resize();

        enterView({
          selector: '#triggerDiv2',
          offset: 0,
          enter: function(el) {
            d3.selectAll("#coinPath-Container").transition()
              .delay(200)
              .duration(500)
              .style("opacity", 0)
          },
          exit: function(el) {
            d3.selectAll("#coinPath-Container").transition()
              .delay(200)
              .duration(500)
              .style("opacity", 1)
          }
        })

        let gs1 = graphScroll()
            .container(d3.select('.container-1'))
            .graph(d3.selectAll('container-1 #graph'))
            .eventId('uniqueId1')  // namespace for scroll and resize events
            .sections(d3.selectAll('.container-1 #sections > div'))
            .offset(100)
            .on('active', function(i){
                currStep = i;
                Chart.updateChart(i);
            });
      },
      updateChart(i) {
        switch (i){
          case 0:
            text_premium.transition().duration(500).style("opacity", 0)
            text_freemium.transition().duration(500).style("opacity", 0)
            text_premium_num.transition().duration(500).style("opacity", 0)
            text_freemium_num.transition().duration(500).style("opacity", 0)
            text_premium_num.text("45%")
            text_freemium_num.text("55%")

            d3.selectAll(".circle-freemium, .circle-premium")
                .transition()
                .duration(1000)
                .attr("r", radius)

              forceX = d3.forceX(width/2).strength(0.05)
              forceCollide = d3.forceCollide(radius*1.25)

              simulation 
                .force("x", forceX) 
                .force("y", d3.forceY(height/2).strength(0.05)) 
                .force("collide", forceCollide)
                .alphaTarget(0.5)
                .restart()

              break;
          case 1:
              text_premium.transition().duration(500).style("opacity", 1)
              text_freemium.transition().duration(500).style("opacity", 1)
              text_premium_num.transition().duration(500).style("opacity", 1)
              text_freemium_num.transition().duration(500).style("opacity", 1)
              text_premium_num.text("45%")
              text_freemium_num.text("55%")

              d3.selectAll(".circle-freemium, .circle-premium")
                .transition()
                .duration(1000)
                .attr("r", radius)

              forceX = d3.forceX(function(d) { 
                if (d.category === "premium") { return width*0.25 }
                else { return width*0.75 }
              }).strength(0.05)
              forceCollide = d3.forceCollide(radius*1.25)

              simulation 
                .force("x", forceX) 
                .force("y", d3.forceY(height/2).strength(0.05)) 
                .force("collide", forceCollide)
                .alphaTarget(0.5)
                .restart()

              break;
          case 2:
            text_premium.transition().duration(500).style("opacity", 1)
            text_freemium.transition().duration(500).style("opacity", 1)
            text_premium_num.transition().duration(500).style("opacity", 1)
            text_freemium_num.transition().duration(500).style("opacity", 1)
            text_premium_num.text("12x more revenue")
            text_freemium_num.text("")

            d3.selectAll(".circle-freemium")
              .transition()
              .duration(1000)
              .attr("r", radius/12)
            
            d3.selectAll(".circle-premium")
              .transition()
              .duration(1000)
              .attr("r", radius)

            let forceCollide2 = d3.forceCollide(function(d) {
              if (d.category === "premium") { return radius*1.25 }
                else { return radius*1.25/12 }
            })

            forceX = d3.forceX(function(d) { 
              if (d.category === "premium") { return width*0.25 }
              else { return width*0.75 }
            }).strength(0.05)

            simulation
              .force("x", forceX) 
              .force("y", d3.forceY(height/2).strength(0.05)) 
              .force("collide", forceCollide2)
              .alphaTarget(0.5)
              .restart()
              
            break;
          case 3:
            coinPathFunc.drawPath(3)
            //coinPathFunc.addCoin(3);
            break;   
        }
      },
      // on resize, update new dimensions
      resize() {
        // defaults to grabbing dimensions from container element
        width = $chart.node().offsetWidth - MARGIN_LEFT - MARGIN_RIGHT;
        height = $chart.node().offsetHeight - MARGIN_TOP - MARGIN_BOTTOM;
        $svg
          .attr('width', width + MARGIN_LEFT + MARGIN_RIGHT)
          .attr('height', height + MARGIN_TOP + MARGIN_BOTTOM);

          radius = width/60

        $circles
          .attr("r", radius)

        forceX = d3.forceX(width/2).strength(0.05)

        forceCollide = d3.forceCollide(radius*1.25)

        simulation = d3.forceSimulation()
          .force("x", forceX) 
          .force("y", d3.forceY(height/2).strength(0.05)) 
          .force("collide", forceCollide)

        simulation
          .nodes(data)
          .on("tick", ticked)
        
        text_premium
          .attr('x',width*0.25)
          .attr('y',height - 100);
        
        text_freemium
          .attr('x',width*0.75)
          .attr('y',height - 100);

        text_premium_num
          .attr('x',width*0.25)
          .attr('y',height - 80);
        
        text_freemium_num
          .attr('x',width*0.75)
          .attr('y',height - 80);
        
        Chart.updateChart(currStep)
        
        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);

        $circles = $circleGroup.selectAll(".circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", d => `circle circle-${d.category}`)
          .attr("id", d => `circle-${d.count}`)

        text_premium = $vis.append('text')
          .text("Premium")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"premium_text")
          .style("opacity", 0);
        
        text_freemium = $vis.append('text')
          .text("Freemium")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"freemium_text")
          .style("opacity", 0);
        
        text_premium_num = $vis.append('text')
          .text("45%")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"premium_num")
          .style("opacity", 0);
        
        text_freemium_num = $vis.append('text')
          .text("55%")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"freemium_num")
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
