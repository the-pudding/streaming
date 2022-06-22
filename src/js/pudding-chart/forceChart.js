/* global d3 */
import { graphScroll } from '../graph-scroll';
//import coinPathFunc from '../coin-path';
import enterView from 'enter-view';
import { delay } from 'lodash';

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
    let fCircle;
    let pCircle;
    let pDollar;
    let fDollar;
    let dollarHeight=15;
    let pDollarHeight=9*dollarHeight*0.75;
    let fDollarHeight=dollarHeight;
    let pArrowLine;
    let fArrowLine;
    let pArrow;
    let fArrow;
    let verticalOffset=0.75;

    // data
    let data = $chart.datum();
    data = d3.range(1, 101)
    let currStep;

    function setCategory(d) {
      if (d > 42) { return "freemium" }
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
    let forceCollide2 = null;

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

        Chart.render();
        Chart.resize();

        // enterView({
        //   selector: '#triggerDiv2',
        //   offset: 0.2,
        //   enter: function(el) {
        //     d3.selectAll("#coinGroup2, #coinImgG2").transition()
        //       .delay(200)
        //       .duration(500)
        //       .style("opacity", 0)
        //   },
        //   exit: function(el) {
        //     d3.selectAll("#coinGroup2, #coinImgG2").transition()
        //       .delay(200)
        //       .duration(500)
        //       .style("opacity", 1)
        //   }
        // })

        // enterView({
        //   selector: '#lastDiv2',
        //   offset: 1,
        //   enter: function(el) {
        //     d3.selectAll("#coinGroup3, #coinImgG3").transition()
        //       .delay(200)
        //       .duration(500)
        //       .style("opacity", 1)
        //   },
        //   exit: function(el) {
        //     d3.selectAll("#coinGroup3, #coinImgG3").transition()
        //       .delay(200)
        //       .duration(500)
        //       .style("opacity", 0)
        //   }
        // })

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
            text_premium_num.text("42%")
            text_freemium_num.text("58%")

            d3.selectAll(".circle-freemium, .circle-premium")
                .transition()
                .duration(1000)
                .attr("r", radius)
            
              fCircle.transition().duration(500).attr('r', 0)
              pCircle.transition().duration(500).attr('r', 0)

            forceX = d3.forceX(width/2).strength(0.05)
            forceCollide = d3.forceCollide(radius*1.25)

            simulation 
              .force("x", forceX) 
              .force("y", d3.forceY(height/2).strength(0.05)) 
              .force("collide", forceCollide)
              .alphaTarget(0.5)
              .restart()
            
            pArrowLine 
              .transition().duration(500).delay(500)
              .attr("y2", height/2 + width*0.42/2.6/2)
            
            fArrowLine 
              .transition().duration(500).delay(500)
              .attr("y2", height/2 + width*0.58/2.6/2 +20)

            break;
          case 1:
              text_premium.transition().duration(500).style("opacity", 1)
              text_freemium.transition().duration(500).style("opacity", 1)
              text_premium_num.transition().duration(500).style("opacity", 1)
              text_freemium_num.transition().duration(500).style("opacity", 1)
              text_premium_num.text("42%")
              text_freemium_num.text("58%")

              fCircle.transition().duration(500).delay(500).attr('r', width*0.58/2.5).attr('cy', height/2)
              pCircle.transition().duration(500).delay(500).attr('r', width*0.42/2.5).attr('cy', height/2)

              pDollar.transition().duration(500).delay(500).attr('height', 0)
              fDollar.transition().duration(500).delay(500).attr('height', 0)

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
              
            pArrowLine 
              .transition().duration(500).delay(500)
              .attr("y2", height/2 + width*0.42/2.6/2)
            
            fArrowLine 
              .transition().duration(500).delay(500)
              .attr("y2", height/2 + width*0.58/2.6/2 +20)

              pArrow
                .transition().duration(500).delay(500)
                .style("opacity", 0)
              
              fArrow
                .transition().duration(500).delay(500)
                .style("opacity", 0)

              break;
          case 2:
            text_premium.transition().duration(500).style("opacity", 0)
            text_freemium.transition().duration(500).style("opacity", 0)
            text_premium_num.transition().duration(500).style("opacity", 0)
            text_freemium_num.transition().duration(500).style("opacity", 0)

            fCircle.transition().duration(500).delay(0).attr('r', width*0.58/2.6).attr('cy', height/2*verticalOffset)
            pCircle.transition().duration(500).delay(0).attr('r', width*0.42/2.6).attr('cy', height/2*verticalOffset)

            pDollar.transition().duration(500).delay(0).attr('height', pDollarHeight)
            fDollar.transition().duration(500).delay(0).attr('height', fDollarHeight)

            forceX = d3.forceX(function(d) { 
              if (d.category === "premium") { return width*0.25 }
              else { return width*0.75 }
            }).strength(0.05)
            forceCollide = d3.forceCollide(radius*1.25)

            simulation 
              .force("x", forceX) 
              .force("y", d3.forceY(height/2*verticalOffset).strength(0.05)) 
              .force("collide", forceCollide)
              .alphaTarget(0.5)
              .restart()

            pArrowLine 
                .transition().duration(500).delay(500)
                .attr("y2", height - pDollarHeight -10)
              
            fArrowLine 
              .transition().duration(500).delay(500)
              .attr("y2", height - pDollarHeight/2 -10)

            pArrow
              .transition().duration(500).delay(500)
              .style("opacity", 1)
            
            fArrow
              .transition().duration(500).delay(500)
              .style("opacity", 1)
            break; 
          case 3:
            text_premium.transition().duration(500).style("opacity", 0)
            text_freemium.transition().duration(500).style("opacity", 0)
            text_premium_num.transition().duration(500).style("opacity", 0)
            text_freemium_num.transition().duration(500).style("opacity", 0)

            fCircle.transition().duration(500).delay(0).attr('r', width*0.58/2.6).attr('cy', height/2*verticalOffset)
            pCircle.transition().duration(500).delay(0).attr('r', width*0.42/2.6).attr('cy', height/2*verticalOffset)

            pDollar.transition().duration(500).delay(0).attr('height', pDollarHeight)
            fDollar.transition().duration(500).delay(0).attr('height', fDollarHeight)

            forceX = d3.forceX(function(d) { 
              if (d.category === "premium") { return width*0.25 }
              else { return width*0.75 }
            }).strength(0.05)
            forceCollide = d3.forceCollide(radius*1.25)

            simulation 
              .force("x", forceX) 
              .force("y", d3.forceY(height/2*verticalOffset).strength(0.05)) 
              .force("collide", forceCollide)
              .alphaTarget(0.5)
              .restart()

            pArrowLine 
                .transition().duration(500).delay(500)
                .attr("y2", height - pDollarHeight -10)
              
            fArrowLine 
              .transition().duration(500).delay(500)
              .attr("y2", height - pDollarHeight/2 -10)

            pArrow
              .transition().duration(500).delay(500)
              .style("opacity", 1)
            
            fArrow
              .transition().duration(500).delay(500)
              .style("opacity", 1)
            break;
          case 4:
            //coinPathFunc.drawPath(3)

            text_premium.transition().duration(500).style("opacity", 0)
            text_freemium.transition().duration(500).style("opacity", 0)
            text_premium_num.transition().duration(500).style("opacity", 0)
            text_freemium_num.transition().duration(500).style("opacity", 0)

            fCircle.transition().duration(500).delay(0).attr('r', width*0.58/2.6).attr('cy', height/2*verticalOffset)
            pCircle.transition().duration(500).delay(0).attr('r', width*0.42/2.6).attr('cy', height/2*verticalOffset)

            pDollar.transition().duration(500).delay(0).attr('height', pDollarHeight)
            fDollar.transition().duration(500).delay(0).attr('height', fDollarHeight)

            forceX = d3.forceX(function(d) { 
              if (d.category === "premium") { return width*0.25 }
              else { return width*0.75 }
            }).strength(0.05)
            forceCollide = d3.forceCollide(radius*1.25)

            simulation 
              .force("x", forceX) 
              .force("y", d3.forceY(height/2*verticalOffset).strength(0.05)) 
              .force("collide", forceCollide)
              .alphaTarget(0.5)
              .restart()

            pArrowLine 
                .transition().duration(500).delay(500)
                .attr("y2", height - pDollarHeight -10)
              
            fArrowLine 
              .transition().duration(500).delay(500)
              .attr("y2", height - pDollarHeight/2 -10)

            pArrow
              .transition().duration(500).delay(500)
              .style("opacity", 1)
            
            fArrow
              .transition().duration(500).delay(500)
              .style("opacity", 1)
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
          .attr('y',height - 60);
        
        text_freemium
          .attr('x',width*0.75)
          .attr('y',height - 60);

        text_premium_num
          .attr('x',width*0.25)
          .attr('y',height - 40);
        
        text_freemium_num
          .attr('x',width*0.75)
          .attr('y',height - 40);
        
        pCircle
          .attr('cx', width*0.25) 
          .attr('cy', height/2)
          .attr('r', 0)
        
        fCircle
          .attr('cx', width*0.75) 
          .attr('cy', height/2)
          .attr('r', 0)
        
        pDollar
        .attr('x',width*0.25 - pDollarHeight/2)
        .attr('y',height - pDollarHeight);
        
        fDollar
        .attr('x',width*0.75 - fDollarHeight/2)
        .attr('y',height - pDollarHeight/2);

        pArrowLine 
          .attr("x1", width*0.25)
          .attr("y1", height/2 + width*0.42/2.6/2)
          .attr("x2", width*0.25)
          .attr("y2", height/2 + width*0.42/2.6/2)
        
        fArrowLine 
          .attr("x1", width*0.75)
          .attr("y1", height/2 + width*0.58/2.6/2 +20)
          .attr("x2", width*0.75)
          .attr("y2", height/2 + width*0.58/2.6/2 +20)
        
        pArrow
          .attr("transform", `translate(${width*0.25}, ${height - pDollarHeight -10}) rotate(60)`)
          .style("opacity", 0)
        
        fArrow
          .attr("transform", `translate(${width*0.75}, ${height - pDollarHeight/2 -10}) rotate(60)`)
          .style("opacity", 0)
        
        Chart.updateChart(currStep)
        
        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);
        
        pCircle = $vis.append('circle')
          .attr('class', 'bigCircle')
          .attr('id', 'pCircle')
      
        fCircle = $vis.append('circle')
          .attr('class', 'bigCircle')
          .attr('id', 'fCircle')
        
        pDollar = $vis.append('image')
          .attr('xlink:href', './assets/images/money_neon.png')
          .attr("id","pDollar")
          .attr('height', 0)
        
        fDollar = $vis.append('image')
          .attr('xlink:href', './assets/images/money_neon.png')
          .attr("id","fDollar")
          .attr('height', 0);

        pArrowLine = $vis.append('line').attr("class", "pArrowLine")
        fArrowLine = $vis.append('line').attr("class", "fArrowLine")

        pArrow = $vis.append('path')
          .attr("class", "pArrow")
          .attr("d", d3.symbol().type(d3.symbolTriangle).size(40));
        fArrow = $vis.append('path')
          .attr("class", "fArrow")
          .attr("d", d3.symbol().type(d3.symbolTriangle).size(40));

            
            // .style("opacity", 0)

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
          .text("42%")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"premium_num")
          .style("opacity", 0);
        
        text_freemium_num = $vis.append('text')
          .text("58%")
          .attr('text-anchor','middle')
          .attr('dominant-baseline','central')
          .attr('id',"freemium_num")
          .style("opacity", 0);
        
        $circleGroup = $vis.append('g').attr('class', 'g-circles');

        $circles = $circleGroup.selectAll(".circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", d => `circle circle-${d.category}`)
          .attr("id", d => `circle-${d.count}`)

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
