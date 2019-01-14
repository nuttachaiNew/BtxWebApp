// init global Variable
var $btnSave =  $("#btnSave");
var $tbody   =  $("#tableData");
var tempPosition = {};
var $btnConfirmSave = $("#addModal").find("#btnConfirmSave");
var $btnConfirmUpdate = $("#updateModal").find("button#btnConfirmSave");
var $btnConfrimDelete = $("button#btnConfirmDelete")

$(document).ready(function () {
	// on load 
	console.log("load on setup js");
	renderTable();
});

$btnSave.click(function(){
	$("#addModal").modal("show");
});

function renderTable(){
	$tbody.empty();
	    var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/positions/findAllPosition',
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
	 var running = 1;
	$.each(json,function(index,item){

		var $btnEdit  = "<button class='btn btn-sm btn-warning' onclick='editData("+item.id+")' name='btnEdit' id="+item.id+" > <span class='fa fa-pencil'></span></button>" ;
		var $btnDelete  = "<button class='btn btn-sm btn-danger' onclick='deleteData("+item.id+")' name='btnDelete' id="+item.id+" > <span class='fa fa-trash'></span></button>" ;

		$tbody.append(
			"<tr>"+
				"<td>"+ running+"</td>"+
				"<td>"+ (item.name == null ? "" : item.name) +"</td>"+
				"<td>"+ (item.detail == null ? "" : item.detail) +"</td>"+
				"<td>"+ $btnEdit +"</td>"+
				"<td>"+ $btnDelete +"</td>"+
			"</tr>"
			);
		running++;
		tempPosition[item.id] = item;
	});

}


function editData(id){
	var itemEdit = tempPosition[id];
	$("#updateModal").find("input#txtPosiName").val(itemEdit.name);
	$("#updateModal").find("input#txtPosiNote").val(itemEdit.detail);
	$("#updateModal").find("button#btnConfirmSave").attr("itemId",id);
	$("#updateModal").modal("show");
}


function deleteData(id){
	var deleteId = id;
	$btnConfrimDelete.attr("itemId",deleteId);
	$("#deleteModal").modal('show');
}


$btnConfirmSave.click(function(){
	var name = $("#addModal").find("input#txtPosiName").val();
	var detail = $("#addModal").find("input#txtPosiNote").val();
	console.log('tag', name);
	console.log('tag', detail);

	var data = {
		name : name,
		detail : detail,
		createdBy : session['user']
	};

	console.log('tag', data);

	console.log(data);
	 $('.dv-background').show();
 	     $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/positions/insertPosition",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.getResponseHeader('errorStatus')=="N"){
                          	console.log("save Success");
                          	renderTable()
						 }else{
                          	console.log("save error : "+ xhr.getResponseHeader("errorMsg"));
                        }
                    }
				 $('.dv-background').hide();
                    
                },
                async:false
            });



	$("#addModal").modal('hide');

});


$btnConfirmUpdate.click(function(){
	var id = $(this).attr("itemId");
	var name = $("#updateModal").find("input#txtPosiName").val();
	var detail = $("#updateModal").find("input#txtPosiNote").val();
	console.log('tag', name);
	console.log('tag', detail);
	
	var updatedBy = session['user'];
	var data = { 
		id : id,
		name : name,
		detail: detail,
		updatedBy : updatedBy
	};

	 $('.dv-background').show();
 	     $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/positions/updatePosition",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.getResponseHeader('errorStatus')=="N"){
                          	console.log("save Success");
                          	renderTable();
						 }else{
                          	console.log("save error : "+ xhr.getResponseHeader("errorMsg"));
                        }
                    }
				 $('.dv-background').hide();
                    
                },
                async:false
            });

	$("#updateModal").modal('hide');
});


$btnConfrimDelete.click(function(){
	var listDelete = [];
	listDelete.push($btnConfrimDelete.attr("itemId"));
	var data = {"id": listDelete};
	$('.dv-background').show();
 	     $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/positions/deletePosition",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.getResponseHeader('errorStatus')=="N"){
                          	console.log("save Success");
                          	renderTable();
						 }else{
                          	console.log("save error : "+ xhr.getResponseHeader("errorMsg"));
                        }
                    }
				 $('.dv-background').hide();
                    
                },
                async:false
            });
	$("#deleteModal").modal('hide');
});