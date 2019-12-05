import "./common.css";
import "./mxGraph.css";
import {
	mxClient,
	mxUtils,
	mxEvent,
	mxRubberband,
	mxConstants,
	mxOutline,
	mxCellTracker,
	mxGraphHandler,
	mxVertexHandler,
	mxEdgeHandler,
	mxGuide,
	mxConnectionHandler,
	mxImage
} from "mxgraph-js";

// import {start}       from "../../assets/base64";
import {ContextMenu} from "./ContextMenu";
import {Elements}    from "./Elements";

export function demoProcess(container, editor, outline) {
	mxClient.basePath = "../../src";
	if (!mxClient.isBrowserSupported()) {

		// Displays an error message if the browser is not supported.
		mxUtils.error('Browser is not supported!', 200, false);
	} else {


		/**
		 * Assign container to editor
		 */
		editor.setGraphContainer(container);
		let graph = editor.graph;

		graph.setPanning(true);

		graph.getAllConnectionConstraints = function (terminal, source) {
			if (terminal != null && terminal.shape != null) {
				if (terminal.shape.stencil != null) {
					if (terminal.shape.stencil != null) {
						return terminal.shape.stencil.constraints;
					}
				} else if (terminal.shape.constraints != null) {
					return terminal.shape.constraints;
				}
			}

			return null;
		};

		//miniMap of process
		new mxOutline(graph, outline);

		//Prevent disconnect edges from vertex
		graph.setAllowDanglingEdges(false);

		graph.disconnectOnMove = false;

		// Enables guides
		mxGraphHandler.prototype.guidesEnabled = true;
		mxConstants.GUIDE_COLOR = '#FF0000';
		mxConstants.GUIDE_STROKEWIDTH = 2;

		mxVertexHandler.prototype.livePreview = true;


		// Alt disables guides
		mxGuide.prototype.isEnabledForEvent = function (evt) {
			return !mxEvent.isAltDown(evt);
		};

		/**
		 * Event Mousewheel
		 */
		mxEvent.addMouseWheelListener(function (evt, up) {
			if (!mxEvent.isConsumed(evt)) {
				if (up) {
					editor.execute('zoomIn');
				} else {
					editor.execute('zoomOut');
				}
			}
		});

		// Enables rubberband selection
		new mxRubberband(graph);

		mxEvent.disableContextMenu(document.body);

		new mxCellTracker(graph, '#00FF00');

		// Installs context menu
		ContextMenu(graph, editor);

		// graph.setTooltips(true);

		//GRAPH Permissions
		// graph.cellsDisconnectable = false;
		graph.cellsResizable = false;

		// Enables snapping waypoints to terminals
		mxEdgeHandler.snapToTerminals = true;


		// mxEdgeHandler.prototype.connect = function (x, y, z, a, b) {
		// 	console.log(x, y, z);
		// };

		mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);

		// Gets the default parent for inserting new cells. This
		// is normally the first child of the root (ie. layer 0).
		let parent = graph.getDefaultParent();


		// Enables connections in the graph and disables
		// reset of zoom and translate on root change
		// (ie. switch between XML and graphical mode).
		// graph.setConnectable(true);

		// Clones the source if new connection has no target
		// graph.connectionHandler.setCreateTarget(true);

		// Instance Elements
		Elements(graph);

		let factory = function (name) {
			return function () {
				editor.execute(name);
			};
		};

		//Add undo and Redo
		mxEvent.addListener(document.getElementById("undoButton"), 'click', factory("undo"));
		mxEvent.addListener(document.getElementById("redoButton"), 'click', factory("redo"));

		// Adds cells to the model in a single step
		graph.getModel().beginUpdate();
		/**
		 * Draw first data
		 */
		try {
			var v_start = graph.insertVertex(parent, null, 'start', 20, 220, 48, 48, 'start');
			var v_processA = graph.insertVertex(parent, null, 'Proceso 1', 220, 220, 120, 50, 'object');
			var e1 = graph.insertEdge(parent, null, '', v_start, v_processA, 'edge');

			var v_processB = graph.insertVertex(parent, null, 'Proceso 2', 700, 120, 120, 50, 'object');
			var v_processC = graph.insertVertex(parent, null, 'Proceso 3', 600, 320, 120, 50, 'object');
			var v_processD = graph.insertVertex(parent, null, 'Proceso 4', 800, 320, 120, 50, 'object');

			var v_decision = graph.insertVertex(parent, null, 'Condición', 420, 180, 120, 100, 'condition');
			var e2 = graph.insertEdge(parent, null, '', v_processA, v_decision, 'edge');
			e2 = graph.insertEdge(parent, null, 'Yes', v_decision, v_processB, 'trueEdge');
			e2 = graph.insertEdge(parent, null, 'No', v_decision, v_processC, 'falseEdge');

			var v_end = graph.insertVertex(parent, null, 'end', 1000, 220, 40, 40, 'end');
			var e3 = graph.insertEdge(parent, null, '', v_processB, v_end, 'edge');
			e3 = graph.insertEdge(parent, null, '', v_processC, v_processD, 'edge');
			e3 = graph.insertEdge(parent, null, '', v_processD, v_end, 'edge');
			validateGraph(graph.model.cells);
		}
				/**
				 * Render data from declarations
				 */ finally {
console.log(graph);
console.log(editor);
			graph.getModel().endUpdate();
		}
	}
}

function validateGraph (cells){
	let i = 0;
	console.log(cells);
	for(i; i<Object.keys(cells).length; i++){
		if(cells[i].edges){
			if(cells[i].edges.length >= 2){
				// cells[i].connectable = false;
				// cells[i].disableEdgeStyle = true;
			}
		}
	}
console.log(cells);
}
