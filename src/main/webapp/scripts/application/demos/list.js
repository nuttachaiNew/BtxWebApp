
$(document).ready(function () {
	renderTableBody();
});


function renderTableBody(){
	$("tbody#content").empty();
	var json = [{
		"id" : 1,
		"code": "CODE_1",
		"name": "NAME_1",
		"description": "DESCRIPTION_1",

	},{
		"id" : 2,
		"code": "CODE_2",
		"name": "NAME_2",
		"description": "DESCRIPTION_2"
	},{
		"id" : 3,
		"code": "CODE_3",
		"name": "NAME_3",
		"description": "DESCRIPTION_3"
	}];

	$.each(json,function(index,item){
		$("tbody#content").append("<tr>"+
			"<td>"+item.code+"</td>"+
			"<td>"+item.name+"</td>"+
			"<td>"+item.description+"</td>"+
			"<td><center>"+ "<button id="+item.id+" class='btn btn-primary'> "+"<span class='fa fa-list' > <jsp:text/> </span>"   +"</button></center> </td>"+
			"</tr>");
	});

	$('form button').click(function() {
		var id = $(this).attr("id");
		$("input[name=id]").val(id);
		$("form").prop("action",session["context"]+"/demos/find");
		$("form").prop("method","POST");		
		$("form").submit();
		// return false;
	});

}