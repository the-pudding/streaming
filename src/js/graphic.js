/* global d3 */
//import { graphScroll } from './graph-scroll';
import coinPathFunc from './coin-path';
import './pudding-chart/diagram';
import './pudding-chart/rectChart';
import './pudding-chart/revChart';
import './pudding-chart/forceChart';

/* DOM */
let $chartDiagramContainer = d3.select('.diagram-container');
let $chartRectContainer = d3.select('.container-1 #graph');
let $chartRevContainer = d3.select('.container-2 #graph');

/* charts */
let chartDiagram;
let chartForce;
let chartRev;
let data;

let lastScrollTop = 0;


function setupchartDiagram(data) {
	chartDiagram = $chartDiagramContainer.datum(data).chartDiagram();
}

function setupchartForce(data) {
	chartForce = $chartRectContainer.datum(data).chartForce();
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
		chartForce.resize();
		chartRev.resize();
	}
}

function init() {
	setupchartDiagram(data);
	setupchartForce(data);
	setupchartRev(data);

	if (document.fonts.check("12px Poppins")) {
		coinPathFunc.init();
		resize();
	}
	addEventListener("beforeunload", () => {
		window.scrollTo(0, 0);
	});
}

export default { init, resize };
