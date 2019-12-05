import {mxConstants, mxEdgeStyle} from "mxgraph-js";

export function Elements(graph){

	// styles
	let style = graph.getStylesheet().getDefaultEdgeStyle();
	style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;

	// Start
	let start = {};
	start[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
	// style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	start[mxConstants.STYLE_FILLCOLOR] = '#99e874';
	start[mxConstants.STYLE_IMAGE] = "";
	start[mxConstants.STYLE_SHADOW] = true;
	start[mxConstants.STYLE_FONTSIZE] = 16;
	graph.getStylesheet().putCellStyle('start', start);

	// Condition
	let condition = {};
	condition[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
	condition[mxConstants.STYLE_ROUNDED] = true;
	condition[mxConstants.STYLE_FILLCOLOR] = '#E8962E';
	condition[mxConstants.STYLE_GRADIENTCOLOR] = '#F2C1CD';
	condition[mxConstants.STYLE_GRADIENTDIRECTION] = 'south';
	condition[mxConstants.STYLE_STRIKECOLOR] = 'darkorange';
	condition[mxConstants.STYLE_FONTCOLOR] = 'navy';
	condition[mxConstants.STYLE_SHADOW] = true;
	condition[mxConstants.STYLE_FONTSIZE] = 16;
	graph.getStylesheet().putCellStyle('condition', condition);

	// Process
	style = {};
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
	style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_FILLCOLOR] = '#95B8D3';
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#AFCCE3';
	style[mxConstants.STYLE_GRADIENTDIRECTION] = 'south';
	style[mxConstants.STYLE_FONTCOLOR] = 'navy';
	style[mxConstants.STYLE_SHADOW] = true;
	style[mxConstants.STYLE_FONTSIZE] = 16;
	graph.getStylesheet().putCellStyle('object', style);

	// End
	let end_style = {};
	end_style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
	end_style[mxConstants.STYLE_FILLCOLOR] = 'red';
	end_style[mxConstants.STYLE_FONTCOLOR] = 'white';
	end_style[mxConstants.STYLE_FONTSIZE] = 14;
	end_style[mxConstants.STYLE_SHADOW] = true;
	graph.getStylesheet().putCellStyle('end', end_style);

	// Edges
	let styleEdge = {};
	styleEdge[mxConstants.STYLE_FONTSIZE] = 16;
	styleEdge[mxConstants.STYLE_FILLCOLOR] = 'white';
	styleEdge[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
	styleEdge[mxConstants.STYLE_STROKECOLOR] = '#030001';
	styleEdge[mxConstants.STYLE_STROKEWIDTH] = 1.5;
	graph.getStylesheet().putCellStyle("edge", styleEdge);


	style = {};
	style[mxConstants.STYLE_FONTSIZE] = 16;
	style[mxConstants.STYLE_FILLCOLOR] = 'white';
	style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
	style[mxConstants.STYLE_STROKECOLOR] = '#e81717';
	style[mxConstants.STYLE_STROKEWIDTH] = 1.5;
	graph.getStylesheet().putCellStyle("falseEdge", style);


	style = {};
	style[mxConstants.STYLE_FONTSIZE] = 16;
	style[mxConstants.STYLE_FILLCOLOR] = 'white';
	style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
	style[mxConstants.STYLE_STROKECOLOR] = '#16ea16';
	style[mxConstants.STYLE_STROKEWIDTH] = 1.5;
	graph.getStylesheet().putCellStyle("trueEdge", style);

}
