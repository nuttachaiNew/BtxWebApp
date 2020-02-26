  
var $txtArea = $("#area");
var $email = $("#email");
var $txtFile = $("#imageUpload");
var $txtFirstName = $("#txtFirstName");
var $txtLastName = $("#txtLastName");
var $txtEmail = $("#txtEmail");
var $txtTelNo = $("#txtTelNo");
var $btnSave = $("#btnSave");
var user = null;
var roleName="";
var img= "";
var test= "";
$(document).ready(function () {
    renderProfile();
    getRole();
    renderData();
    // getImage();
});

function getRole(){
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
    // console.log(json.role.name)
     roleName = json.role.name; 
     if(roleName != "BU"){
        $("#digitalSignDiv").hide();
     }
}


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
 
    $("#profileImage").attr("src", "data:image/png;base64," + json);
    $("#imagePreview").css("background-image", "url('data:image/png;base64," + json + "')");
	  
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
	$txtArea.val(user.branch.detail).prop('disabled',true);
	$email.val(user.email);
	$txtEmail.val(user.email);
	$txtFirstName.val(user.firstName);
	$txtLastName.val(user.lastName);
	$txtTelNo.val(user.telephoneNumber);
	getImage();
     
    // if(user.role.name == "BU"){
    // }
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
            $("#SaveModal").modal('show')
            renderData();
        }
    });

});

$("a#logout").click(function(){
    console.log("clickloutout")
    submitlogout()
});

function changeText1() {

                 document.getElementById("BeforeChange").style.display = "none";
                 document.getElementById("ChangeP").style.display = "none";

                 //SaveC
                 document.getElementById("AfterChange").style.display = "block";
                 document.getElementById("SaveC").style.display = "block";


                }
                function changeText2() {

                  document.getElementById("BeforeChange").style.display = "block";
                  document.getElementById("ChangeP").style.display = "block";

                  //SaveC
                  document.getElementById("AfterChange").style.display = "none";
                  document.getElementById("SaveC").style.display = "none";


                 }


             $("#imageUpload").change(function() {
                 readURL(this);
             });
             function readURL(input) {

                 if (input.files && input.files[0]) {
                     var reader = new FileReader();
                     reader.onload = function(e) {
                         $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                         $('#imagePreview').hide();
                         $('#imagePreview').fadeIn(650);
                     }
                     reader.readAsDataURL(input.files[0]);
                 }
             }

$("#saveDs").click(function(){
    var formData = new FormData();
    var $dsFile = $("#dsFile");
    var data={
         "username":session['user']
     }
    
    if($dsFile.val()!=""){
        formData.append("image",$dsFile[0].files[0]);
    }
    formData.append("json",JSON.stringify(data));
    // $("#browsingSig").modal('hide');

    $.ajax({
        type: "POST",
        headers: {
            Accept: 'application/json',
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session.context+'/casemanagements/uploadDigitalSignature',
        processData: false,
        contentType: false,
        data: formData,
        async: false,
        complete: function (xhr) {
             if(xhr.readyState==4){
                if(xhr.getResponseHeader('errorStatus')=="N"){
                     swal({
                                  title:"Success",
                                  text: "Upload Success",
                                  type: "success",
                                  showCancelButton: false,
                                  // timer: 1500,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                   
                                });
                }else {
                    alert(xhr.getResponseHeader("errorMsg"));
                }
             }   
        }
    });
});    