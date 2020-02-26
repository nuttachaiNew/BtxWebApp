// init global Variable
// var $btnSave =  $("#btnSave");
var $tbody   =  $("#tableData");
var tempMachine = {};
// var $btnConfirmSave = $("#addModal").find("#btnConfirmSave");
// var $btnConfirmUpdate = $("#updateModal").find("button#btnConfirmSave");
// var $btnConfrimDelete = $("button#btnConfirmDelete")
var machineType ={
   "MC1" : "Machine home choice 10.4",
   "MC2" : "Machine Claria",
   "SC" : "Soft Case",
   "HC" : "Hard Case",
   "MOD" : "Modem",
   "PWC" : "Powercord" ,
   "GB1" : "Homechoice 10.4 Patient at Home Guide",
   "GB2" : "Homechoice 10.4 Patient at Home Guide addendum",
   "GB3" : "HomeChoice Claria Procedure Guide",
   "GB4" : "HomeChoice Claria Troubleshooting Guide",
   "GB5" : "Homechoice Claria Patient Consent Notice - Thai",
   "GB6" : "APD Patient Record Book"
}
var machineStatus = 0;
var id =window.location.href.split("=")[1];
$(document).ready(function () {
	// on load 
  renderProfile();
  renderSelectBox();
  $("#date").text(DateUtil.coverDateToString(session['date']) ); 
  renderItem();
});


$("#backPage").click(function(){
     window.location.href=session['context']+'/machines/setupMachine'; 
})

function renderItem(){
  if(id){
        var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/machines/findById?id='+id,
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
     var status = json.status ;
     if(status ==1 ){
      $("#statusReady").click();
      $("#statusReady").removeClass('btn-gray');
      $("#statusReady").addClass('btn-success');
     }else if(status ==2){
      $("#statusWaiting").click();
      $("#statusWaiting").removeClass('btn-gray');
     }else if(status == 0){
      $("#statusUsed").click();
       $("#statusUsed").removeClass('btn-gray');

     }
     $("#txtMachineType").val(json.machineType);
     $("#txtMachineRef").val(json.modelRef);
     $("#txtProductName").val(json.name);
     $("#txtProductNo").val(json.code);
     $("#txtSerialNumber").val(json.serialNumber);
      
  }else{
      machineStatus = 1 ;
      $("#statusReady").removeClass('btn-gray');
      $("#statusReady").addClass('btn-success');

  }
}

function renderSelectBox(){
  $.each(machineType,function(index,item){
    $("#txtMachineType").append("<option  value="+index+" >"+item+"</option>");
  });
}

$("#statusReady").click(function(){
    machineStatus =1 ;
    $("#statusReady").removeClass('btn-gray');
    $("#statusWaiting").addClass('btn-gray');
    $("#statusUsed").addClass('btn-gray');

    $("#statusReady").addClass('btn-success');
});

$("#statusWaiting").click(function(){
    machineStatus =2 ;
    $("#statusWaiting").removeClass('btn-gray');
    $("#statusReady").addClass('btn-gray');
    $("#statusUsed").addClass('btn-gray');
});

$("#statusUsed").click(function(){
    machineStatus =0 ;
    $("#statusWaiting").addClass('btn-gray');
    $("#statusReady").addClass('btn-gray');
    $("#statusUsed").removeClass('btn-gray');
});



   $("#logout").click(function(){
      submitlogout() 
    });



$("#saveProduct").click(function(){
    var data ={};
    data  =   {  
      "status": machineStatus,
      "machineType":$("#txtMachineType").val(),
      "modelRef":$("#txtMachineRef").val(),
      "serialNumber":$("#txtSerialNumber").val(),
      "createdBy":session['user'],
      "name":$("#txtProductName").val(),
      "code":$("#txtProductNo").val()
    }


      if(id){
        data['id']= id;
        data['updatedBy']= session['user'];
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/machines/update",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.getResponseHeader('errorStatus')=="N"){
                          swal({
                                  title:"Success",
                                  text: "Save Success",
                                  type: "success",
                                  showCancelButton: false,
                                  // timer: 1500,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                    window.location.href=session['context']+'/machines/setupMachine'
                                   
                                });
                         }else{
                            alert(xhr.getResponseHeader("errorMsg"));
                        }
                 $('.dv-background').hide();
                    
                },
                async:false
            });


      }else{
        $('.dv-background').show();
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/machines/insert",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.getResponseHeader('errorStatus')=="N"){
                          swal({
                                  title:"Success",
                                  text: "Save Success",
                                  type: "success",
                                  showCancelButton: false,
                                  // timer: 1500,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                    window.location.href=session['context']+'/machines/setupMachine'
                                   
                                });
                         }else{
                            alert(xhr.getResponseHeader("errorMsg"));
                        }
                 $('.dv-background').hide();
                    
                },
                async:false
            });
      }



 });
