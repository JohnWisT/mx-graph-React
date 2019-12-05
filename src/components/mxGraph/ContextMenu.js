import {
	mxPopupMenu
} from 'mxgraph-js'


/**
 * Reconect nodes on delete true branch
 * @param cell
 * @param loop
 * @param deleteCells
 * @returns {undefined|[]|*[]|*}
 */
function reconectFalse(cell, loop, deleteCells) {
	let i = 0;
	for (i; i < cell.edges.length; i++) {
		if (loop !== 1) {
			deleteCells = [];
			if (cell.edges[i].value === "Yes") {
				deleteCells.push(cell);
				if (cell.edges[i].target.value !== "end") { //CHECK END NODE
					deleteCells.push(cell.edges[i].target);
				}
				console.log(cell.edges[i].target);
				return reconectFalse(cell.edges[i].target, 1, deleteCells);
			}
		} else if (cell.value === "end") {

			return deleteCells;
		} else if (cell.edges[i].value !== "Yes") {
			if (cell.edges[i].target.value !== "end") { //CHECK END NODE
				deleteCells.push(cell.edges[i].target);
			}
			if (cell.mxObjectId !== cell.edges[i].target.mxObjectId) { //CHECK SAME NODE
				return reconectFalse(cell.edges[i].target, 1, deleteCells);
			}
		}
	}
}

/**
 * Reconect nodes on delete false branch
 * @param cell
 * @param loop
 * @param deleteCells
 * @returns {undefined|[]|*[]|*}
 */
function reconectTrue(cell, loop, deleteCells) {
	let i = 0;
	for (i; i < cell.edges.length; i++) {
		if (loop !== 1) {
			deleteCells = [];
			if (cell.edges[i].value === "No") {
				deleteCells.push(cell);
				if (cell.edges[i].target.value !== "end") { //CHECK END NODE
					deleteCells.push(cell.edges[i].target);
				}
				console.log(cell.edges[i].target);
				return reconectTrue(cell.edges[i].target, 1, deleteCells);
			}
		} else if (cell.value === "end") {

			return deleteCells;
		} else if (cell.edges[i].value !== "No") {
			if (cell.edges[i].target.value !== "end") { //CHECK END NODE
				deleteCells.push(cell.edges[i].target);
			}
			console.log(cell.edges[i].target);
			if (cell.mxObjectId !== cell.edges[i].target.mxObjectId) { //CHECK SAME NODE
				return reconectTrue(cell.edges[i].target, 1, deleteCells);
			}
		}
	}
}

/**
 * Return a child node if $% === centinel
 * @param cell
 * @param centinel
 * @returns {null|*}
 */
function getNode(cell, centinel) {
	let i = 0;
	for (i; i < cell.edges.length; i++) {
		if (cell.edges[i].value === centinel) {
			return cell.edges[i];
		}
	}
	return null;
}


// TODO ELIMINAR DEL HISTORICO PINTAR ALGUNOS VERTICES Y ACCIONES, SINO SOLAPAN ESTA AL 75%
/**
 * Create context menu
 * @param graph
 * @param editor
 * @constructor
 */
export function ContextMenu(graph, editor) {

	// Configures automatic expand on mouseover
	graph.popupMenuHandler.autoExpand = true;

	// Image from submenu in Base64
	mxPopupMenu.prototype.submenuImage = 'data:image/gif;base64,R0lGODlhCQAJAIAAAP///zMzMyH5BAEAAAAALAAAAAAJAAkAAAIPhI8WebHsHopSOVgb26AAADs=';

	graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
		let parent = graph.getDefaultParent();
		if (cell && (cell.value !== 'start' && cell.value !== 'end')) {
			console.log(editor.undoManager);
			if (cell.edge) {
				menu.addItem('Insert Condition', null, function () {
					let pt = graph.getPointForEvent(evt);
					let newGraph = graph.insertVertex(parent, null, 'Condición', pt.x, pt.y, 120, 100, 'condition');

					graph.insertEdge(parent, null, 'Yes', newGraph, cell.target, 'trueEdge');
					graph.insertEdge(parent, null, 'No', newGraph, cell.target, 'falseEdge');
					graph.insertEdge(parent, null, '', cell.source, newGraph, 'edge');
				});
			} else if (cell.style === 'condition') {
				menu.addItem('Remove Node Keeping True Branch', null, function () {
					if (getNode(cell, "Yes").target === getNode(cell, "No").target) { //IF SAME TARGET
						graph.removeCells(null, true);
					} else {
						graph.insertEdge(parent, null, cell.edges[0].value, getNode(cell, "").source, getNode(cell, "Yes").target, getNode(cell, "").style);
						editor.undoManager.history.pop();
						editor.undoManager.indexOfNextAdd = editor.undoManager.indexOfNextAdd - 1;
						graph.removeCells(reconectTrue(cell), true);
					}
				});
				menu.addItem('Remove Node Keeping False Branch', null, function () {
					if (getNode(cell, "Yes").target === getNode(cell, "No").target) { //IF SAME TARGET
						graph.removeCells(null, true);
					} else {

						graph.insertEdge(parent, null, cell.edges[0].value, getNode(cell, "").source, getNode(cell, "No").target, getNode(cell, "").style);
						console.log(editor.undoManager.history);
						graph.removeCells(reconectFalse(cell), true);

						//TODO HISTORY MANAGER
						let aux = editor.undoManager.history.pop();
						editor.undoManager.history[editor.undoManager.history.length - 1].changes.concat(aux.changes);
						editor.undoManager.indexOfNextAdd = editor.undoManager.indexOfNextAdd - 1;
					}
				});
			} else {
				console.log(cell);
				menu.addItem('Open Node', null, function () {
					alert("Open object");
				});

				menu.addItem('Remove Node (Del)', null, function () {
					graph.insertEdge(parent, null, cell.edges[0].value, cell.edges[0].source, cell.edges[1].target, cell.edges[0].style);
					graph.removeCells(null, true);
				});
			}
		}
	}
}
