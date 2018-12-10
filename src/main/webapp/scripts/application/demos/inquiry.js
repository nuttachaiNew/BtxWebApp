var $tagAalertPanel = $("#aPanelAlert");
var $iconCollapseAlert = $("span#iconCollapseAlert");
var $btnSuccess = $("button#success");
var $btnWarning = $("button#warning");
var $btnError = $("button#error");
var $btnSave = $("button#btnSave");
var $dataGrid = $("tbody#dataGrid");
var $table = $("table");
var $toggleTag = $("a[name=toggle]");
var $btnDelete = $("button#btnDelete");
var message ={};
message['msg'] = 'Message';
var $divJsGrid = $("#jsGrid");
var searchValue = 0;
var listJsonData = [];
var selectedItems = [];
var clients = [
    { "id": 1 , "name": "Otto Clay", "age": 25, "country": 1, "address": "Ap #897-1459 Quam Avenue", "married": false },
    { "id": 2 , "name": "Connor Johnston", "age": 45, "country": 2, "address": "Ap #370-4647 Dis Av.", "married": true },
    { "id": 3 , "name": "Lacey Hess", "age": 29, "country": 3, "address": "Ap #365-8835 Integer St.", "married": false },
    { "id": 4 ,"name": "Timothy Henson", "age": 56, "country": 1, "address": "911-5143 Luctus Ave", "married": true },
    { "id": 5 ,"name": "Ramona Benton", "age": 32, "country": 3, "address": "Ap #614-689 Vehicula Street", "married": false }
];
 var countries = [
    { Name: "", Id: 0 },
    { Name: "United States", Id: 1 },
    { Name: "Canada", Id: 2 },
    { Name: "United Kingdom", Id: 3 }
];

var objectJsGrid = $.extend( {} , UtilJsGrid); 
var object = $.extend({}, UtilPagination);

$(document).ready(function () {
	initEvent();
	// window.print();

});



function initEvent(){

    loadData('code','asc');
   	// $("table").tablesorter();


    $("#money").autoNumeric('init');
	
	$toggleTag.click(function(){
		$iconCollapseAlert = $(this).find("span");
		   var checkIcon = $iconCollapseAlert.hasClass('fa-caret-down');
	   if(checkIcon==true){
	   	 $iconCollapseAlert.removeClass('fa-caret-down');
	   	 $iconCollapseAlert.addClass('fa-caret-up');

	   }else{
	   	 $iconCollapseAlert.removeClass('fa-caret-up');
	   	 $iconCollapseAlert.addClass('fa-caret-down');
	   }

	});


	$btnSuccess.click(function(){
			swal({
			  title:message['msg'],
			  text:"aaaa",
			  type: "success",
			  showCancelButton: false,
  			  showConfirmButton: true,
			  closeOnConfirm: true
			},function(){
				// call back function

				
			});
	});


	$btnWarning.click(function(){
			 swal({
			  title: message['msg'],
			  type: "warning",
		     confirmButtonColor: '#3085d6',
			},
			function(){	
				// call back function
 			});
	});

	$btnError.click(function(){
			 swal({
			  title: message['msg'],
			  type: "error",
		     confirmButtonColor: '#3085d6',
			},
			function(){	
				// call back function
 			});
	});

	renderJsgrid();

}

function mockup(){
	var data = [{
		"id":1,
		"code": "mock1",
		"engName": "mockData",
		"referenceName":null,
		"createDate":null,
		"moneyVar1":5000
	}
	];
	return data;
}

function loadData(orderBy,sortBy){
	 $('.dv-background').show();

	 var criteriaObject = {
        orderBy:orderBy,
	    sortBy : sortBy
    };

    object.setId("#paggingSearchMain");
    object.setUrlData("/demos/listDemoApplicationOrderByParam");
    object.setUrlSize("/demos/listDemoApplicationOrderByParamSize");





    object.loadTable = function (items) {
		if(items.length == 0 ){
			items = mockup();
		}

		renderData(items);

    }

	var criteriaObject = {
        orderBy:orderBy,
	    sortBy : sortBy
    };

    object.setDataSearch(criteriaObject);
    object.search(object);
	object.setDisplayPage();

	// $("#showOnPage").on('submit',function(){
	// 	console.log("sss")
	// 	console.log("submit")
	// 	return false;
	// })
	



}


function renderData(data){


	$dataGrid.empty();
	 $("table#table-id").unbind('appendCache applyWidgetId applyWidgets sorton update updateCell')
	 .removeClass('tablesorter')
	 .find('thead th')
	 .unbind('click mousedown')
	 .removeClass('header headerSortDown headerSortUp');
	if(data.length > 0){

		$.each(data,function(index,item){
			$dataGrid.append("<tr>"+
				"<td class='text-center' >"+(item.code==null?'':item.code)+"</td>"+
				"<td class='text-left' >"+(item.engName==null?'':item.engName)+"</td>"+
				"<td class='text-left' >"+(item.referenceName==null?'':item.referenceName)+"</td>"+
				"<td class='text-center' > "+(item.createDate==null?"":DateUtil.coverDateToString (item.createDate))+" </td>"+
				"<td class='text-center' > "+(item.createDate==null?"":DateUtil.coverDateToString(item.createDate))+" </td>"+
				"<td class='text-right' >"+NumberUtil.addComma(parseFloat(item.moneyVar1==null?"0":item.moneyVar1).toFixed(2) )+"</td>"+
				"<td class='text-center' style='padding:0px;'  >"+
				"<button onclick='deleteData("+item.id+")' class='btn btn-sm btn-danger' id="+item.id+" >	<span class='fa fa-trash' ><jsp:text/></span>	</button>"+
				"<button onclick='findData("+item.id+")' class='btn btn-sm btn-info' id="+item.id+" >	<span class='fa fa-search' ><jsp:text/></span>	</button>"+
			
				"</td>"+


				"</tr>");
		});

		 $("table#table-id").tablesorter();
	}else{
   		 swal({
			  title: message['msg'],
			  type: "warning",
		     confirmButtonColor: '#3085d6',
			},
			function(){	
				// call back function
 			});
	}


}


function deleteData(id){
		swal({
			  title:"Confirm to Delete",
			  type: "warning",
			  showCancelButton: true,
  			  showConfirmButton: true,
			  closeOnConfirm: false
			},function(){
	// call back function
							  $.ajax({
				                type: "DELETE",
				                contentType: "application/json; charset=utf-8",
				                dataType: "json",
				                headers: {
				                    Accept: "application/json"
				                },
				           		 url: session['context']+'/demos/deleteDemo/'+id,
				                complete:function(xhr){
				                    if(xhr.readyState==4){
				                        if(xhr.getResponseHeader('statusValidate')==0){
				                          
											 	swal({
												  title:"Deleted!",
												  text:"Deleted Successfully",
												  type: "success",
				                      			  showConfirmButton: true,
												  closeOnConfirm: true
												},function(){
														loadData('code','asc');
												});
				                        }else{
				        			 	
											swal("Delete Unsuccessfully",xhr.getResponseHeader('errorMsg') , "error")

				                        }
				                    }
								 $('.dv-background').hide();
				                    
				                },
				                async:false
				            });

			});	
			
}


function insertData(){
	$('#money').autoNumeric('get');
}




function sortData(th){
	var orderBy = $(th).attr("id");
	var flagOrder ;
	
	$("th span").hide();

	var $icon =  $(th).find("span");

	$icon.show();

	if($icon.hasClass('fa-caret-up')==true){
		$icon.removeClass('fa-caret-up');
		$icon.addClass('fa-caret-down');
	}else{
		$icon.addClass('fa-caret-up');
		$icon.removeClass('fa-caret-down');
	}


	if( $(th).hasClass("desc")==true ){
		$(th).removeClass("desc");
		$(th).addClass("asc");

	}else{
		$(th).removeClass("asc");
		$(th).addClass("desc");
	}

	var sortBy = $(th).hasClass("desc") == true ?  "desc" : "asc";
	
	//Ajax loadtable and function Render Data
	


}


function getValuefromDDL(){
	return $("#demo").attr('data-id');
}



function search(){
	// console.log(searchValue);
	if(searchValue!=0){
		searchValue=0;
		clearTimeout(searchValue);
	}
	searchValue= setTimeout(
    function(){ 
		console.log(searchValue)
    }, 500);
}

function renderJsgrid(){
	$divJsGrid.jsGrid({
        width: "100%",
        height: "400px",
	    editing: true,
	    inserting: true,
	    sorting: true,
        confirmDeleting: false,
	    data: clients,
	    rowClick: function(args) {
	            return false;
        },
        onItemInserted : function(args) {
            objectJsGrid.setStatusJsGrid(args,"CREATE");
        },
        onItemUpdated : function(args) {
            objectJsGrid.setStatusJsGrid(args,"UPDATE");
        },
        fields: [
        	  {
 			   headerTemplate: function() {
                     return $("<input name='header'> ").attr("type", "checkbox")
                            .on("click", function () {
                                checkedAll($(this)); });
                },
                itemTemplate: function(_, item) {
                    return $("<input name='tableCheckbox' >").attr("type", "checkbox")
                            .on("click", function () {
                                checked($(this));
                            $(this).is(":checked") ? selectItem(item) : unselectItem(item);

                        });
                },
                editTemplate: function(value,item){
                	return "";
                },
                align: "center",
                width: 50,
                sorting:false
            },
            { name: "name",title: "Name", type: "text", width: 150, validate: "required" },
            { name: "age",title: "Age", type: "number", width: 50 },
            { name: "address", title: "Address" ,  type: "text", width: 200 },
            { name: "country", title: "Country" , type: "select", items: countries, valueField: "Id", textField: "Name" },
            { type: "control" , deleteButton: false }
        ]
    });
	objectJsGrid.setJsGridField($divJsGrid.attr("id"));

}




   function checkedAll(btn){
            var checkedAll = $(btn).prop('checked');
            selectedItems =[];
            var item = $("#jsGrid").jsGrid("option", "data");

            if(checkedAll==true){
                $("input[name=tableCheckbox]").prop('checked',true);
                if(item.length > 0){
                    $.each(item,function (i,t) {
                        selectItem(t);
                    });
                }
            }else{
                $("input[name=tableCheckbox]").prop('checked',false);
            }
        }

        function checked(btn){
            var checkbox = $("input[name=tableCheckbox]").not("[name=header]").length ;
            var checkboxchecked = $("[name=tableCheckbox]:checked").not("[name=header]").length  ;


            if(checkbox==checkboxchecked){
                 $("input[name=header]").prop("checked",true);
            }else{
                 $("input[name=header]").prop("checked",false);
            }

        }

     var selectItem = function(item) {
        selectedItems.push(item);
    };
 
    var unselectItem = function(item) {
        selectedItems = $.grep(selectedItems, function(i) {
            return i !== item;
        });
    };

    $btnDelete.click(function(){
    	deleteSelectedItems();
    });

    function deleteSelectedItems() {
        if(selectedItems.length>0){
        	  swal({
			  title: "คำเตือน",
			  text: "ยืนยันการลบข้อมูล "+ selectedItems.length +" รายการ",
			  type: "warning",
			  showCancelButton: true,
			  // confirmButtonColor: "#DD6B55",
			  confirmButtonText:  "Confirm",
			  // closeOnConfirm: false
			},
			function(){	
					objectJsGrid.deleteData(selectedItems);
		            selectedItems = [];
 			});

        }else{
        	 swal({
			  title:"คำเตือน",
			  text: "กรุณาเลือกอย่างน้อย 1 รายการ",
			  type: "warning",
		     confirmButtonColor: '#3085d6',
			},
			function(){	
				// call back function
 			});
        }

    }
function findData(id){
	$("input[name=id]").val(id);
	$("#formViewDetail").submit();
}


$btnSave.click(function(){
	var data = objectJsGrid.getJsonToBackEnd();
	// get data for  ajax to Backend
});