# Panzer-Just-Clock.widget

Steampunk Desktop Just Clock  widget, written in Javascript and XML for the Yahoo 
Widget (Konfabulator) Engine. Created for XP, Vista, Win7, 8, 10+ as well as the 
Apple Mac.

This widget is now deprecated and is retained for historical reasons only, it still works but time moves ever onward - please use the VB6 version instead that you will find here: https://github.com/yereverluvinunclebert/Panzer-JustClock-VB6

![justClock-image](https://github.com/yereverluvinunclebert/Panzer-Just-Clock.widget/assets/2788342/62d63250-69bd-4a8f-aea2-9df5258fbb58)

An dieselpunk Panzer Clock widget - I created as a variation of the stopwatch 
clock I had previously created for the World of Tanks and War Thunder 
communities. The Panzer Just Clock widget is a pretty Yahoo widget for your desktop. 
Functional and gorgeous at the same time. The graphics are my own, I took original inspiration from a clock face by Italo 
Fortana. It is all my code with some solid help from Harry Whitfield. 

![panzer-justclock-ywidget-di](https://github.com/yereverluvinunclebert/Panzer-Just-Clock.widget/assets/2788342/26a64120-154b-484f-9214-f355d69eebfa)

Right clicking will bring up a menu of options. Double-clicking on the widget will cause a personalised Windows application to 
fire up. The first time you run it there will be no assigned function and so it 
will state as such and then pop up the preferences so that you can enter the 
command of your choice. The widget takes command line-style commands for 
windows. 

 ![yahoo-logo-small_111](https://github.com/yereverluvinunclebert/Steampunk-MediaPlayer-Ywidget/assets/2788342/c5668608-ab57-4665-a332-3bc9b7e07a9f)

All javascript widgets need an engine to function, in this case the widget uses 
the Yahoo Widget Konfabulator engine. The engine interprets the javascript and 
creates the widget according to the XML description and using the images you 
provide. 

![tank-help-750](https://github.com/yereverluvinunclebert/Panzer-Just-Clock.widget/assets/2788342/59f4cb08-faf5-45c3-b93b-fc8e8084d12d)

This widget was created with the serious coding skills of Harry Whitfield. I 
supplied the graphics, the original code, the concept and idea and steered the 
widget toward its final goal. I also tested the widget, added extra 
functionality and fettled the code for release. Harry built the core 
functionality to my spec. but just did it far better than I would ever have 
done!
 
Built using: 

	RJTextEd Advanced Editor  https://www.rj-texted.se/ 
	Adobe Photoshop CS ver 8.0 (2003)  https://www.adobe.com/uk/products/photoshop/free-trial-download.html  

Tested on :

	ReactOS 0.4.14 32bit on virtualBox    
	Windows 7 Professional 32bit on Intel    
	Windows 7 Ultimate 64bit on Intel    
	Windows 7 Professional 64bit on Intel    
	Windows XP SP3 32bit on Intel    
	Windows 10 Home 64bit on Intel    
	Windows 10 Home 64bit on AMD    
	Windows 11 64bit on Intel 
   
 Dependencies:
 
 o A windows-alike o/s such as Windows XP, 7-11 or Apple Mac OSX 11.   
 o Installation of the yahoo widget SDK runtime engine  
 
	Yahoo widget engine for Windows - https://www.deviantart.com/users/outgoing?http://g6auc.me.uk/ywidgets_sdk_setup.exe  
	Yahoo widget engine for Mac - https://www.deviantart.com/users/outgoing?https://rickyromero.com/widgets/downloads/yahoo-widgets-4.5.2.dmg
 
 Running the widget using a javascript engine frees javascript from running only 
 within the captivity of a browser, you will now be able to run these widgets on 
 your Windows desktop as long as you have the correct widget engine installed.
  
 Instructions for running Yahoo widgets on Windows
 =================================================
 
 1. Install yahoo widget SDK runtime engine
 2. Download the gauge from this repo.
 3. Unzip it
 4. Double-click on the resulting .KON file and it will install and run
 
 Instructions for running Yahoo widgets on Mac OS/X ONLY
 ========================================================
 
 1. Install yahoo widget SDK runtime engine for Mac
 2. Download the gauge from this repo.
 3. Unzip it
 4. For all all recent versions of Mac OS/X including Sierra, edit the following 
 file:
 
 com.yahoo.widgetengine.plist which is in /Users/xxx/Library/Preferences. Look 
 for these lines: 
    
   <key>DockOpen</key>  
   <string>false</string>  
 
 Change to false if it is true.
 
 5. Double-click on the widgets .KON file and it will install and run
 
 Wit these instructions you should be able to start Yahoo! Widgets and the 
 menubar item should appear. Widgets can then be started from the menubar or by 
 double-clicking on the KON file in the usual way.
 

 LICENCE AGREEMENTS:
 
 Copyright 2023 Dean Beedell
 
 In addition to the GNU General Public Licence please be aware that you may use
 any of my own imagery in your own creations but commercially only with my
 permission. In all other non-commercial cases I require a credit to the
 original artist using my name or one of my pseudonyms and a link to my site.
 With regard to the commercial use of incorporated images, permission and a
 licence would need to be obtained from the original owner and creator, ie. me.
 
![about](https://github.com/yereverluvinunclebert/Panzer-Just-Clock.widget/assets/2788342/345d2842-ae8c-41b0-9730-45b0c37ba345)
