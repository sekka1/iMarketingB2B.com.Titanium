/////////////////////////////////////////////////
// Display the Friends Lists Function
/////////////////////////////////////////////////
var Recommendations = {
	isAddedToWin:false,
	field_mapped_value:'',
	datasource_id_seq:'',
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
		
		this.getData();
		this.show();
	},
	show:function(){
	
		// Set Navigation Items
		NavigationBar.titleName.text = 'Rec';
		NavigationBar.btnBack.action = 'Items';
	
		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it
		
			// Navigation bar
			NavigationBar.show();
		
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

		var url = "http://www.imarketingb2b.com/photos/getrecjson";
		
		this.httpClient.onload = function(){
			Ti.API.info( "responseText: " + this.responseText );
			
			Recommendations.fillRows( this.responseText );
			Recommendations.actInd.hide();
		};
			
		this.httpClient.open( "POST", url );
			
		var params = {
			'class':'Algorithms',
			method:'simItemLogLikelihoodNoPref',
			datasource_id_seq:this.datasource_id_seq,
			algorithm:'simItemLogLikelihoodNoPref',
			type:'item_id',
			customer_name:'',
			part_name:'one',
			field_mapped_value:this.field_mapped_value,
			authToken:Login.authToken
		};  

        this.httpClient.send( params );
	},
	fillRows:function( result ){

		results = eval('('+result+')');
						
		Ti.API.info( '# of rows: ' + results.length );
								 
 		var tableData = [];

 		// Load data into the array
		for (var i=0;i<results.length;i++){

			// Loading the tableview this way is way faster than creating a rowview for each item
			tableData.push( {title:results[i]['part number'],hasChild:false,color:"black",font:{fontFamily:'Helvetica Neue',fontSize:30,fontWeight:'bold'}} );
		}

		this.tableview.data = tableData;
/*
		this.tableview.addEventListener('click', function(e){
		
			Items.hide();
			
			Recommendations.tableViewCurrentSelectedRow = e.row.number;
			Recommendations.id_seq = e.row.id_seq;
			Recommendations.main();
		});
*/
	}
};