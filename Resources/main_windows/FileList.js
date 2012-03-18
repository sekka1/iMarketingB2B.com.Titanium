/////////////////////////////////////////////////
// Display the Friends Lists Function
/////////////////////////////////////////////////
var FileList = {
	isAddedToWin:false,
	tableData:[],
	fileTypeToShow:'all',
	httpClient:Titanium.Network.createHTTPClient(),
	search: search = Titanium.UI.createSearchBar({
			showCancel:true,
			opacity:1.0,
	}),
	tableview:Titanium.UI.createTableView({
			top:60,
			//backgroundImage:'../images/templates/multi-color/MGB-AppBGWatermark.png',
			opacity:1.0,
			search:this.search,
			filterAttribute:'title'
	}),
	blankImage:Titanium.UI.createImageView({ // To cover the logout button
				image:'../images/templates/multi-color/blank_white.png',
				width:Ti.Platform.displayCaps.platformWidth * 0.31,
				height:Ti.Platform.displayCaps.platformHeight * 0.09,
				bottom:5
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
	main:function(){
		
		Ti.API.info( "In FileList" );
		this.getData();
		this.show();
	},
	show:function(){

		// Set Navigation Items
		NavigationBar.titleName.text = 'Files';
		NavigationBar.btnBack.action = 'UserInput';
	
		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it
		
			// Navigation bar
			NavigationBar.show();
		
			this.tableview.data = this.tableData;
			this.tableview.show();
			
			this.blankImage.show();

		} else {
			// This object elements has not been added to the current window.  Add them.
		
			this.isAddedToWin = true;
			
			// Navigation bar
			NavigationBar.show();
			
			// This is to cover up the facebook logout button on subsequent pages
			// I was unable to remove it from the window
			win.add( this.blankImage );
			
			// Table
			win.add(this.tableview);
			
			// Activity Indicator
			win.add( this.actInd );
		}
	},
	hide:function(){
	
		NavigationBar.hide();
		this.tableview.setData([]);
		this.actInd.hide();
		this.tableview.hide();
		this.blankImage.hide();
		this.search.blur();
	},
	getData:function(){

		var url = "https://www.algorithms.io/api/v1";
		Ti.API.info( url );
		
		this.httpClient.onload = function(){
			Ti.API.info( "responseText: " + this.responseText );
			
			FileList.fillRows( this.responseText );
			FileList.actInd.hide();
		};
			
		this.httpClient.open( "POST", url );
		
		var params = {
			'class':'DataSources',
			method:'files',
			authToken:Login.authToken
		};  

        this.httpClient.send( params );
	},
	fillRows:function( result ){

		results = eval('('+result+')');
						
		Ti.API.info( '# of rows: ' + results.data.length );
								 
 		this.tableData = [];
 
 		// Load data into the array
		for (var i=0;i<results.data.length;i++){

			// Perform a regex search on the type to show it or not
			var re = new RegExp(this.fileTypeToShow, 'ig');
			var str = results.data[i].type; 
			var result = re.test(str);
			//Titanium.API.info("result: " +  result);

			if( result ){

				// Loading the tableview this way is way faster than creating a rowview for each item
				this.tableData.push( {title:results.data[i].friendly_name,color:"black",id_seq:results.data[i].id_seq,number:i,font:{fontFamily:'Helvetica Neue',fontSize:30,fontWeight:'bold'}} );
			}
		}
		
		this.tableview.data = this.tableData;
		
		this.tableview.addEventListener('click', function(e){
		
			// Perform a regex search on the type to show it or not
			var re = new RegExp('Auto*', 'ig');
			var str = FileList.fileTypeToShow; 
			var result = re.test(str);
			
			if( result ){
				// Set the category file the user picked
				UserInput.segmentFile_id_seq = e.row.id_seq;
			}
			if( FileList.fileTypeToShow == 'category' ){
				// Set the category file the user picked
				UserInput.categoryFile_id_seq = e.row.id_seq;
			}
			if( FileList.fileTypeToShow == 'application-mapping' ){
				// Set the application-mapping file the user picked
				UserInput.applicationFile_id_seq = e.row.id_seq;
			}
			
		});
	}
};