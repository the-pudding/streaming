/* global d3 */
import { graphScroll } from './graph-scroll';
import './pudding-chart/diagram';

/* DOM */
let $chartDiagramContainer = d3.select('.diagram-container');

/* charts */
let chartDiagram;
let data;

function setupchartDiagram(data) {
	chartDiagram = $chartDiagramContainer.datum(data).chartDiagram();
}

function resize() {
	const $body = d3.select("body");
  	let previousWidth = 0;
  	const width = $body.node().offsetWidth;
  	if (previousWidth !== width) {
		chartDiagram.resize();
  	}
}

function init() {
	setupchartDiagram(data);
	resize();
}

export default { init, resize };
