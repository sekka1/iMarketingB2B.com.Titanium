/////////////////////////////////////////////////
// Login Page
/////////////////////////////////////////////////

var Login = {

	isAddedToWin:false,
	nav_bar:'',
	btnBack:'',
	titleName:'',
	httpClient:Titanium.Network.createHTTPClient(),
	authToken:'',
	btnFriendsList:Titanium.UI.createButton({  
		backgroundImage:'../images/templates/multi-color/MGB-AppSearchButton.png',
		backgroundSelectedImage: '../images/templates/multi-color/MGB-AppSearchButtonPressed.png',  
		bottom:Ti.Platform.displayCaps.platformHeight * 0.1,
		left:Ti.Platform.displayCaps.platformWidth * 0.25,
		width:176,  
		height:64,
		borderRadius:1,  
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
	}),
	blankImage:Titanium.UI.createImageView({
				image:'../images/templates/multi-color/blank_white.png',
				width:Ti.Platform.displayCaps.platformWidth * 0.31,
				height:Ti.Platform.displayCaps.platformHeight * 0.09,
				bottom:5
	}),
	// This is for the android.  For some reason the android on wont do the win.setBackground
	backgroundImage:Titanium.UI.createImageView({
				image:'../images/templates/multi-color/MGB-AppSplash.png',
				width:Ti.Platform.displayCaps.platformWidth,
				height:Ti.Platform.displayCaps.platformHeight,
				canScale:false,
				top:0
	}),
	imageLogo:Titanium.UI.createImageView({
				image:'../images/b2b_logo.png',
				//width:Ti.Platform.displayCaps.platformWidth,
				//height:Ti.Platform.displayCaps.platformHeight,
				width:207,
				height:52,
				//canScale:false,
				top:20
	}),
	labelLogin:Titanium.UI.createLabel({  
        text:'Login', 
        top:100,  
        left:30,  
        //width:300,
        borderRadius:0,  
        height:'auto'
    }),
    TextFieldLogin:Titanium.UI.createTextField({  
		color:'#336699',  
		top:135,  
		left:30,  
		width:250,  
		height:40,  
		hintText:'Emal',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
    }),
    TextFieldPassword:Titanium.UI.createTextField({  
		color:'#336699',  
		top:185,  
		left:30,  
		width:250,  
		height:40,  
		hintText:'Password',
		passwordMask:true,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
    }),
    btnSave:Titanium.UI.createButton({  
		title:'Login',  
		top:235,  
		left:30,
		width:50,  
		height:28,
		borderRadius:1,  
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
	}),
	main:function(){
	
		//this.setFacebookOptions();
		this.show();
		this.addEventListeners();
		NavigationBar.hide();
	},
	show:function(){
	
		//win.setBackgroundImage('../images/templates/multi-color/MGB-AppSplash.png');

		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it


			
		} else {
			// This object elements has not been added to the current window.  Add them.
			
			this.isAddedToWin = true;
			
			win.add( this.imageLogo );
			win.add( this.labelLogin );
			win.add( this.TextFieldLogin );
			win.add( this.TextFieldPassword );
			win.add( this.btnSave );
		}
	},
	hide:function(){

		this.imageLogo.hide();
		this.labelLogin.hide();
		this.TextFieldLogin.hide();
		this.TextFieldPassword.hide();
		this.btnSave.hide();
	},
	addEventListeners:function(){
	
		this.btnFriendsList.addEventListener('click', function(){
		
			Login.hide();
			FriendsList.main();
			
		});
		this.btnSave.addEventListener('click', function(){

			var url = "http://www.imarketingb2b.com/login/process?f=/photos/authtoken";
			
			Login.httpClient.onload = function(){
				Ti.API.info( "responseText: " + this.responseText );
				//Ti.API.info( "getResponseHeader: " + client.getResponseHeader( 'Set-Cookie' ) );
				//Ti.API.info( "getResponseHeader: " + client.getResponseHeader( 'Cookie' ) );
				//Ti.API.info( "getAllResponseHeaders: " + client.getAllResponseHeaders() );
				//Ti.API.info( "getResponseText: " + client.getResponseText() );

        		Login.authToken = this.responseText.trim();
        		
        		Ti.API.info( "authToken: " + Login.authToken );   		
        		
        		// Open Next Window
        		Login.hide();
        		FileList.main();
        		
			};
			
			Login.httpClient.open( "POST", url );
			
			//Ti.API.info( "username: " + Login.TextFieldLogin.value + " --password: " + Login.TextFieldPassword.value );
			
			var params = {  
        		username: Login.TextFieldLogin.value,  
        	    password: Login.TextFieldPassword.value,
        	    login:'Login',
        	    referer:'something'
        	};  
        	Login.httpClient.send( params );
		});
	}
}