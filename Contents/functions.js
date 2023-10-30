//===========================================================================
// functions.js
// Panzer Clock widget  1.1
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================

/*jslint multivar */

/*property
    altKey, clockFaceSwitchPref, event, hLocationPercPref, hOffset, height,
    hoffset, imageCmdPref, imageEditPref, landscapeHoffsetPref,
    landscapeVoffsetPref, locked, onMouseDown, opacity, open, openFilePref,
    platform, portraitHoffsetPref, portraitVoffsetPref, soundPref, tooltip,
    tooltipPref, vLocationPercPref, vOffset, value, visible, voffset,
    widgetHideModePref, widgetLockLandscapeModePref, widgetLockPortraitModePref,
    width
*/

"use strict";

var mainWindow, switchFaces, prefs, till, mistake, helpButton, background2, background,
		smallHourHand, smallMinuteHand, swSecondHand, swMinuteHand, swHourHand,
		dayOfMonthText, monthTextxo, monthTextyo, sizeClock,
		pin, lock, stopWatchState, dayOfMonthTextArea, dayOfMonthTextxo, dayOfMonthTextyo,
		monthTextAreaxo, monthTextAreayo, dayOfMonthTextAreaxo, dayOfMonthTextAreayo,
		monthTextArea, monthTextAreayo, monthText, aspectRatio, tingingSound,
		startButton, stopButton, switchFacesButton, tickSwitch;


include("setMenu.js");

//======================================================================================
// Function to move the main_window onto the main screen - called on startup and by timer
//======================================================================================
function mainScreen() {
// if the widget is off screen then move into the viewable window

    print("****************MAINSCREEN********************");

    // check for aspect ratio and determine whether it is in portrait or landscape mode
    if (screen.width > screen.height) {
        aspectRatio = "landscape";
    } else {
        aspectRatio = "portrait";
    }
    print("screen.width " + screen.width);
    print("screen.height " + screen.height);
    print("aspectRatio " + aspectRatio);
    // check if the widget has a lock for the screen type.
    if (aspectRatio === "landscape") {
        if (preferences.widgetLockLandscapeModePref.value === "enabled") {
            mainWindow.hoffset = preferences.landscapeHoffsetPref.value;
            mainWindow.voffset = preferences.landscapeVoffsetPref.value;
        }
        if (preferences.widgetHideModePref.value === "landscape") {
            print("Hiding the widget for landscape mode");
            widget.visible = false;
        } else {
            widget.visible = true;
        }
    }
    // check if the widget has a lock for the screen type.
    if (aspectRatio === "portrait") {
        if (preferences.widgetLockPortraitModePref.value === "enabled") {
            mainWindow.hoffset = preferences.portraitHoffsetPref.value;
            mainWindow.voffset = preferences.portraitVoffsetPref.value;
        }
        if (preferences.widgetHideModePref.value === "portrait") {
            print("Hiding the widget for portrait mode");
            widget.visible = false;
        } else {
            widget.visible = true;
        }
    }

    if (mainWindow.hOffset < 0) {
        mainWindow.hOffset = 10;
    }
    if (mainWindow.vOffset < 0) {
        mainWindow.vOffset = 0; // avoid Mac toolbar
    }
    if (mainWindow.hOffset > screen.width - 50) { //adjust for the extra width of the help page
        mainWindow.hOffset = screen.width - mainWindow.width + 220;
    }
    if (mainWindow.vOffset > screen.height - 150) {  //adjust for the extra height of the help page
        mainWindow.vOffset = screen.height - mainWindow.height; // avoid Mac toolbar
    }

    // calculate the current hlocation in % of the screen
    //store the current hlocation in % of the screen
    if (preferences.hLocationPercPref.value !== "") {
        preferences.hLocationPercPref.value = String((mainWindow.hoffset / screen.width) * 100);
    }
    if (preferences.vLocationPercPref.value !== "") {
        preferences.vLocationPercPref.value = String((mainWindow.voffset / screen.height) * 100);
    }

}
//=====================
//End function
//=====================

//=====================
// function to carry out a command
//=====================
function performCommand(method) {
    var answer;

    if (preferences.soundPref.value === "enabled") {
        play(tingingSound, false);
    }

    if (system.event.altKey) { // filesystem.open() call
        if (preferences.openFilePref.value === "") {
            answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
            if (answer === 1) {
                showWidgetPreferences();
            }
            return;
        }
        filesystem.open(preferences.openFilePref.value);
    } else { // runCommandInBg() call
        if (preferences.imageCmdPref.value === "") {
            answer = alert("This widget has not been assigned a double-click function. You need to open the preferences and enter a run command for this widget. Do you wish to proceed?", "Open Preferences", "No Thanks");
            if (answer === 1) {
                showWidgetPreferences();
            }
            return;
        }
        print("method " + method);
        if (method === "menu") {
            runCommandInBg(preferences.imageEditPref.value, "runningTask");
        } else {
            runCommandInBg(preferences.imageCmdPref.value, "runningTask");
        }
    }
}
//=====================
//End function
//=====================

//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
    //uses the contents of imageEditPref to initiate your default editor
	performCommand("menu");
    //}
}
//=====================
//End function
//=====================

//==============================================================
// this function sets the tooltips
//==============================================================
function settooltip() {
    print("settooltip");
    print("preferences.tooltipPref.value " + preferences.tooltipPref.value);
    if (preferences.tooltipPref.value === "enabled") {
        startButton.tooltip = "Press to restart a stopped gauge.";
        stopButton.tooltip = "Press to stop the gauge functionality.";
        switchFacesButton.tooltip = "Non-functional button";	// "Press to switch the dial faces.";
        prefs.tooltip = "Press to open the widget preferences";
        helpButton.tooltip = "Press for a little help";
        pin.tooltip = "Press to lock the widget in place";
        tickSwitch.tooltip = "Choose smooth movement or regular ticks";
        background.tooltip = "CTRL+mouse scrollwheel up/down to resize";
    } else {
        background.tooltip = "";
        startButton.tooltip = "";
        stopButton.tooltip = "";
        switchFacesButton.tooltip = "";
        prefs.tooltip = "";
        helpButton.tooltip = "";
        pin.tooltip = "";
        tickSwitch.tooltip = "";
    }
}
//=====================
//End function
//=====================

//===========================================
// this function shows one face or the other
//===========================================
function showFace() {
    var isMac = (system.platform === "macintosh");
    var scale = Number(preferences.clockSize.value) / 100;

    if (preferences.clockFaceSwitchPref.value === "stopwatch") {
        //background2.visible = true; //false by default
        //background2.opacity = 255;  //using opacity rather than visible property to maintain click-through
        background.visible = false; //dual
        smallHourHand.visible = false;
        smallMinuteHand.visible = false;

        swSecondHand.visible = true;
        swMinuteHand.visible = true;
        swHourHand.visible = true;

        dayOfMonthText.visible = false;
        dayOfMonthTextArea.visible = false;
        dayOfMonthText.tooltip = "";
        dayOfMonthTextArea.tooltip = "";

        monthTextxo = 262;
        monthTextyo = 322;

        monthTextAreaxo = 246 + 8 * scale;	// mac only
        monthTextAreayo = 302;

        monthText.visible = !isMac;
        monthTextArea.visible = isMac;
    } else {
        //background2.opacity = 1;    // a widget cannot mouse-through to a layer below so an alternative is to set opacity to 1. This allows
                                    // us to catch the ctrl+mousewheel event on the alternative face.
        background.visible = true;  //dual
        smallHourHand.visible = false;
        smallMinuteHand.visible = false;

        swSecondHand.visible = false;
        swMinuteHand.visible = false;
        swHourHand.visible = false;

        dayOfMonthText.visible = !isMac;
        dayOfMonthTextArea.visible = isMac;
        if (isMac) {
            dayOfMonthTextArea.tooltip = "The Date.";
        } else {
            dayOfMonthText.tooltip = "The Date.";
        }
        dayOfMonthTextxo = 527;
        dayOfMonthTextyo = 416;

        dayOfMonthTextAreaxo = 508 + 8 * scale;	// mac only
        dayOfMonthTextAreayo = 394;

        monthTextxo = 325;
        monthTextyo = 210;

        monthTextAreaxo = 308 + 8 * scale;	// mac only
        monthTextAreayo = 190;

        monthText.visible = !isMac;
        monthTextArea.visible = isMac;
    }
    if (isMac) {
        monthTextArea.tooltip = "The Month.";
    } else {
        monthText.tooltip = "The Month.";
    }
    sizeClock();
}
//=====================
//End function
//=====================

//===========================================
// this function sets the face type to display
//===========================================
switchFacesButton.onMouseDown = function () {
    //print("clockfunction before "+ clockFunction);

//    if (preferences.clockFaceSwitchPref.value === "standard") {
//        preferences.clockFaceSwitchPref.value = "stopwatch";
//    } else {
//        preferences.clockFaceSwitchPref.value = "standard";
//    }
    if (preferences.soundPref.value !== "disabled") {
        play(till, false);
    }

    showFace();
};
//=====================
//End function
//=====================

//======================================================================================
// Function to lock the widget
//======================================================================================
function lockWidget() {
    // check for aspect ratio and determine whether it is in portrait or landscape mode
    if (screen.width > screen.height) {
        aspectRatio = "landscape";
    } else {
        aspectRatio = "portrait";
    }
    if (mainWindow.locked) {
        pin.opacity = 1;
        mainWindow.locked = false;

        // check if the widget has a lock for the screen type.
        if (aspectRatio === "landscape") {
            preferences.widgetLockLandscapeModePref.value = "disabled";
        }
        // check if the widget has a lock for the screen type.
        if (aspectRatio === "portrait") {
            preferences.widgetLockPortraitModePref.value = "disabled";
        }
        pin.tooltip = "click me to lock the widget in place";
        //screw2.tooltip="click me to lock the widget in place";
        //paper.tooltip="";
        //woodSurround.tooltip="";
    } else {
        pin.opacity = 255;
        mainWindow.locked = true;

        // check if the widget has a lock for the screen type.
        if (aspectRatio === "landscape") {
            preferences.widgetLockLandscapeModePref.value = "enabled";
            preferences.landscapeHoffsetPref.value = mainWindow.hoffset;
            preferences.landscapeVoffsetPref.value = mainWindow.voffset;
        }
        // check if the widget has a lock for the screen type.
        if (aspectRatio === "portrait") {
            preferences.widgetLockPortraitModePref.value = "enabled";
            preferences.portraitHoffsetPref.value = mainWindow.hoffset;
            preferences.portraitVoffsetPref.value = mainWindow.voffset;
        }
        pin.tooltip = "click me to unlock";

        //screw2.tooltip="click me to unlock";
        //paper.tooltip=woodSurround.tooltip="The widget is currently locked in place - click on the screw to release";

    }
    if (preferences.soundPref.value !== "disabled") {
        play(lock, false);
    }
}
//=====================
//End function
//=====================

//==============================
// unlocks the widget
//==============================
pin.onMouseDown = function () {
    lockWidget();
};
//==============================
//
//==============================

//======================================================================================
// Function to lock the widget on startup
//======================================================================================
function checkLockWidget() {
    // check for aspect ratio and determine whether it is in portrait or landscape mode
    if (screen.width > screen.height) {
        aspectRatio = "landscape";
    } else {
        aspectRatio = "portrait";
    }
    print("aspectRatio " + aspectRatio);
    print("preferences.widgetLockLandscapeModePref.value " + preferences.widgetLockLandscapeModePref.value);
    print("preferences.widgetLockPortraitModePref.value " + preferences.widgetLockPortraitModePref.value);
    // check if the widget has a lock for the screen type.
    if (aspectRatio === "landscape") {
        if (preferences.widgetLockLandscapeModePref.value === "disabled") {
            pin.opacity = 1;
            mainWindow.locked = false;
            // this does not work yet
            pin.tooltip = "click me to lock the widget in place";
            //screw2.tooltip="click me to lock the widget in place";
            return;
        }
        print("checkLockWidget locking in landscape");
        pin.opacity = 255;
        mainWindow.locked = true;
        // check if the widget has a lock for the screen type.
        pin.tooltip = "click me to unlock";
    }
    // check if the widget has a lock for the screen type.
    if (aspectRatio === "portrait") {
        if (preferences.widgetLockPortraitModePref.value === "disabled") {
            pin.opacity = 1;
            mainWindow.locked = false;
            // this does not work yet
            pin.tooltip = "click me to lock the widget in place";
            //screw2.tooltip="click me to lock the widget in place";
        } else {
            print("checkLockWidget locking in portrait");
            pin.opacity = 255;
            mainWindow.locked = true;
            // check if the widget has a lock for the screen type.
            pin.tooltip = "click me to unlock";
        }
    }
}
//=====================
//End function
//=====================

//======================================================================================
// END script functions.js
//======================================================================================
