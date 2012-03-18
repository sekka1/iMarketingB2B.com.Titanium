/////////////////////////////////////////////////
// Display the Friends Lists Function
/////////////////////////////////////////////////
var UserInput = {
	isAddedToWin:false,
	tableData:[],
	item:'',
	segmentFile_id_seq:'',
	applicationFile_id_seq:'',
	categoryFile_id_seq:'',
	httpClient:Titanium.Network.createHTTPClient(),
	tableview:Titanium.UI.createTableView({
			top:60,
			//backgroundImage:'../images/templates/multi-color/MGB-AppBGWatermark.png',
			opacity:1.0,
			search:this.search,
			filterAttribute:'title'
	}),
	actInd:Titanium.UI.createActivityIndicator({
			top:5,
			right:20,
			height:50,
			width:10,
			font:{fontFamily:'Helvetica Neue',fontSize:20,fontWeight:'bold'},
			color:'white',
			message:'',
			style:'BIG',
	}),
    textFieldPartNumber:Titanium.UI.createTextField({  
		color:'#336699',  
		top:70,  
		left:30,  
		width:250,  
		height:40,  
		hintText:'Enter A Part Number',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
    }),
    btnSegment:Titanium.UI.createButton({  
		title:'Set Segment',  
		top:130,  
		left:30,
		width:250,  
		height:40,
		borderRadius:1,  
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	}),
    btnCategory:Titanium.UI.createButton({  
		title:'Set Category',  
		top:200,  
		left:30,
		width:250,  
		height:40,
		borderRadius:1,  
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	}),
    btnApplication:Titanium.UI.createButton({  
		title:'Set Application',  
		top:265,  
		left:30,
		width:250,  
		height:40,
		borderRadius:1,  
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	}),
    btnGo:Titanium.UI.createButton({  
		title:'Get Recommendation',  
		top:330,  
		left:30,
		width:250,  
		height:40,
		borderRadius:1,  
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	}),
	main:function(){
		
		Ti.API.info( "In UserINput" );
//		this.getData();
		this.show();
		this.addEventListeners();

	},
	show:function(){

		// Set Navigation Items
		NavigationBar.titleName.text = 'Rec Input';
		NavigationBar.btnBack.action = 'none';
	
		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it
		
			// Navigation bar
			NavigationBar.show();
		
			//this.labelPartNumber.show();
			this.btnSegment.show();
			this.textFieldPartNumber.show();
			this.btnCategory.show();
			this.btnApplication.show();
			this.btnGo.show();
			
			Ti.API.info( "segmentFile_id_seq: " + this.segmentFile_id_seq );
			Ti.API.info( "applicationFile_id_seq: " + this.applicationFile_id_seq );
			Ti.API.info( "categoryFile_id_seq: " + this.categoryFile_id_seq );
			
		} else {
			// This object elements has not been added to the current window.  Add them.
		
			this.isAddedToWin = true;
			
			// Navigation bar
			NavigationBar.show();
			
			//win.add( this.labelPartNumber );
			win.add( this.btnSegment );
			win.add( this.textFieldPartNumber );
			win.add( this.btnCategory );
			win.add( this.btnApplication );
			win.add( this.btnGo );
		}
	},
	hide:function(){
	
		NavigationBar.hide();
		this.btnSegment.hide();
		this.textFieldPartNumber.hide();
		this.btnCategory.hide();
		this.btnApplication.hide();
		this.btnGo.hide();
	},
	addEventListeners:function(){
		// Add various event listener for this page
		
		this.btnSegment.addEventListener('click', function(){
			// Goto Category Page
			
			this.hide();
			FileList.fileTypeToShow = 'Auto*';
			FileList.main();
			
		});	
		this.btnCategory.addEventListener('click', function(){
			// Goto Category Page
			
			this.hide();
			FileList.fileTypeToShow = 'category';
			FileList.main();
			
		});
		this.btnApplication.addEventListener('click', function(){
			// Goto Application Page
			
			this.hide();
			FileList.fileTypeToShow = 'application-mapping';
			FileList.main();
			
		});
		this.btnGo.addEventListener('click', function(){
			// Goto Get Recommendation Page
			
			UserInput.item = UserInput.textFieldPartNumber.value;
			this.hide();
			RecWebView.main();
		});
	}
};