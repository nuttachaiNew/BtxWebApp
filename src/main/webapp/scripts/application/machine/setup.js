// init global Variable
// var $btnSave =  $("#btnSave");
var $tbody   =  $("#tableData");
var tempMachine = {};
// var $btnConfirmSave = $("#addModal").find("#btnConfirmSave");
// var $btnConfirmUpdate = $("#updateModal").find("button#btnConfirmSave");
// var $btnConfrimDelete = $("button#btnConfirmDelete")


$(document).ready(function () {
	// on load 
	console.log("load on setup js");
	renderTable();
});

function renderTable(){
	$tbody.empty();
	    var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/machines/findAllMachine',
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
	$.each(json,function(index,item){

		var $btnEdit  = "<button class='btn btn-sm btn-info btnlist' onclick='editData("+item.id+")' name='btnEdit' id="+item.id+" > <span class='fa fa-pencil'></span></button>" ;
		var $btnDelete  = "<button class='btn btn-sm btn-info btnlist' onclick='deleteData("+item.id+")' name='btnDelete' id="+item.id+" > <span class='fa fa-search'></span></button>" ;

		$tbody.append(
			"<tr>"+
				"<td>"+ (item.code == null ? "" : item.code) +"</td>"+
				"<td>"+ (item.createdBy == null ? "" : item.createdBy) +"</td>"+
				"<td>"+ (item.name == null ? "" : item.name) +"</td>"+
				"<td>"+ (item.machineType == null ? "" : item.machineType) +"</td>"+
				"<td>"+ (item.status == null ? "" : item.status) +"</td>"+
				"<td>"+ $btnEdit +"</td>"+
				"<td>"+ $btnDelete +"</td>"+
			"</tr>"
			);
		tempMachine[item.id] = item;
	});
}

function editData(id){
	var itemEdit = tempMachine[id];
	alert (itemEdit.name + " " + item.machineType + " : Edit");
}

function deleteData(id){
	var deleteId = id;
	alert (deleteId + " : Delete");
}