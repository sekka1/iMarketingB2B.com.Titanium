/////////////////////////////////////////////////
// Display the Friends Lists Function
/////////////////////////////////////////////////
var UserInput = {
	isAddedToWin:false,
	tableData:[],
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
	labelPartNumber:Titanium.UI.createLabel({  
        text:'Part #:', 
        top:100,  
        left:30,  
        //width:300,
        borderRadius:0,  
        height:'auto'
    }),
    textFieldPartNumber:Titanium.UI.createTextField({  
		color:'#336699',  
		top:135,  
		left:30,  
		width:250,  
		height:40,  
		hintText:'Enter A Part Number',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
    }),
    myPic:Ti.UI.createPicker({
  top:150
}),
	main:function(){
		
		Ti.API.info( "In UserINput" );
//		this.getData();
//		this.show();
	
var data = [];
data[0]=Ti.UI.createPickerRow({title:'Bananas',custom_item:'b'});
data[1]=Ti.UI.createPickerRow({title:'Strawberries',custom_item:'s'});
data[2]=Ti.UI.createPickerRow({title:'Mangos',custom_item:'m'});
data[3]=Ti.UI.createPickerRow({title:'Grapes',custom_item:'g'});

var picker = Ti.UI.createPicker({
  top:150
});
alert('hi');
picker.add(data);
win.add( picker );
alert('hi');
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
			this.textFieldPartNumber.show();
			
		} else {
			// This object elements has not been added to the current window.  Add them.
		
			this.isAddedToWin = true;
			
			// Navigation bar
			NavigationBar.show();
			
			//win.add( this.labelPartNumber );
			win.add( this.textFieldPartNumber );
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

		var url = "https://www.algorithms.io/data/index";
		Ti.API.info( url );
		
		this.httpClient.onload = function(){
			Ti.API.info( "responseText: " + this.responseText );
			
			//FileList.fillRows( this.responseText );
			UserInput.actInd.hide();
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
						
		Ti.API.info( '# of rows: ' + results.length );
								 
 		this.tableData = [];
 
 		// Load data into the array
		for (var i=0;i<results.length;i++){

			// Loading the tableview this way is way faster than creating a rowview for each item
			this.tableData.push( {title:results[i].friendly_name,hasChild:true,color:"black",id_seq:results[i].id_seq,number:i,font:{fontFamily:'Helvetica Neue',fontSize:30,fontWeight:'bold'}} );
		}
		
		this.tableview.data = this.tableData;
		
		this.tableview.addEventListener('click', function(e){
		
			FileList.hide();
			
			Items.tableViewCurrentSelectedRow = e.row.number;
			Items.datasource_id_seq = e.row.id_seq;
			Items.main();
		});
	}
};