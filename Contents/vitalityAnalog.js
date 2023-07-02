/*jslint multivar */

"use strict";

function buildVitality(hrsRotation, minsRotation, secsRotation, smallHrsRotation, smallMinsRotation) {
    var doc, dockItem;
	var base = "Resources/images/";
	var src1 = base + "Background_nostrap.png";
	var src2 = base + "surround.png";
	var src3 = base + "smallhour.png";
	var src4 = base + "Small1B.png";
	var src5 = base + "Hour.png";
	var src6 = base + "Minute.png";
	var src7 = base + "DockSecond.png";

	var background, surround, hourHand, minuteHand, secondHand, smallHourHand, smallMinuteHand;

	function newDockItem(doc) {
    	var item = doc.createElement("dock-item");

    	item.setAttribute("version", "1.0");
    	return item;
	}

	function newImage(doc, src, hOffset, vOffset, width, height, hAlign, vAlign, hReg, vReg, rotation) {
    	var item = doc.createElement("image");

    	hReg = hReg || 0;
    	vReg = vReg || 0;
    	rotation = rotation || 0;

    	item.setAttribute("src", src);
    	item.setAttribute("hOffset", String(hOffset));
    	item.setAttribute("vOffset", String(vOffset));
    	item.setAttribute("width", String(width));
    	item.setAttribute("height", String(height));
    	item.setAttribute("hAlign", hAlign);
    	item.setAttribute("vAlign", vAlign);

   		item.setAttribute("hRegistrationPoint", String(hReg));
   		item.setAttribute("vRegistrationPoint", String(vReg));
   		item.setAttribute("rotation", String(rotation));
    	return item;
	}

    if (!widget.dockOpen) {
        return;
    }

    doc = XMLDOM.createDocument();

    dockItem = newDockItem(doc);
    doc.appendChild(dockItem);

	background = newImage(doc, src1, 0, 4, 75.5, 66.0, "left", "top");
	dockItem.appendChild(background);

	surround = newImage(doc, src2, 0, 4, 75.5, 66, "left", "top");
	dockItem.appendChild(surround);

	smallHourHand = newImage(doc, src3, 49.8, 27.6, 9.3, 9.3, "left", "top", 4.65, 5.7, smallHrsRotation);
	dockItem.appendChild(smallHourHand);

	smallMinuteHand = newImage(doc, src4, 35.0, 42.1, 9.3, 9.3, "left", "top", 4.65, 5.7, smallMinsRotation);
	dockItem.appendChild(smallMinuteHand);

	hourHand = newImage(doc, src5, 41.6, 35.3, 2.8, 20.3, "left", "top", 1.4, 16.3, hrsRotation);
	dockItem.appendChild(hourHand);

	minuteHand = newImage(doc, src6, 41.6, 35.3, 2.8, 25.4, "left", "top", 1.4, 21.5, minsRotation);
	dockItem.appendChild(minuteHand);

	secondHand = newImage(doc, src7, 41.6, 35.3, 4.6, 31.8, "left", "top", 2.3, 24.5, secsRotation);
	dockItem.appendChild(secondHand);

	widget.setDockItem(doc, "fade");
}
