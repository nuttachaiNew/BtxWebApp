// init global Variable
var $btnSave =  $("#btnSave");
var $tbody   =  $("#tableData");
var tempUser = {};
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
        url: session['context'] + '/users/findAllUser',
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
				"<td>"+ (item.username == null ? "" : item.username) +"</td>"+
				"<td>"+ (item.firstName == null ? "" : item.firstName) +"</td>"+
				"<td>"+ (item.lastName == null ? "" : item.lastName) +"</td>"+
				"<td>"+ (item.telephoneNumber == null ? "" : item.telephoneNumber) +"</td>"+
				"<td>"+ (item.email == null ? "" : item.email) +"</td>"+
				"<td>"+ (item.role == null ? "" : item.role.name) +"</td>"+
				"<td>"+ (item.branch == null ? "" : item.branch.name) +"</td>"+

				"<td>"+ $btnEdit +"</td>"+
				"<td>"+ $btnDelete +"</td>"+
			"</tr>"
			);
		running++;
		tempUser[item.id] = item;
	});

}



$btnConfirmSave.click(function(){
	var username = $("#addModal").find("input#txtCode").val();
	var password = $("#addModal").find("input#txtAreaName").val();
	var confirmPassword = $("#addModal").find("input#txtAreaDeatail").val();
	var firstName = $("#addModal").find("input#txtAreaDeatail").val();
	var lastName = $("#addModal").find("input#txtAreaDeatail").val();
	var telephoneNumber = $("#addModal").find("input#txtAreaDeatail").val();
	var email = $("#addModal").find("input#txtAreaDeatail").val();

	// var data = {
	// 	code : code,
	// 	name : name,
	// 	detail : detail,
	// 	createdBy : session['user']
	// };

	console.log(data);
	 $('.dv-background').show();
 	     $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/areas/insertArea",
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
	var code = $("#updateModal").find("input#txtCode").val();
	var name = $("#updateModal").find("input#txtAreaName").val();
	var detail = $("#updateModal").find("input#txtAreaDetail").val();
	var updatedBy = session['user'];
	var data = { 
		id : id,
		code  : code , 
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
                url:session['context']+"/areas/updateArea",
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

function editData(id){
	var itemEdit = tempUser[id];
	$("#updateModal").find("input#txtCode").val(itemEdit.code);
	$("#updateModal").find("input#txtAreaName").val(itemEdit.name);
	$("#updateModal").find("input#txtAreaDetail").val(itemEdit.detail);
	$("#updateModal").find("button#btnConfirmSave").attr("itemId",id);
	$("#updateModal").modal("show");
}


function deleteData(id){
	var deleteId = id;
	$btnConfrimDelete.attr("itemId",deleteId);
	$("#deleteModal").modal('show');
}


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
                url:session['context']+"/areas/deleteArea",
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
	// $("#deleteModal").hide();
});