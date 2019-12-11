import React, {Component} from "react";
import "./common.css";
import "./mxGraph.css";
import {
	mxClient,
	mxUtils,
	mxEditor,
	mxEvent,
	mxEffects,
	mxObjectCodec,
	mxPanningManager
}                         from "mxgraph-js";
import {demoProcess}      from "./MXGraphReact";

const load = require('../../assets/images/loading.gif');
const backG = require('../../assets/images/draw/drawbg.jpg');
const config = require('../../assets/diagrameditor.xml');

// const test = require('../../assets/process-start.svg');

function createInstanceMX() {

	let editor = null;

	let hideSplash = function () {

		// Fades-out the splash screen if needs to load a project
		let splash = document.getElementById('splash');
		if (splash != null) {
			try {
				mxEvent.release(splash);
				mxEffects.fadeOut(splash, 100, true);
			} catch (e) {
				splash.parentNode.removeChild(splash);
			}
		}
	};

	try {
		//Check browser compatibility
		if (!mxClient.isBrowserSupported()) {
			mxUtils.error('Browser is not supported!', 200, false);
		} else {
			mxObjectCodec.allowEval = true;
			var node = mxUtils.load(config).getDocumentElement();
			editor = new mxEditor(node);
			mxObjectCodec.allowEval = false;

			// Adds active border for panning inside the container
			editor.graph.createPanningManager = function () {
				var pm = new mxPanningManager(this);
				pm.border = 30;
				return pm;
			};

			editor.graph.allowAutoPanning = true;
			editor.graph.timerAutoScroll = true;

			// Updates the window title after opening new files
			var title = document.title;
			var funct = function (sender) {
				document.title = title + ' - ' + sender.getTitle();
			};

			editor.addListener(mxEvent.OPEN, funct);

			// Prints the current root in the window title if the
			// current root of the graph changes (drilling).
			editor.addListener(mxEvent.ROOT, funct);
			funct(editor);

			// Displays version in statusbar
			editor.setStatus('mxGraph ' + mxClient.VERSION);

			// Shows the application
			hideSplash();
		}
	} catch (e) {
		hideSplash();

		// Shows an error message if the editor cannot start
		mxUtils.alert('Cannot start MXGraph: ' + e.message);
		throw e; // for debugging
	}

	return editor;

}

export default class MXGraph extends Component {

	/**
	 * Load MXGRAPH PROJECT. CREATE ALL INSTANCES TO WORK
	 * MXEDITOR, MXGRAPH AND CHECK THE CONTAINER TO DROP MINIMAP
	 **/
	cargarConfig() {
		console.log("cargar");
		demoProcess(document.getElementById('graph'), createInstanceMX(), document.getElementById("outlineContainer"));
	}

	render() {

		return (
				// LOAD ON RENDER COMPONENT
				<div id="page" style={{background: backG}} onLoad={this.cargarConfig}>
					<div id="header">
						<div id="headerimg" style={{overflow: "hidden"}}>
							<h1 id="title" style={{color: "black", background: "azure"}}>mxDraw</h1>
						</div>
					</div>
					<div id="mainActions"
					     style={{width: "100%", paddingTop: "8px", paddingLeft: "24px", paddingBottom: "8px"}}>
						<button id="undoButton">Undo</button>
						<button id="redoButton">Redo</button>
					</div>
					<div id="selectActions" style={{width: "100%", paddingLeft: "54px", paddingBottom: "4px"}}>
					</div>
					<div id="graph" className={'obj-process'} tabIndex="-1"
					     style={{position: "relative", height: "480px", width: "1284px", overflow: "hidden", cursor: "default"}}>
						<img alt={"Test"} src={load} style={{display: "none"}}/>
					</div>

					{/*CONTAINER MINIMAP*/}
					<div id="outlineContainer"
					     style={{
						     position: "absolute", overflow: "hidden", top: "36px", right: "0px", width: "200px", height: "140px",
						     background: "transparent", borderStyle: "solid", borderColor: "black"
					     }}>
					</div>
				</div>
		)
	}
}
