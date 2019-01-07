
var $txtArea = $("#area");
var $email = $("#email");
var $txtFile = $("#file");
var $txtFirstName = $("#txtFirstName");
var $txtLastName = $("#txtLastName");
var $txtEmail = $("#txtEmail");
var $txtTelNo = $("#txtTelNo");
var $btnSave = $("#btnSave");
var user = null;
$(document).ready(function () {
	renderData();
});

function getImage(){
	  var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/users/getImage?username='+session['user'],
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
    $("#imgDashboard").attr("src", "data:image/png;base64," + json);
	  
}

function getUserProfile(){
	    var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/users/getUserProfile?username='+session['user'],
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
	    return json;
}

function renderData(){
	 user = getUserProfile();
	console.log(user);
	$txtArea.val(user.branch.detail);
	$email.val(user.email);
	$txtEmail.val(user.email);
	$txtFirstName.val(user.firstName);
	$txtLastName.val(user.lastName);
	$txtTelNo.val(user.telephoneNumber);
	getImage();
}

$btnSave.click(function(){
	var formData = new FormData();
	var data={
	    "updatedBy": session['user'],    
	    "email": $txtEmail.val(),
	    "firstName": $txtFirstName.val(),
	    "lastName": $txtLastName.val() ,
	    "username": session['user'],
	    "branch": {"id": user.branch.id} ,
	    "telephoneNumber":$txtTelNo.val(),
	    "newPassword":""
	}
	formData.append("json",JSON.stringify(data));
	if($txtFile.val()!=""){
		formData.append("image",$txtFile[0].files[0]);
	}
	

	$.ajax({
        type: "POST",
        headers: {
            Accept: 'application/json',
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session.context+'/users/editProfile',
        processData: false,
        contentType: false,
        data: formData,
        async: false,
        complete: function (xhr) {
        	renderData();
        }
    });

});

$("btn#logout").click(function(){
submitlogout()
});