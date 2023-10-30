/*
	Panzer Clock Widget

	Created by Dean Beedell
	Original clock concept by Weissboard

	Re-coded by Dean Beedell
	Visuals added to and enhanced by Dean Beedell
	Sorted by Harry Whitfield

	email: dean.beedell@lightquick.co.uk
	http//lightquick.co.uk
*/

/*jslint multivar, this */

/*property
    MouseWheelPref, altKey, busy, clockFaceSwitchPref, clockSize, ctrlKey, data,
    debugflgPref, duration, ease, endAngle, floor, getDate, getHours,
    getMilliseconds, getMinutes, getSeconds, getTime, getTimezoneOffset,
    hOffset, hRegistrationPoint, height, hidden, imageCmdPref, imageEditPref,
    interval, isNaN, kEaseOut, length, mainDLSPref, match, maxLength,
    milliseconds, minLength, onMouseDown, onMouseUp, onMouseWheel, onMultiClick,
    onload, opacity, option, optionListPref1, optionListPref2, platform,
    readFile, rotation, round, scrollDelta, secyDLSPref, setTime, size,
    soundPref, split, src, srcHeight, srcWidth, start, startAngle, startTime,
    tickSwitchPref, ticks, toFixed, toString, tooltip, vOffset,
    vRegistrationPoint, value, visible, width
*/

"use strict";

var mainWindow, background, background2, surround, switchFacesButton, dayOfMonthText, monthText,
		hourHand, hourShadow, minuteHand, minuteShadow, secondHand, secondShadow,
		swMinuteHand, swHourHand, swSecondHand, bigReflection, windowReflection,
		startButton, stopButton, pin, prefs, tankHelp, helpbutton, tickSwitch,
		createLicense, setmenu, theDLSdelta, lprint, smallHourHand, smallMinuteHand,
		helpButton, showFace, mainScreen, settooltip, checkLockWidget,
		dayOfMonthTextAremonthTextyoa, monthTextArea, theTimer, helpWindow, debugFlg, buildVitality,
		updateRAM, performCommand, dayOfMonthTextArea;

var windowx = 785, windowy = 622;
var backxo = 0, backyo = 0, backgroundxo = 0, backgroundyo = 0;
//var background2xo = 0, background2yo = 0;
var surroundxo = 0, surroundyo = 0;
var switchFacesButtonxo = 710, switchFacesButtonyo = 267;
var startButtonxo = 710, startButtonyo = 135;
var stopButtonxo = 710, stopButtonyo = 395;
var secondxo = 416, secondyo = 313, secondxr = 11.5, secondyr = 245.5;
var secondshadowxo = 416, secondshadowyo = 313, secondshadowxr = 22.5, secondshadowyr = 260.5;

//var dayOfMonthTextxo = 527, dayOfMonthTextyo = 416;
//var monthTextxo = 321, monthTextyo = 210;

var monthTextyo = 527, monthTextyo = 416;
var dayOfMonthTextxo = 321, dayOfMonthTextxo = 210;

//var dayOfMonthTextAreaxo = 516, dayOfMonthTextAreayo = 394;
//var monthTextAreaxo = 316, monthTextAreayo = 190;

var monthTextAreayo = 516, monthTextAreayo = 394;
var dayOfMonthTextAreaxo = 316, dayOfMonthTextAreaxo = 190;

var swSecondxo = 525, swSecondyo = 312, swSecondxr = 46.5, swSecondyr = 57;
var swMinutexo = 416, swMinuteyo = 204, swMinutexr = swSecondxr, swMinuteyr = swSecondyr;
var swHourxo = 416, swHouryo = 420, swHourxr = 47, swHouryr = 61;

var shadowOffset = 0;
var hourxo = 416, houryo = secondyo, hourxr = 14, houryr = 163;
var hourshadowxo = 414, hourshadowyo = 320, hourshadowxr = 14, hourshadowyr = 173;
var minshadowxo = 425, minshadowyo = 320, minshadowxr = 14, minshadowyr = 215;
var minxo = 416, minyo = secondyo, minxr = 14, minyr = 215;

var smallhourxo = 498, smallhouryo = 236, smallhourxr = swSecondxr, smallhouryr = swSecondyr;
var smallminutexo = 350, smallminuteyo = 381, smallminutexr = swSecondxr, smallminuteyr = swSecondyr;

var bigReflectionxo = 169, bigReflectionyo = 69;
var windowReflectionxo = 511, windowReflectionyo = 210;

var pinxo = 158, pinyo = 60;

var prefsxo = 158, prefsyo = 516;
var tankHelpxo = 1, tankHelpyo = 1;
var helpButtonxo = 620, helpButtonyo = 516;

var tickSwitchxo = 622, tickSwitchyo = 60;

var stopWatchState = 0;
var startTime, elapsedTime;
var widgetName = widget.name;

var remoteGMTOffset1;
var remoteGMTOffset2;
var tzDelta1;
var tzDelta2;

var tzData;
var dlsData;
var currIcon = "Resources/images/dock.png";

var counter = "Resources/sounds/counter.mp3";
var lock = "Resources/sounds/lock.mp3";
var till = "Resources/sounds/till01.mp3";
var ting = "Resources/sounds/ting.mp3";
var mistake = "Resources/sounds/mistake.wav";
var thhhh = "Resources/sounds/thhhh.mp3";
var winding = "Resources/sounds/winding.mp3";

var widgetName = "Panzer Just Clock.widget";
var debugFlg = "";

include("ES5.js");
include("json2.js");
include("DLScode.js");
include("functions.js");
include("vitality.js");
include("Resources/License/License.js");

tzData = filesystem.readFile("Resources/timezones.txt");
preferences.optionListPref1.option = tzData.split(/\r\n?|\n/);
preferences.optionListPref2.option = tzData.split(/\r\n?|\n/);

if (system.platform === "windows") {
	dlsData = filesystem.readFile("Resources/DLScodesWin.txt");
} else {
	dlsData = filesystem.readFile("Resources/DLScodesMac.txt");
}
preferences.mainDLSPref.option = dlsData.split(/\r\n?|\n/);
preferences.secyDLSPref.option = dlsData.split(/\r\n?|\n/);

helpButton.opacity = 1;
tickSwitch.opacity = 1;

function sizeClock() {
	var scale = Number(preferences.clockSize.value) / 100;

	function sc(img, hOffset, vOffset, hReg, vReg) {
		img.hOffset = Math.round(hOffset * scale);
		img.vOffset = Math.round(vOffset * scale);
		img.width = Math.round(img.srcWidth * scale);
		img.height = Math.round(img.srcHeight * scale);
		if (hReg !== undefined) {
			img.hRegistrationPoint = Math.round(hReg * scale);
		}
		if (vReg !== undefined) {
			img.vRegistrationPoint = Math.round(vReg * scale);
		}
	}

	mainWindow.width = Math.round(windowx * scale);
	mainWindow.height = Math.round(windowy * scale);

	sc(background, backgroundxo, backgroundyo);
	//sc(background2, background2xo, background2yo);
	sc(surround, surroundxo, surroundyo);
	sc(switchFacesButton, switchFacesButtonxo, switchFacesButtonyo);
	sc(startButton, startButtonxo, startButtonyo);
	sc(stopButton, stopButtonxo, stopButtonyo);
	sc(hourHand, hourxo, houryo, hourxr, houryr);
	sc(hourShadow, hourshadowxo + shadowOffset, hourshadowyo + shadowOffset, hourshadowxr, hourshadowyr);
	sc(minuteHand, minxo, minyo, minxr, minyr);
	sc(minuteShadow, minshadowxo + shadowOffset, minshadowyo + shadowOffset, minshadowxr, minshadowyr);
	sc(secondHand, secondxo, secondyo, secondxr, secondyr);
	sc(secondShadow, secondshadowxo + shadowOffset, secondshadowyo + shadowOffset, secondshadowxr, secondshadowyr);

	sc(swSecondHand, swSecondxo, swSecondyo, swSecondxr, swSecondyr);
	sc(swMinuteHand, swMinutexo, swMinuteyo, swMinutexr, swMinuteyr);
	sc(swHourHand, swHourxo, swHouryo, swHourxr, swHouryr);

	sc(smallHourHand, smallhourxo, smallhouryo, smallhourxr, smallhouryr);
	sc(smallMinuteHand, smallminutexo, smallminuteyo, smallminutexr, smallminuteyr);

	sc(bigReflection, bigReflectionxo, bigReflectionyo);
	sc(windowReflection, windowReflectionxo, windowReflectionyo);
	sc(pin, pinxo, pinyo);
	sc(prefs, prefsxo, prefsyo);
	//sc(tankHelp, tankHelpxo, tankHelpyo);
	sc(helpButton, helpButtonxo, helpButtonyo);
	sc(tickSwitch, tickSwitchxo, tickSwitchyo);

	dayOfMonthText.size = Math.round(22 * scale);
	dayOfMonthText.hOffset = Math.round(dayOfMonthTextxo * scale);
	dayOfMonthText.vOffset = Math.round(dayOfMonthTextyo * scale);

	monthText.size = Math.round(22 * scale);
	monthText.hOffset = Math.round(monthTextxo * scale);
	monthText.vOffset = Math.round(monthTextyo * scale);

	dayOfMonthTextArea.size = Math.round(22 * scale);
	dayOfMonthTextArea.hOffset = Math.round(dayOfMonthTextAreaxo * scale);
	dayOfMonthTextArea.vOffset = Math.round(dayOfMonthTextAreayo * scale);

	monthTextArea.size = Math.round(22 * scale);
	monthTextArea.hOffset = Math.round(monthTextAreaxo * scale);
	monthTextArea.vOffset = Math.round(monthTextAreayo * scale);

	if (preferences.soundPref.value !== "disabled") {
		play(thhhh, false);
	}
}

function updateDLS() {
	var dlsRule,
		getRemoteOffset = function (entry) {
			var lookFor = /GMT\u0020([+\-])\u0020(\d\d)\:(\d\d)\u0020[\s\S]*/,
				found = entry.match(lookFor),
				value;

			if (found !== null) {
				value = 60 * parseInt(found[2], 10) + parseInt(found[3], 10);
				return (
					found[1] === "-"
					? -value
					: value
				);
			}
			return null;
		};

	remoteGMTOffset1 = getRemoteOffset(preferences.optionListPref1.value);
	remoteGMTOffset2 = getRemoteOffset(preferences.optionListPref2.value);

	dlsRule = preferences.mainDLSPref.value.split(/\s/)[0];
	tzDelta1 = theDLSdelta(dlsRule, remoteGMTOffset1);

	dlsRule = preferences.secyDLSPref.value.split(/\s/)[0];
	tzDelta2 = theDLSdelta(dlsRule, remoteGMTOffset2);
}

function updateTime() {
	var theDate,
		theHour,
		dockHour,
		theMinutes,
		dockMinutes,
		theSeconds,
		theMilliseconds,
		useSeconds,
		dayOfMonth,
		theDate2,
		theHour2,
		theMinutes2,
		theSeconds2,
		theMilliseconds2,
		useSeconds2,
		secs,
		mins,
		hours,
		optionListPref1,
		optionListPref2,
		localGMTOffset,
		tzDelta,

		displayTime = function (h, m, s) {
			var o = "";

			if (h > 0) {
				o += String(h);
				if (h === 1) {
					o += " hour ";
				} else {
					o += " hours ";
				}
			}
			if ((h > 0) || (m > 0)) {
				o += String(m);
				if (m === 1) {
					o += " minute ";
				} else {
					o += " minutes ";
				}
			}
			o += s.toFixed(1) + " seconds";
			return o;
		},

		rotateObject = function (obj, value) {
			var animationDuration,
				animationInterval = 60,

				updateMe = function () {	// called during rotateAnimation
					var now = animator.milliseconds, fraction, angle;

					if (now >= (this.startTime + this.duration)) {
						obj.rotation = this.endAngle;
						obj.busy = false;
						return false;
					}
					fraction = (now - this.startTime) / this.duration;
					angle = animator.ease(this.startAngle, this.endAngle, fraction, animator.kEaseOut);
					obj.rotation = angle;
					return true;
				},

				rotateAnimation = function (startAngle, endAngle) {
					var rotate = new CustomAnimation(animationInterval, updateMe);
					rotate.duration = animationDuration;
					rotate.startAngle = startAngle;
					rotate.endAngle = endAngle;
					animator.start(rotate);
				};

			obj.busy = true;
			animationDuration = animationInterval * Math.floor(900 / animationInterval - 1);
			rotateAnimation(obj.rotation, value);
		};

	// create a new date object
    theDate = new Date();
	optionListPref1 = preferences.optionListPref1.value;
	if (optionListPref1 !== "System Time") {
        
		localGMTOffset = theDate.getTimezoneOffset();	// for UK this would be 0, for India it would be -330
//        print("%updateTime-I localGMTOffset  " + localGMTOffset);
//        print("%updateTime-I remoteGMTOffset1  " + remoteGMTOffset1);
		
        if (!Number.isNaN(remoteGMTOffset1)) {
			tzDelta = localGMTOffset + remoteGMTOffset1;
            //print("%updateTime-I tzDelta  localGMTOffset + remoteGMTOffset1 " + tzDelta);        
			
            //print("%updateTime-I tzDelta " + tzDelta);   
            // now add the timezone delta obtained from any applicable rule     
            tzDelta += tzDelta1;
            
            
            // print("%updateTime-I tzDelta " + tzDelta);        
			preferences.biasPref.value = tzDelta;
            // set the date to the current time + the deviation converted to seconds
            theDate.setTime(theDate.getTime() + 60000 * tzDelta);            
		}
	}



	theHour = theDate.getHours();
	theMinutes = theDate.getMinutes();
	theSeconds = theDate.getSeconds();
	theMilliseconds = theDate.getMilliseconds();
	useSeconds = Math.round(10 * (theSeconds + (theMilliseconds / 1000))) / 10;
	dayOfMonth = theDate.getDate();
    theMonth = theDate.getMonth() + 1;

	if ((theMinutes % 15 === 0) && (theSeconds === 0) && (theMilliseconds < 100)) {
		lprint("updating DLS: " + theDate.toString());
		updateDLS();
	}




	secondHand.rotation = (
		preferences.tickSwitchPref.value === "smooth"
		? (useSeconds * 6) % 360
		: (Math.floor(useSeconds) * 6) % 360
	);

	secondShadow.rotation = secondHand.rotation;
	minuteHand.rotation = (theMinutes * 6 + useSeconds / 10) % 360;
	minuteShadow.rotation = minuteHand.rotation;
	hourHand.rotation = (theHour * 30 + theMinutes * 0.5) % 360;
	hourShadow.rotation = hourHand.rotation;

	//added rotation of the miniature hands on the dual face
	smallMinuteHand.rotation = (theMinutes2 * 6 + useSeconds2 / 10) % 360;
	smallHourHand.rotation = (theHour2 * 30 + theMinutes2 * 0.5) % 360;

	dockHour = String(theHour);
	dockMinutes = String(theMinutes);
	if (dockHour.length < 2) {
		dockHour = "0" + dockHour;
	}
	if (dockMinutes.length < 2) {
		dockMinutes = "0" + dockMinutes;
	}
	buildVitality("Resources/images/panzer-dock.png", dockHour, dockMinutes);

	dayOfMonthText.data = String(dayOfMonth);
	if (dayOfMonthText.data.length < 2) {
		dayOfMonthText.data = "0" + dayOfMonthText.data;
	}
	dayOfMonthTextArea.data = dayOfMonthText.data;

	monthText.data = String(theMonth);
	if (monthText.data.length < 2) {
		monthText.data = "0" + monthText.data;
	}
	monthTextArea.data = monthText.data;

}

startButton.onMouseDown = function (event) {

	this.opacity = 10;
	updateTime();
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}
};

startButton.onMouseUp = function () {
	this.opacity = 255;
};

prefs.onMouseDown = function () {
	prefs.src = "Resources/images/prefs02.png";
};


prefs.onMouseUp = function () {
	prefs.src = "Resources/images/prefs01.png";
	if (preferences.soundPref.value !== "disabled") {
		play(winding, false);
	}
	showWidgetPreferences();
};

function tankHelpShow() {
	helpWindow.visible = true;
	if (preferences.soundPref.value !== "disabled") {
		play(till, false);
	}
}

helpButton.onMouseDown = function () {
	helpButton.opacity = 255;
};

helpButton.onMouseUp = function () {
	helpButton.opacity = 10;
	tankHelpShow();
};

tankHelp.onMouseDown = function () {
	helpWindow.visible = false;
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}
};

function setTimer() {
	if (preferences.tickSwitchPref.value === "smooth") {
		preferences.tickSwitchPref.value = "tick";
		theTimer.interval = 1.0;
		tickSwitch.tooltip = "Click me to set smooth pointer movement.";
	} else {
		preferences.tickSwitchPref.value = "smooth";
		theTimer.interval = 0.1;
		tickSwitch.tooltip = "Click me to set flick pointer movement.";
	}
	if (preferences.soundPref.value !== "disabled") {
		play(thhhh, false);
	}


}

tickSwitch.onMouseDown = function () {
    tickSwitch.opacity = 255;
	setTimer();
};

tickSwitch.onMouseUp = function () {
	tickSwitch.opacity = 10;
};

stopButton.onMouseDown = function () {

	this.opacity = 10;
};

stopButton.onMouseUp = function () {
	this.opacity = 255;
};

startButton.tooltip = ".";
stopButton.tooltip = "";

//the following function needs to operate on both the background and background2 faces, as the ctrl event can only be caught by the
//onMouseWheel itself on one object the event cannot be referred to by the key click on another object. The function would have to be duplicated
//for the background and background2 objects. Instead I have made the background object opacity to 1 so it seems as if it is not
//visible but it still responds to keyclicks and mousewheel movements even when supposedly 'invisible' - see the showFace function.

background.onMouseWheel = function (event) {					// was background2
	var size = Number(preferences.clockSize.value),
		maxLength = Number(preferences.clockSize.maxLength),
		minLength = Number(preferences.clockSize.minLength),
		ticks = Number(preferences.clockSize.ticks),
		step = Math.round((maxLength - minLength) / (ticks - 1));

	if (event.ctrlKey) {
		if (event.scrollDelta > 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			} else {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			}
		} else if (event.scrollDelta < 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			} else {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			}
		}
		preferences.clockSize.value = String(size);
		sizeClock();
	}
};

//======================================================================================
// Function to make text areas visible rather than text objects
//======================================================================================
function setTextAreas() {
    var isMac = (system.platform === "macintosh");

    dayOfMonthText.visible = !isMac;
    monthText.visible = !isMac;

	dayOfMonthTextArea.visible = isMac;
    monthTextArea.visible = isMac;
}
//=====================
//End function
//=====================

//===============================================================
// this function is
//===============================================================
function updatePrefs() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
		preferences.imageEditPref.hidden = false;
	} else {
		preferences.imageEditPref.hidden = true;
	}

	theTimer.interval = (
		preferences.tickSwitchPref.value === "smooth"
		? 0.1
		: 1.0
	);

	sizeClock();
	mainScreen();
	updateDLS();
	updateTime();
	createLicense(mainWindow);
    setTextAreas();
	showFace();
	setmenu();
	settooltip();
	checkLockWidget();
	buildVitality(currIcon, 0,0); // build the dock vitality

    
}
//=====================
//End function
//=====================


//===============================================================
// this function fires the main event on a double click
//===============================================================
background.onMultiClick = function (event) {
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}

	if (event.ctrlKey) {
        print("updating the display");
        updateRAM();
    } else {
        if (preferences.imageCmdPref.value === "" && system.platform === "macintosh") {
        	preferences.imageCmdPref.value = "/System/Library/PreferencePanes/DateAndTime.prefPane";
        }
        if (preferences.imageCmdPref.value === "" && system.platform === "windows") {
        	preferences.imageCmdPref.value = "%SystemRoot%/system32/timedate.cpl";
        }
    	performCommand("click");
    }
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget loads
//===============================================================
widget.onload = function () {
    updatePrefs();
};
//=====================
//End function
//=====================

widget.onWakeFromSleep = function () {
	reloadWidget();
};

//=====================
//End script.js
//=====================

