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

d3.selection.prototype.chartDiagram = function init(options) {
  function createChart(el) {
    // dom elements
    const $chart = d3.select(el);
    let $svg = null;
    let $axis = null;
    let $vis = null;

    // data
    let data = $chart.datum();
    console.log("checking")

    // dimensions
    let width = 0;
    let height = 0;
    const MARGIN_TOP = 20;
    const MARGIN_BOTTOM = 20;
    const MARGIN_LEFT = 20;
    const MARGIN_RIGHT = 20;

    // scales
    const scaleX = null;
    const scaleY = null;

    // element dimensions + positions
    let iconWidth;
    let iconWidth_1_4;
    let iconWidth_1_2;
    let iconWidth_3_4;
    let iconWidth_6_4; 
    let singer_params;
    let distributor_params;
    let spotify_params;
    let apple_params;
    let deezer_params;
    let dist_text_params;
    let data_music_notes;
    let data_diag_dollars;

    let logo_artist;
    let logo_apple;
    let logo_spotify;
    let logo_deezer;
    let logo_label;
    let text_distributor;
    let musicNotes;
    let dollars;
    let sizeSmallIcons;

    const $musicNotes = d3.selectAll('#music_notes');
    const $money = d3.selectAll('#diag_dist_dollars');

    // helper functions
    function deleteMusic() { $musicNotes.remove() }
    function deleteMoney() { $money.remove() }
    function animateMusic() {
        musicNotes = $vis.append("g").attr("id","music_notes")

        musicNotes.selectAll("#music_notes")
              .data(data_music_notes)
              .enter()
              .append("image")
              .attr('xlink:href', './assets/images/note_neon.png')
              .attr('width', sizeSmallIcons)
              .attr('height', sizeSmallIcons)
              .attr("x", function(d){ return d.x_start; })
              .attr("y", function(d){ return d.y_start; })
              .transition()
              .duration(1000)
              .on("start",function repeat() {
                d3.active(this)
                    .attr("x",function(d){ return d.x_mid; })
                    .attr("y",function(d){ return d.y_mid; })
                  .transition()
                    .duration(1000)
                    .delay(function(d){ return d.delay1; })
                    .attr("x",function(d){ return d.x_end; })
                    .attr("y",function(d){ return d.y_end; })
                  .transition()
                    .duration(0)
                    .delay(function(d){ return d.delay2; })
                    .attr("x",function(d){ return d.x_start; })
                    .attr("y",function(d){ return d.y_start; })
                  .transition()
                    .duration(1000)
                    .delay(function(d){ return d.delay1; })
                    .on("start", repeat)
              })
    }
    function animateMoney() {
        dollars = $vis.append("g").attr("id","diag_dist_dollars")

        dollars.selectAll("#diag_dist_dollars")
            .data(data_diag_dollars)
            .enter()
            .append("image")
            .attr('xlink:href', './assets/images/money_neon.png')
            .attr('width', sizeSmallIcons)
            .attr('height', sizeSmallIcons)
            .attr("x", function(d){ return d.x_start; })
            .attr("y", function(d){ return d.y_start; })
            .transition()
            .duration(1000)
            .delay(function(d){ return d.delay1; })
            .on("start",function repeat() {
            d3.active(this)
                .attr("x",function(d){ return d.x_mid; })
                .attr("y",function(d){ return d.y_mid; })
                .transition()
                .duration(1000)
                .delay(function(d){ return d.delay1; })
                .attr("x",function(d){ return d.x_end; })
                .attr("y",function(d){ return d.y_end; })
                .transition()
                .duration(0)
                .delay(function(d){ return d.delay2; })
                .attr("x",function(d){ return d.x_start; })
                .attr("y",function(d){ return d.y_start; })
                .transition()
                .duration(1000)
                .delay(function(d){ return d.delay1; })
                .on("start", repeat)
            })
    }

    const Chart = {
      // called once at start
      init() {
        $svg = $chart.append('svg').attr('class', 'pudding-chart').attr('id', 'dist_diag');

        // create axis
        $axis = $svg.append('g').attr('class', 'g-axis');

        // setup viz group
        $vis = $svg.append('g').attr('class', 'g-vis');

        Chart.render();
        Chart.resize();

        let gs0 = graphScroll()
            .container(d3.select('.container-0'))
            .graph(d3.selectAll('container-0 #graph'))
            .eventId('uniqueId0')  // namespace for scroll and resize events
            .sections(d3.selectAll('.container-0 #sections > div'))
            .offset(100)
            // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
            .on('active', function(i){
                console.log(i)
                //console.log('graph 0 change', i)
                //console.log("gs0 i", i)
                Chart.updateDiagram(i);
                Chart.toggleAnimations(i);
            });
      },
      updateDiagram(i) {
        switch (i){
            case 0:
                logo_label.style('opacity', 0)
                text_distributor.style('opacity', 0)
                break;
            case 1:
                logo_label.style('opacity', 1)
                text_distributor.style('opacity', 1)
                break;
          }
      },
      toggleAnimations(i) {
        switch(i){
            case 0:
                $musicNotes.remove()
                break;
            case 1:
                deleteMoney();
                animateMusic();
                break;
            case 2:
                deleteMusic();
                deleteMoney();
                animateMoney();
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

        if (width >= 500) {
            iconWidth = 100;
            iconWidth_1_4 = iconWidth*0.25;
            iconWidth_1_2 = iconWidth*0.5;
            iconWidth_3_4 = iconWidth*0.75;
            iconWidth_6_4 = iconWidth*1.5;
        } else if (width >= 400) {
            iconWidth = 80;
            iconWidth_1_4 = iconWidth*0.25;
            iconWidth_1_2 = iconWidth*0.5;
            iconWidth_3_4 = iconWidth*0.75;
            iconWidth_6_4 = iconWidth*1.5;
        } else {
            iconWidth = 60;
            iconWidth_1_4 = iconWidth*0.25;
            iconWidth_1_2 = iconWidth*0.5;
            iconWidth_3_4 = iconWidth*0.75;
            iconWidth_6_4 = iconWidth*1.5;
        }

        sizeSmallIcons = iconWidth/2

        singer_params = {width:iconWidth, height:iconWidth,x:0,y:height/2};
        distributor_params = {width:iconWidth, height:iconWidth,x:width/2 - iconWidth_1_2,y:height/2};
        spotify_params = {width:iconWidth, height:iconWidth,x:width-iconWidth_6_4,y:iconWidth_3_4};
        apple_params = {width:iconWidth, height:iconWidth,x:width-iconWidth_6_4,y:height/2};
        deezer_params = {width:iconWidth, height:iconWidth,x:width-iconWidth_6_4,y:height-iconWidth_3_4};
        dist_text_params = {x:distributor_params.x + distributor_params.width/2, y:distributor_params.y+distributor_params.height/2 + iconWidth_1_4};

        data_music_notes = [
            {label:"spotify",
              x_start:singer_params.x+singer_params.width-iconWidth_1_4, y_start:singer_params.y-iconWidth_1_4,
              x_mid:distributor_params.x+distributor_params.width/2-iconWidth_3_4, y_mid:distributor_params.y-iconWidth_1_4,
              x_end:spotify_params.x-iconWidth_1_4, y_end:spotify_params.y-iconWidth_1_4,
              delay1:1000, delay2:500 },
            {label:"apple",x_start:singer_params.x+singer_params.width-iconWidth_1_4, y_start:singer_params.y-iconWidth_1_4,
              x_mid:distributor_params.x+distributor_params.width/2-iconWidth_3_4, y_mid:distributor_params.y-iconWidth_1_4,
              x_end:apple_params.x-iconWidth_1_4, y_end:apple_params.y-iconWidth_1_4,
              delay1:1000, delay2:500 },
            {label:"deezer",x_start:singer_params.x+singer_params.width-iconWidth_1_4, y_start:singer_params.y-iconWidth_1_4,
              x_mid:distributor_params.x+distributor_params.width/2-iconWidth_3_4, y_mid:distributor_params.y-iconWidth_1_4,
              x_end:deezer_params.x-iconWidth_1_4, y_end:deezer_params.y-iconWidth_1_4,
              delay1:1000, delay2:500 },
        ];

        data_diag_dollars = [
            {label:"spotify",
              x_end:singer_params.x+singer_params.width-iconWidth_1_4, y_end:singer_params.y-iconWidth_1_4,
              x_mid:distributor_params.x+distributor_params.width/2-iconWidth_3_4, y_mid:distributor_params.y-iconWidth_1_4,
              x_start:spotify_params.x-iconWidth_1_4, y_start:spotify_params.y-iconWidth_1_4,
              delay1:500, delay2:500 },
            {label:"apple",
              x_end:singer_params.x+singer_params.width-iconWidth_1_4, y_end:singer_params.y-iconWidth_1_4,
              x_mid:distributor_params.x+distributor_params.width/2-iconWidth_3_4, y_mid:distributor_params.y-iconWidth_1_4,
              x_start:apple_params.x-iconWidth_1_4, y_start:apple_params.y-iconWidth_1_4,
              delay1:500, delay2:500 },
            {label:"deezer",
              x_end:singer_params.x+singer_params.width-iconWidth_1_4, y_end:singer_params.y-iconWidth_1_4,
              x_mid:distributor_params.x+distributor_params.width/2-iconWidth_3_4, y_mid:distributor_params.y-iconWidth_1_4,
              x_start:deezer_params.x-iconWidth_1_4, y_start:deezer_params.y-iconWidth_1_4,
              delay1:500, delay2:500 },
        ];

        logo_artist
            .attr('width', singer_params.width)
            .attr('height',singer_params.height)
            .attr('x',singer_params.x)
            .attr('y',singer_params.y - singer_params.height/2);
  
        logo_spotify
            .attr('width', spotify_params.width)
            .attr('height',spotify_params.height)
            .attr('x',spotify_params.x + MARGIN_RIGHT + MARGIN_LEFT)
            .attr('y',spotify_params.y - spotify_params.height/2);
    
        logo_apple
            .attr('width', apple_params.width)
            .attr('height',apple_params.height)
            .attr('x',apple_params.x + MARGIN_RIGHT + MARGIN_LEFT)
            .attr('y',apple_params.y - apple_params.height/2);
    
        logo_deezer
            .attr('width', deezer_params.width)
            .attr('height',deezer_params.height)
            .attr('x',deezer_params.x + MARGIN_RIGHT + MARGIN_LEFT)
            .attr('y',deezer_params.y  - deezer_params.height/2);
        
        logo_label
            .attr('width', distributor_params.width)
            .attr('height',distributor_params.height)
            .attr('x',distributor_params.x)
            .attr('y',distributor_params.y - distributor_params.height/2)
        
        text_distributor
            .attr('x',dist_text_params.x)
            .attr('y',dist_text_params.y);

            //console.log(width, iconWidth)
            
        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);

        logo_artist = $vis.append('image')
        .attr('xlink:href', './assets/images/artist_neon.png')
  
        logo_spotify = $vis.append('image')
            .attr('xlink:href', './assets/images/spotify_neon.png')
    
        logo_apple = $vis.append('image')
            .attr('xlink:href', './assets/images/apple_neon.png')
    
        logo_deezer = $vis.append('image')
            .attr('xlink:href', './assets/images/deezer_neon.png')
        
        logo_label = $vis.append('image')
            .attr('xlink:href', './assets/images/lable_neon.png')
            .attr('id',"dist_image")
            .style('opacity', 0)
        
        text_distributor = $vis.append('text')
            .text("Dist / Label")
            .attr('text-anchor','middle')
            .attr('dominant-baseline','central')
            .attr('id',"dist_text")
            .style('opacity', 0)


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
