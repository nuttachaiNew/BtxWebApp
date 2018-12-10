
var UtilJsGrid = new function(){
	_this = this;
	this.jsonOrigin = null;
	this.modifyJson = null;
	this.jsonToBackEnd = null;
	this.jsGridField = null;
	this.deleteJsonList = [];
	this.insertJsonList = [];
	this.updateJsonList = [];

	this.setJsGridField = function(jsGridId){
		this.jsGridField = $("#"+jsGridId);
	}
	this.getJsGridField = function(){
		return this.jsGridField;
	}

	this.setJsonOrigin = function(json){
		this.jsonOrigin = json;
		this.modifyJson = this.jsonOrigin;
	}

	this.getJsonOrigin = function(){
		return jsonOrigin;
	}
  
	this.clearData = function(){
		this.deleteJsonList = [];
		this.insertJsonList = [];
		this.updateJsonList = [];
	}

	this.deleteData = function(selectedList){
		var jsGridTable = this.jsGridField
		var deleteJsonList = [];
		$.each(selectedItems, function(index, item) {
		  jsGridTable.jsGrid("deleteItem", item);
		  if( ValidateFieldUtil.isEmpty(item["action"]) || item["action"] == "UPDATE"  ){
		  	deleteJsonList.push(item);
		  }
      	});
      	this.deleteJsonList.push.apply(this.deleteJsonList,deleteJsonList);
      	console.log(this.deleteJsonList);
	}

	this.setJsonToBackEnd = function(){
		var insertJsonList = [];
		var updateJsonList = [];
		var datafromJsonGrid = this.jsGridField.jsGrid("option","data");
		$.each(datafromJsonGrid,function(index,item){
			if( !ValidateFieldUtil.isEmpty(item["action"]) && item["action"] == "CREATE" ){
				insertJsonList.push(item);
			}else if( !ValidateFieldUtil.isEmpty(item["action"]) && item["action"] == "UPDATE"  ){
				updateJsonList.push(item);
			}
		});
		this.insertJsonList = insertJsonList;
		this.updateJsonList = updateJsonList;
	}

	this.getJsonToBackEnd = function(){
		this.setJsonToBackEnd();
		this.jsonToBackEnd = {
			"CREATE": this.insertJsonList,
			"UPDATE": this.updateJsonList,
			"DELETE": this.deleteJsonList
		};
		return this.jsonToBackEnd ;
	}

	this.setStatusJsGrid = function(args,status){
		var jsonData = args.item;
		if( ValidateFieldUtil.isEmpty(jsonData["action"]) ){
			jsonData["action"] = status;
			this.jsGridField.jsGrid("updateItem",args.item,jsonData);
		}
	}
};

