/////////////////////////////////////////////////
// Display the Product in a webview
/////////////////////////////////////////////////

var RecWebView = {

	DetailPageURL: 'http://www.imarketingb2b.com/photos2/recommendations2?',
	webview:Titanium.UI.createWebView({
		top:60,
		scalesPageToFit:false
	}),
	actInd:Titanium.UI.createActivityIndicator({
			top:5,
			right:15,
			height:50,
			width:10,
			font:{fontFamily:'Helvetica Neue',fontSize:20,fontWeight:'bold'},
			color:'white',
			message:'',
			style:'BIG',
	}),
	main:function(){
	
		// Build URL
		this.DetailPageURL += 'item='+UserInput.item;
		this.DetailPageURL += '&datasource_id_seq='+UserInput.segmentFile_id_seq;
		this.DetailPageURL += '&category_datasource_id_seq='+UserInput.categoryFile_id_seq;
		this.DetailPageURL += '&application_datasource_id_seq='+UserInput.applicationFile_id_seq;
		this.DetailPageURL += '&submit=Get+Recommendations';
		this.DetailPageURL += '&authToken='+Login.authToken;
		
		Ti.API.info( "URL: " + this.DetailPageURL );
		
		this.webview.url = this.DetailPageURL;
		this.show();
	},
	show:function(){
		
		// Set Navigation Title
		NavigationBar.titleName.text = 'Rec';
		NavigationBar.btnBack.action = 'UserInput';
	
		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it
		
			// Navigation bar
			NavigationBar.show();
		} else {
			// This object elements has not been added to the current window.  Add them.
		
			this.isAddedToWin = true;
			
			// Navigation bar
			NavigationBar.show();
			
			// Table
			win.add( this.webview );
			this.webview.hide();
			
			// Activity Indicator
			win.add( this.actInd );
		}
		
		this.webview.addEventListener("beforeload", function(e){
			RecWebView.actInd.show();
		});
		
		this.webview.addEventListener("load", function(e){
			RecWebView.actInd.hide();
			RecWebView.webview.show();
		});
	},
	hide:function(){
	
		this.actInd.hide();
		this.webview.hide();
	}
}