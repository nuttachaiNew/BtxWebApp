console.log("test")
var tempUser = {};
var tempImage = {};
var roleName = "";
$(document).ready(function () {
  $("#tntIframe").attr("src","https://track.aftership.com/tnt/?referrer=https%3A%2F%2Fwww.aftership.com%2Fcouriers%2Ftnt&fbclid=IwAR2YyFaA9Ix-B_4tm9eQuTAYBG66sDxRMwCOv-uoY7Ho1vlxhZXrOxGFoYY");
  renderProfile();
});


$("#logout").click(function(){
  submitlogout();
});


$("#searchTnt").click(function(){
  var value = $("#tntTrackNumber").val();
  if(value!=""){
    $("#tntIframe").attr("src","https://track.aftership.com/tnt/"+value+"?referrer=https%3A%2F%2Fwww.aftership.com%2Fcouriers%2Ftnt");
     var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findCaseManagementByDeliveryNote?deliveryNote='+value,
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
    if(json.length>0){
      var customerData = json[0].customer;
      var item = json[0];
      var countItem = 0 ;
      if(item.machine1 !=null) countItem++;
      if(item.machine2 !=null) countItem++;
      if(item.machine3 !=null) countItem++;
      if(item.machine4 !=null) countItem++;
      if(item.machine5 !=null) countItem++;
      if(item.machine6 !=null) countItem++;
      if(item.machine7 !=null) countItem++;
      if(item.machine8 !=null) countItem++;
      if(item.machine9 !=null) countItem++;
      if(item.machine10 !=null) countItem++;
    var firstname =customerData.patientName == null ?"":customerData.patientName ;
    var lastname =customerData.patientLastName == null ?"":customerData.patientLastName ;
    console.log(value)
    console.log(firstname+" "+lastname)
    console.log(countItem)
     $("#trackingNo").text(value);
     $("#customerNo").text(firstname+" "+lastname);
     $("#itemNumber").text(countItem);
  

    }else{
     $("#trackingNo").text("");
     $("#customerNo").text("");
     $("#itemNumber").text("");
  
    }
    
  }else{
      swal({
          title:"Warning",
          text: "Please input track number",
          type: "warning",
          showCancelButton: false,
          // timer: 1500,
          showConfirmButton: true,
          closeOnConfirm: true
        },function(){
           
        });
    }
});

