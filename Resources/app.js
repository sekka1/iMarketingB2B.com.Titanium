// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFF');

Ti.API.info( "Platform: " + Titanium.Platform.name );

/////////////////////////////////////////////
// Global Variables
/////////////////////////////////////////////
var site_url = 'http://www.imarketingb2b.com/';

/////////////////////////////////////////////
// Creating All Windows
/////////////////////////////////////////////
var windowMain = Titanium.UI.createWindow({
	//title:'Main',
	url:'main_windows/main.js',
	exitOnClose: true
});

/////////////////////////////////////////////
// Creating App Objects
/////////////////////////////////////////////

/////////////////////////////////////////////
// Passing Variables to Each Window
/////////////////////////////////////////////

//windowMain.backWindow = windowLogin;
windowMain.site_url = site_url;

/////////////////////////////////////////////
// Open First Window
/////////////////////////////////////////////
windowMain.open();
