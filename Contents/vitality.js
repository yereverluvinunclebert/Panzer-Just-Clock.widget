//===========================================================================
// vitality.js
// UBOAT Widget 1.0
// Written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
//===========================================================================

/*jslint multivar */

/*property
    appendChild, createDocument, createElement, dockOpen, setAttribute,
    setDockItem, src, srcHeight, srcWidth
*/

"use strict";

function buildVitality(bg, d0, d1) {
    var doc, dockItem, dock_bg, x, y, x1, y1;
    var style = "font-family: Arial;font-size: 24px; font-weight: bold; color: #ECDAB4";

	function newDockItem(doc) {
    	var item = doc.createElement("dock-item");

    	item.setAttribute("version", "1.0");
    	return item;
	}

	function newImage(doc, src, hOffset, vOffset, width, height, hAlign, vAlign) {
    	var item = doc.createElement("image");

    	item.setAttribute("src", src);
    	item.setAttribute("hOffset", String(hOffset));
    	item.setAttribute("vOffset", String(vOffset));
    	item.setAttribute("width", String(width));
    	item.setAttribute("height", String(height));
    	item.setAttribute("hAlign", hAlign);
    	item.setAttribute("vAlign", vAlign);
    	return item;
	}

	function newText(doc, hOffset, vOffset, hAlign, vAlign, style, data) {
   		var item = doc.createElement("text");

    	item.setAttribute("hOffset", String(hOffset));
    	item.setAttribute("vOffset", String(vOffset));
    	item.setAttribute("hAlign", hAlign);
    	item.setAttribute("vAlign", vAlign);
    	item.setAttribute("style", style);
    	item.setAttribute("data", data);
    	return item;
    }

    if (!widget.dockOpen) {
        return;
    }

    doc = XMLDOM.createDocument();

    dockItem = newDockItem(doc);
    doc.appendChild(dockItem);

    dock_bg = newImage(doc, bg, 0, 0, 75, 72, "left", "top");
    dockItem.appendChild(dock_bg);

   	x = newText(doc, 15, 42, "center", "center", style, d0[0]);
    dockItem.appendChild(x);

    x1 = newText(doc, 29, 42, "center", "center", style, d0[1]);
    dockItem.appendChild(x1);

   	y = newText(doc, 46, 42, "center", "center", style, d1[0]);
    dockItem.appendChild(y);

    y1 = newText(doc, 60, 42, "center", "center", style, d1[1]);
    dockItem.appendChild(y1);

   	widget.setDockItem(doc, "fade");
    return;
}
