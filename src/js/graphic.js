/* global d3 */
import { graphScroll } from './graph-scroll';
import './pudding-chart/diagram';
import './pudding-chart/rectChart';
import './pudding-chart/revChart';

/* DOM */
let $chartDiagramContainer = d3.select('.diagram-container');
let $chartRectContainer = d3.select('.container-1 #graph');
let $chartRevContainer = d3.select('.container-2 #graph');

/* charts */
let chartDiagram;
let chartRect;
let chartRev;
let data;

function setupchartDiagram(data) {
	chartDiagram = $chartDiagramContainer.datum(data).chartDiagram();
}

function setupchartRect(data) {
	chartRect = $chartRectContainer.datum(data).chartRect();
}

function setupchartRev(data) {
	chartRev = $chartRevContainer.datum(data).chartRev();
}

function resize() {
	const $body = d3.select("body");
  	let previousWidth = 0;
  	const width = $body.node().offsetWidth;
  	if (previousWidth !== width) {
		chartDiagram.resize();
		chartRect.resize();
		chartRev.resize();
  	}
}

function init() {
	setupchartDiagram(data);
	setupchartRect(data);
	setupchartRev(data);
	resize();
}

export default { init, resize };
