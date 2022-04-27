/* global d3 */
//import { graphScroll } from './graph-scroll';
import coinPathFunc from './coin-path';
import './pudding-chart/diagram';
import './pudding-chart/revChart';
// import './pudding-chart/forceChart';
import './pudding-chart/userChart';

/* DOM */
let $chartDiagramContainer = d3.select('.diagram-container');
let $chartRectContainer = d3.select('.container-1 #graph');
let $chartRevContainer = d3.select('.container-2 #graph');
let $sliders = d3.selectAll('.noUi-handle')

/* charts */
let chartDiagram;
let chartForce;
let chartUser;
let chartRev;
let data;

let lastScrollTop = 0;


function setupchartDiagram(data) {
	chartDiagram = $chartDiagramContainer.datum(data).chartDiagram();
}

function setupchartForce(data) {
	chartForce = $chartRectContainer.datum(data).chartForce();
}

function setupchartUser(data) {
	chartUser = $chartRectContainer.datum(data).chartUser();
}

function setupchartRev(data) {
	chartRev = $chartRevContainer.datum(data).chartRev();
}

function resize() {
	const $body = d3.select("body");
	let previousWidth = 0;
	const width = $body.node().offsetWidth;

	coinPathFunc.resetPaths();

	coinPathFunc.calcPath(1);
	coinPathFunc.calcPath(2);
	coinPathFunc.calcPath(3);
	coinPathFunc.calcPath(4);

	coinPathFunc.setupPaths();
	//coinPathFunc.addCoin(1);

	if (previousWidth !== width) {
		chartDiagram.resize();
		//chartForce.resize();
		chartUser.resize();
		chartRev.resize();
	}
}

function init() {
	setupchartDiagram(data);
	setupchartUser(data);
	//setupchartForce(data);
	setupchartRev(data);

	if (document.fonts.check("12px Poppins")) {
		coinPathFunc.init();
		resize();
	}
	addEventListener("beforeunload", () => {
		window.scrollTo(0, 0);
	});

	$sliders.attr("aria-label", "revenue slider")
}

export default { init, resize };
