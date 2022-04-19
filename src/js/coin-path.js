/* DOM */
let $chartDiagramContainer = d3.select('.diagram-container');
let $chartRectContainer = d3.select('.container-1 #graph');
let $chartRevContainer = d3.select('.container-2 #graph');
let $coinPathContainer = d3.select('#coinPath-Container');
let $coinPathSVG = d3.select('#coinPath');
let $hedContainer = d3.select('.intro__hed');
let $hedSpan = d3.select('#coinSpan');
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

let coinWidth = 60;
let sidePadding = 60;

let pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
let scrollyBlockHeight1 = d3.select('.container-0 #sections').node().offsetHeight;
let scrollyBlockHeight2 = d3.select('.container-1 #sections').node().offsetHeight;
let scrollyBlockHeight3 = d3.select('.container-2 #sections').node().offsetHeight;

/* PATH DIMENSIONS */
let horizLine1;
let horizLine1_mid;
let horizLine2;
let horizLine2_mid;
let horizLine3;
let horizLine3_mid;
let horizLine4;
let horizLine4_mid;
let horizLine5;
let horizLine5_mid;
let horizLine6;
let horizLine6_mid;
let horizLine7;
let horizLine7_mid;
let horizLine8;
let horizLine8_mid;
let end;
let endBottom;
let coinPathW;
let coinPathH;
let yPos;

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

function calcPath(path) {

    $coinPathContainer.style('height', `${pageHeight+300}px`);

    coinPathW = $coinPathContainer.node().offsetWidth;
    coinPathH = $coinPathContainer.node().offsetHeight;

    yPos = window.scrollY;
    console.log(yPos)
    
    $coinPathSVG
		.attr('width', coinPathW)
		.attr('height', pageHeight+300);

    horizLine1 = $hedSpan.node().getBoundingClientRect();
	horizLine1_mid = horizLine1.top + horizLine1.height/2;
	horizLine2 = $subhed1.node().getBoundingClientRect();
	horizLine2_mid = horizLine2.top + horizLine2.height/2 - 50;
	horizLine3 = $chartDiagramContainer.node().getBoundingClientRect();
	horizLine3_mid = horizLine3.top + horizLine3.height/2;
	horizLine4 = $subhed2.node().getBoundingClientRect();
	horizLine4_mid = horizLine4.top + horizLine4.height/2 - 50;
	horizLine5 = $chartRectContainer.node().getBoundingClientRect();
	horizLine5_mid = horizLine5.top + horizLine5.height/2;
    horizLine6 = $subhed3.node().getBoundingClientRect();
	horizLine6_mid = horizLine6.top + horizLine6.height/2 - 50;
	horizLine7 = $chartRevContainer.node().getBoundingClientRect();
	horizLine7_mid = horizLine7.top + horizLine7.height/2;
	horizLine8 = $subhed4.node().getBoundingClientRect();
	horizLine8_mid = horizLine8.top + horizLine8.height/2;
	end = $footer.node().getBoundingClientRect();
	endBottom = end.bottom;

    if (path == 1) {
        coinPathData1.moveTo(0, horizLine1_mid)
        coinPathData1.lineTo(coinPathW-sidePadding-sidePadding, horizLine1_mid)
        coinPathData1.quadraticCurveTo(coinPathW-sidePadding, horizLine1_mid, coinPathW-sidePadding, horizLine1_mid+sidePadding)
        coinPathData1.lineTo(coinPathW-sidePadding, horizLine2_mid-sidePadding)
        coinPathData1.quadraticCurveTo(coinPathW-sidePadding, horizLine2_mid, coinPathW-sidePadding-sidePadding, horizLine2_mid)
        coinPathData1.lineTo(0+sidePadding+sidePadding, horizLine2_mid)
        coinPathData1.quadraticCurveTo(0+sidePadding, horizLine2_mid, 0+sidePadding, horizLine2_mid+sidePadding)
        coinPathData1.lineTo(0+sidePadding, horizLine3_mid-sidePadding)
        coinPathData1.quadraticCurveTo(0+sidePadding, horizLine3_mid, 0+sidePadding+sidePadding, horizLine3_mid)
        coinPathData1.lineTo(horizLine3.left+coinWidth, horizLine3_mid)
    }

    if (path == 2) {
        coinPathData2.moveTo(coinPathW/2, horizLine3_mid+scrollyBlockHeight1)
        coinPathData2.lineTo(coinPathW-sidePadding-sidePadding, horizLine3_mid+scrollyBlockHeight1)
        coinPathData2.quadraticCurveTo(coinPathW-sidePadding, horizLine3_mid+scrollyBlockHeight1, coinPathW-sidePadding, horizLine3_mid+scrollyBlockHeight1+sidePadding)
        coinPathData2.lineTo(coinPathW-sidePadding, horizLine4_mid-sidePadding)
        coinPathData2.quadraticCurveTo(coinPathW-sidePadding, horizLine4_mid, coinPathW-sidePadding-sidePadding, horizLine4_mid)
        coinPathData2.lineTo(0+sidePadding+sidePadding, horizLine4_mid)
        coinPathData2.quadraticCurveTo(0+sidePadding, horizLine4_mid, 0+sidePadding, horizLine4_mid+sidePadding)
        coinPathData2.lineTo(0+sidePadding, horizLine5_mid-sidePadding)
        coinPathData2.quadraticCurveTo(0+sidePadding, horizLine5_mid, 0+sidePadding+sidePadding, horizLine5_mid)
        coinPathData2.lineTo(horizLine5.left+coinWidth, horizLine5_mid)
    }

    if (path == 3) {
        coinPathData3.moveTo(coinPathW/2, horizLine5_mid+scrollyBlockHeight2)
        coinPathData3.lineTo(coinPathW-sidePadding-sidePadding, horizLine5_mid+scrollyBlockHeight2)
        coinPathData3.quadraticCurveTo(coinPathW-sidePadding, horizLine5_mid+scrollyBlockHeight2, coinPathW-sidePadding, horizLine5_mid+scrollyBlockHeight2+sidePadding)
        coinPathData3.lineTo(coinPathW-sidePadding, horizLine6_mid-sidePadding)
        coinPathData3.quadraticCurveTo(coinPathW-sidePadding, horizLine6_mid, coinPathW-sidePadding-sidePadding, horizLine6_mid)
        coinPathData3.lineTo(0+sidePadding+sidePadding, horizLine6_mid)
        coinPathData3.quadraticCurveTo(0+sidePadding, horizLine6_mid, 0+sidePadding, horizLine6_mid+sidePadding)
        coinPathData3.lineTo(0+sidePadding, horizLine7_mid-sidePadding)
        coinPathData3.quadraticCurveTo(0+sidePadding, horizLine7_mid, 0+sidePadding+sidePadding, horizLine7_mid)
        coinPathData3.lineTo(horizLine7.left+coinWidth, horizLine7_mid)
    }

    if (path == 4) {
        coinPathData4.moveTo(coinPathW/2, horizLine7_mid+scrollyBlockHeight3)
        coinPathData4.lineTo(coinPathW-sidePadding-sidePadding, horizLine7_mid+scrollyBlockHeight3)
        coinPathData4.quadraticCurveTo(coinPathW-sidePadding, horizLine7_mid+scrollyBlockHeight3, coinPathW-sidePadding, horizLine7_mid+scrollyBlockHeight3+sidePadding)
        coinPathData4.lineTo(coinPathW-sidePadding, endBottom+300)
    }
}

function setupPaths() {
    $coinPath1
        .attr("d", coinPathData1)
        .attr("class", "coinPath-path")

    $coinPath2
        .attr("d", coinPathData2)
        .attr("class", "coinPath-path")
        .style("opacity", 0)

    $coinPath3
        .attr("d", coinPathData3)
        .attr("class", "coinPath-path")
        .style("opacity", 0)

    $coinPath4
        .attr("d", coinPathData4)
        .attr("class", "coinPath-path")
        .style("opacity", 0)
}

function drawPath(path) {
    let $targetPath = d3.select(`#coinPath${path}`)
    let length = $targetPath.node().getTotalLength()
    let currPath = path - 1;

    $targetPath.style("opacity", 1)

    $targetPath.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .delay(function() {
            if (path == 1) { return 0}
            else { return 500 }
        })
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(length)
        .on("end", function() {
                d3.selectAll(`.container-${currPath} #graph svg`)
                    .style("opacity", 1)

                d3.selectAll(`.legend-1`)
                    .style("opacity", 1)
                
                d3.select(`.container-${currPath} #graph`)
                    .style("border", "5px solid #5552CF")
                    .style("box-shadow", "0 0 20px #5552CF")
                    .style("animation", "flickerBorder 3s linear 1 1s")
        })
}

function addCoin(path) {
    let $targetCoin = d3.select(`#coinImg${path}`)
    let $targetPath = d3.select(`#coinPath${path}`)

    let length = $targetPath.node().getTotalLength()

    let horizLine1 = $hedSpan.node().getBoundingClientRect();
	let horizLine1_midH = horizLine1.top + horizLine1.height/2 - coinWidth/2;
    let horizLine1_midW = horizLine1.left + horizLine1.width/2 - coinWidth/2;

    $targetCoin
        .style("opacity", 1)
        .style("width", `${coinWidth}px`)
        .style("height", `${coinWidth}px`)
        .style("top", `${horizLine1_midH}px`)
        .style("left", `${horizLine1_midW}px`)
        .transition()
        .delay(2000)
        .duration(length)
        .ease(d3.easeLinear)
        .tween("pathTween", function(){return pathTween($targetPath)})
}

function pathTween(path) {
	let length = path.node().getTotalLength(); // Get the length of the path
	let r = d3.interpolate(length/5.125, length); //Set up interpolation from 0 to the path length
	return function(t){
		let point = path.node().getPointAtLength(r(t)); // Get the next point along the path
		d3.select(this) // Select the circle
            .style("animation", "spin 0.5s linear infinite")
			.style("left", `${point.x - coinWidth/2}px`) // Set the x
			.style("top", `${point.y - coinWidth/2}px`) // Set the y
	}
}

function rotateTween() {
    let i = d3.interpolate(0, 360);
    return function(t) {
        console.log(`rotate(${i(t)})`)
        return "rotate(" + i(t) + ")";
    }
}

function init(path) {
    calcPath(1)
    calcPath(2)
    calcPath(3)
    calcPath(4)
    setupPaths()
    drawPath(1)
}

export default { init, calcPath, setupPaths, drawPath, addCoin };