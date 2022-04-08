/* DOM */
let $chartDiagramContainer = d3.select('.diagram-container');
let $chartRectContainer = d3.select('.container-1 #graph');
let $chartRevContainer = d3.select('.container-2 #graph');
let $coinPathContainer = d3.select('#coinPath-Container');
let $coinPathSVG = d3.select('#coinPath');
let $hedContainer = d3.select('.intro__hed');
let $subhed1 = d3.select('#subhed-1');
let $subhed2 = d3.select('#subhed-2');
let $subhed3 = d3.select('#subhed-3');
let $subhed4 = d3.select('#subhed-4');
let $footer = d3.select('.pudding-footer');
let $coinPath1 = d3.select('#coinPath1');
let $coinPath2 = d3.select('#coinPath2');
let $coinPath3 = d3.select('#coinPath3');
let $coinPath4 = d3.select('#coinPath4');
let coinPathData1 = d3.path();
let coinPathData2 = d3.path();
let coinPathData3 = d3.path();
let coinPathData4 = d3.path();
let $coinImg1 = d3.select('#coinImg1');
let $coinImg2 = d3.select('#coinImg2');
let $coinImg3 = d3.select('#coinImg3');
let $coinImg4 = d3.select('#coinImg4');

let coinWidth = 80;
let sidePadding = 60;

let pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
let scrollyBlockHeight1 = d3.select('.container-0 #sections').node().offsetHeight;
let scrollyBlockHeight2 = d3.select('.container-1 #sections').node().offsetHeight;
let scrollyBlockHeight3 = d3.select('.container-2 #sections').node().offsetHeight;

/*
coinPathImg = $coinPathSVG
		.append("image")
		.attr("id", "coin-img")
		.attr('xlink:href', './assets/images/money_neon.png')
		.attr("width", coinWidth)
		.attr("height", coinWidth)
		.attr("x", -coinWidth)
		.attr("y", horizLine1_mid)
		.transition()
		.delay(500)
		.duration(100000)
		.ease(d3.easeLinear)
		.tween("pathTween", function(){return pathTween(coinPath)})
*/

function drawPath(path) {
    console.log(path)

    $coinPathContainer.style('height', `${pageHeight}px`);

    let coinPathW = $coinPathContainer.node().offsetWidth;
    let coinPathH = $coinPathContainer.node().offsetHeight;
    
    $coinPathSVG
		.attr('width', coinPathW)
		.attr('height', coinPathH);

    let horizLine1 = $hedContainer.node().getBoundingClientRect();
	let horizLine1_mid = horizLine1.top + horizLine1.height/2;
	let horizLine2 = $subhed1.node().getBoundingClientRect();
	let horizLine2_mid = horizLine2.top + horizLine2.height/2;
	let horizLine3 = $chartDiagramContainer.node().getBoundingClientRect();
	let horizLine3_mid = horizLine3.top + horizLine3.height/2;
	let horizLine4 = $subhed2.node().getBoundingClientRect();
	let horizLine4_mid = horizLine4.top + horizLine4.height/2;
	let horizLine5 = $chartRectContainer.node().getBoundingClientRect();
	let horizLine5_mid = horizLine5.top + horizLine5.height/2;
	let horizLine6 = $subhed3.node().getBoundingClientRect();
	let horizLine6_mid = horizLine6.top + horizLine6.height/2;
	let horizLine7 = $chartRevContainer.node().getBoundingClientRect();
	let horizLine7_mid = horizLine7.top + horizLine7.height/2;
	let horizLine8 = $subhed4.node().getBoundingClientRect();
	let horizLine8_mid = horizLine8.top + horizLine8.height/2;
	let end = $footer.node().getBoundingClientRect();
	let endTop = end.top;

    if (path == 1) {
        coinPathData1.moveTo(0, horizLine1_mid)
        coinPathData1.lineTo(coinPathW-sidePadding, horizLine1_mid)
        coinPathData1.lineTo(coinPathW-sidePadding, horizLine2_mid)
        coinPathData1.lineTo(0+sidePadding, horizLine2_mid)
        coinPathData1.lineTo(0+sidePadding, horizLine3_mid)
        coinPathData1.lineTo(coinPathW/2, horizLine3_mid)
    }

    if (path == 2) {
        coinPathData2.moveTo(coinPathW/2, horizLine3_mid+scrollyBlockHeight1)
        coinPathData2.lineTo(coinPathW-sidePadding, horizLine3_mid+scrollyBlockHeight1)
        coinPathData2.lineTo(coinPathW-sidePadding, horizLine4_mid)
        coinPathData2.lineTo(0+sidePadding, horizLine4_mid)
        coinPathData2.lineTo(0+sidePadding, horizLine5_mid)
        coinPathData2.lineTo(coinPathW/2, horizLine5_mid)
    }

    if (path == 3) {
        coinPathData3.moveTo(coinPathW/2, horizLine5_mid+scrollyBlockHeight2)
        coinPathData3.lineTo(coinPathW-sidePadding, horizLine5_mid+scrollyBlockHeight2)
        coinPathData3.lineTo(coinPathW-sidePadding, horizLine6_mid)
        coinPathData3.lineTo(0+sidePadding, horizLine6_mid)
        coinPathData3.lineTo(0+sidePadding, horizLine7_mid)
        coinPathData3.lineTo(coinPathW/2, horizLine7_mid)
    }

    if (path == 4) {
        coinPathData4.moveTo(coinPathW/2, horizLine7_mid+scrollyBlockHeight3)
        coinPathData4.lineTo(coinPathW-sidePadding, horizLine7_mid+scrollyBlockHeight3)
        coinPathData4.lineTo(coinPathW-sidePadding, endTop)
    }

    $coinPath1
        .attr("d", coinPathData1)
        .attr("class", "coinPath-path")
    
    $coinPath2
        .attr("d", coinPathData2)
        .attr("class", "coinPath-path")
    
    $coinPath3
        .attr("d", coinPathData3)
        .attr("class", "coinPath-path")
    
    $coinPath4
        .attr("d", coinPathData4)
        .attr("class", "coinPath-path")
}

function pathTween(path) {
	let length = path.node().getTotalLength(); // Get the length of the path
	let r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length
	return function(t){
		let point = path.node().getPointAtLength(r(t)); // Get the next point along the path
		d3.select(this) // Select the circle
			.attr("x", point.x - coinWidth/2) // Set the x
			.attr("y", point.y - coinWidth/2) // Set the y
	}
}

function init(path) {
    drawPath(path)
}

export default { init };