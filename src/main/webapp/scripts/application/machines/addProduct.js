// init global Variable
// var $btnSave =  $("#btnSave");
var $tbody   =  $("#tableData");
var tempMachine = {};
// var $btnConfirmSave = $("#addModal").find("#btnConfirmSave");
// var $btnConfirmUpdate = $("#updateModal").find("button#btnConfirmSave");
// var $btnConfrimDelete = $("button#btnConfirmDelete")
var machineType ={
   "MC1" : "Machine Homechoice 10.4",
   "MC2" : "Machine Claria",
   "MOD" : "Modem",
  
}

function clearMachine(){
  $("input[type=text]").val("");
}

var machineStatus = 0;
var id =window.location.href.split("=")[1];
$(document).ready(function () {
	initObject();
  // on load 
  renderProfile();
  renderSelectBox();
  $("#txtMachineType").change();
});

$("#txtMachineType").change(function(){
  var value = $(this).val();
  clearMachine();
   $("tr[name=product]").hide();
  if(value == "MOD"){
   $("tr[name=product]:eq(0)").show();
   // $("tr[name=product]:eq(2)").show();
   $("#machineCode").val("5H32401");
   $("#machineName").val("Cellular Modem");

   $("tr[name=product]:eq(0)").find("input[name=productNumber]").val("5H33102");
   $("tr[name=product]:eq(0)").find("input[name=productName]").val("Universal Modem PowerCord");
   // $("tr[name=product]:eq(2)").find("input[name=productNumber]").val();
   // $("tr[name=product]:eq(2)").find("input[name=productName]").val();
   
  }else if(value =="MC1"){
   $("tr[name=product]:eq(0)").show();
   $("tr[name=product]:eq(1)").show();
   $("tr[name=product]:eq(2)").show();
   $("tr[name=product]:eq(3)").show();
   $("tr[name=product]:eq(4)").show();
   $("tr[name=product]:eq(3)").find("label[name=machineType]").text("HomeChoice 10.4 Patient At Home Guide");
   $("tr[name=product]:eq(4)").find("label[name=machineType]").text("HomeChoice 10.4 Patient At Home Guide addendum");
   $("#machineCode").val("5C4474");
   $("#machineName").val("Homechoice 10.4 Machine");
   $("tr[name=product]:eq(0)").find("input[name=productNumber]").val("5934001023");
   $("tr[name=product]:eq(0)").find("input[name=productName]").val("Powercord Homechoice 10.4");
   $("tr[name=product]:eq(1)").find("input[name=productNumber]").val("5C8346");
   $("tr[name=product]:eq(1)").find("input[name=productName]").val("Homechoice 10.4 Hardcase W/Wheels");
   $("tr[name=product]:eq(2)").find("input[name=productNumber]").val("HC104SC01");
   $("tr[name=product]:eq(2)").find("input[name=productName]").val("Homechoice Machine 10.4 Soft case");
   $("tr[name=product]:eq(3)").find("input[name=productNumber]").val("071964016THA");
   $("tr[name=product]:eq(3)").find("input[name=productName]").val("Homechoice 10.4 Manual Book Thai CE Marked");
   $("tr[name=product]:eq(4)").find("input[name=productNumber]").val("071975455THA");
   $("tr[name=product]:eq(4)").find("input[name=productName]").val("Homechoice 10.4 Manual Addendum Thai CE Marked");

  }else if(value =="MC2"){
   $("tr[name=product]:eq(0)").show();
   $("tr[name=product]:eq(1)").show();
   $("tr[name=product]:eq(2)").show();
   $("tr[name=product]:eq(3)").show();
   $("tr[name=product]:eq(4)").show();

   $("tr[name=product]:eq(3)").find("label[name=machineType]").text("HomeChoice Claria Patient At Home Guide");
   $("tr[name=product]:eq(4)").find("label[name=machineType]").text("HomeChoice Claria Patient At Home Guide addendum");
   $("tr[name=product]:eq(5)").show();
   $("tr[name=product]:eq(6)").show();
   
   $("#machineCode").val("5C6M10");
   $("#machineName").val("Homechoice Claria APD Cycler");
   $("tr[name=product]:eq(0)").find("input[name=productNumber]").val("BXU005345");
   $("tr[name=product]:eq(0)").find("input[name=productName]").val("PWR Cord 125V Nema 1-15 US/MEX(Homechoice Claria)");
   $("tr[name=product]:eq(1)").find("input[name=productNumber]").val("BXU004390");
   $("tr[name=product]:eq(1)").find("input[name=productName]").val("Carry Case Homechoice Claria");
   $("tr[name=product]:eq(2)").find("input[name=productNumber]").val("HCCLSC01");
   $("tr[name=product]:eq(2)").find("input[name=productName]").val("Homechoice Claria Softcase");
   $("tr[name=product]:eq(3)").find("input[name=productNumber]").val("071972003B2THA");
   $("tr[name=product]:eq(3)").find("input[name=productName]").val("Homechoice Claria Patient at Home Guide");
   $("tr[name=product]:eq(4)").find("input[name=productNumber]").val("0719000116C1THA");
   $("tr[name=product]:eq(4)").find("input[name=productName]").val("Homechoice Claria Patient at Home Guide Addendum - Thai");
   $("tr[name=product]:eq(5)").find("input[name=productNumber]").val("071965345B3THA");
   $("tr[name=product]:eq(5)").find("input[name=productName]").val("Homechoice Claria Procedure Guide");
   $("tr[name=product]:eq(6)").find("input[name=productNumber]").val("071965355B2THA");
   $("tr[name=product]:eq(6)").find("input[name=productName]").val("Homechoice Claria Troubleshooting Guide");
   $("tr[name=product]:eq(7)").show();
   $("tr[name=product]:eq(8)").show();
   $("tr[name=product]:eq(7)").find("input[name=productNumber]").val("071972002B1THA");
   $("tr[name=product]:eq(7)").find("input[name=productName]").val("Homechoice Claria Sharesource Patient Consent Notice - Thai");
   $("tr[name=product]:eq(8)").find("input[name=productNumber]").val("APDRCB1");
   $("tr[name=product]:eq(8)").find("input[name=productName]").val("APD Patient Record Book");

  }
});

function initObject(){
  for(i=0;i<9;i++){
    $("#addmo1").click();
  }

  for(i=0;i<9;i++){
   $("tr[name=product]:eq("+i+")").find("input[name=productNumber]").attr("id","code"+(i+1));
   $("tr[name=product]:eq("+i+")").find("input[name=productName]").attr("id","name"+(i+1));
   $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("id","machineType"+(i+1));
    if(i==0){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("Powercord");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","PWC");
    }else if(i==1){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("Hard Case");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","HC");
    }else if(i==2){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("Soft Case");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","SC");
    }else if(i==3){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("Homechoice 10.4 Patient at Home Guide");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","GB1");
    }else if(i==4){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("Homechoice 10.4 Patient at Home Guide addendum");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","GB2");
    }else if(i==5){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("HomeChoice Claria Procedure Guide");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","GB3");
    }else if(i==6){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("HomeChoice Claria Troubleshooting Guide");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","GB4");
    }else if(i==7){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("Homechoice Claria Sharesource Patient Consent Notice - Thai");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","GB5");
    }else if(i==8){
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").text("APD Patient Record Book");
      $("tr[name=product]:eq("+i+")").find("label[name=machineType]").attr("machineType","GB6");
    }
  }
  


}

function renderSelectBox(){
  $.each(machineType,function(index,item){
    $("#txtMachineType").append("<option  value="+index+" >"+item+"</option>");
  });
}



   $("#logout").click(function(){
      submitlogout() 
    });


$("#saveProduct").click(function(){
  var json= [];
  var machine = {
    "status":"1",
    "createdBy":session['user'],
    "modelRef":$("#txtMachineType").val(),
    "machineType":$("#txtMachineType").val(),
    "name":$("#machineName").val(),
    "serialNumber":$("#serialNumber").val(),
    "code":$("#machineCode").val()
  }

  if( machine.code=="" || machine.serialNumber=="" || machine.name =="" ){
      swal({
                  title:"Warning",
                  text: "กรุณากรอกข้อมูล "+$("#txtMachineType option:selected").text(),
                  type: "warning",
                  showCancelButton: false,
                  // timer: 1500,
                  showConfirmButton: true,
                  closeOnConfirm: true
                },function(){
                   
                });
    return false;
  }
json.push(machine);
var flag = 0;  
var machineNull = "";
  for(i=0;i<$("tr[name=product]:visible").length;i++){
    var code = $("tr[name=product]:visible:eq("+i+")").find("input[name=productNumber]").val();
    var name = $("tr[name=product]:visible:eq("+i+")").find("input[name=productName]").val();
    var machineType = $("tr[name=product]:visible:eq("+i+")").find("label[name=machineType]").attr("machineType");
    if(code == "" || name=="" ){
      console.log("code :"+code +" name : "+name+" machineType: "+machineType);
      flag =1;
      machineNull = $("tr[name=product]:visible:eq("+i+")").find("label[name=machineType]").text();
    }

    var data  = {
      "status":"1",
      "createdBy":session['user'],
      "modelRef":$("#txtMachineType").val(),
      "machineType":machineType,
      "name":name,
      "serialNumber":null,
      "code":code
    }
    json.push(data);
  }

  if(flag==1){
    // alert("please input "+  machineNull + " information");
    swal({
              title:"Warning",
              text: "กรุณากรอกข้อมูล "+  machineNull ,
              type: "warning",
              showCancelButton: false,
              // timer: 1500,
              showConfirmButton: true,
              closeOnConfirm: true
            },function(){
            });
    return false;
  }

  console.log(json)
  
  var json ={
    "machineL":json
  }
    $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/machines/insertList",
                data:JSON.stringify(json),
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


});


// $("#saveProduct").click(function(){
//     var data ={};
//     data  =   {  
//       "status": machineStatus,
//       "machineType":$("#txtMachineType").val(),
//       "modelRef":$("#txtMachineRef").val(),
//       "serialNumber":$("#txtSerialNumber").val(),
//       "createdBy":session['user'],
//       "name":$("#txtProductName").val(),
//       "code":$("#txtProductNo").val()
//     }


//       if(id){
//         data['id']= id;
//         data['updatedBy']= session['user'];
//          $.ajax({
//                 type: "POST",
//                 contentType: "application/json; charset=utf-8",
//                 dataType: "json",
//                 headers: {
//                     Accept: "application/json"
//                 },
//                 url:session['context']+"/machines/update",
//                 data:JSON.stringify(data),
//                 complete:function(xhr){
//                     if(xhr.getResponseHeader('errorStatus')=="N"){
//                           swal({
//                                   title:"Success",
//                                   text: "Save Success",
//                                   type: "success",
//                                   showCancelButton: false,
//                                   // timer: 1500,
//                                   showConfirmButton: true,
//                                   closeOnConfirm: true
//                                 },function(){
//                                     window.location.href=session['context']+'/machines/setupMachine'
                                   
//                                 });
//                          }else{
//                             alert(xhr.getResponseHeader("errorMsg"));
//                         }
//                  $('.dv-background').hide();
                    
//                 },
//                 async:false
//             });


//       }else{
//         $('.dv-background').show();
//          $.ajax({
//                 type: "POST",
//                 contentType: "application/json; charset=utf-8",
//                 dataType: "json",
//                 headers: {
//                     Accept: "application/json"
//                 },
//                 url:session['context']+"/machines/insert",
//                 data:JSON.stringify(data),
//                 complete:function(xhr){
//                     if(xhr.getResponseHeader('errorStatus')=="N"){
//                           swal({
//                                   title:"Success",
//                                   text: "Save Success",
//                                   type: "success",
//                                   showCancelButton: false,
//                                   // timer: 1500,
//                                   showConfirmButton: true,
//                                   closeOnConfirm: true
//                                 },function(){
//                                     window.location.href=session['context']+'/machines/setupMachine'
                                   
//                                 });
//                          }else{
//                             alert(xhr.getResponseHeader("errorMsg"));
//                         }
//                  $('.dv-background').hide();
                    
//                 },
//                 async:false
//             });
//       }



//  });
