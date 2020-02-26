var tempUser = {};
var tempImage = {};
var roleName = "";
var id = window.location.href.split("=")[1];
var machineType ={
   "GB1" : "Homechoice 10.4 Patient at Home Guide",
   "GB2" : "Homechoice 10.4 Patient at Home Guide addendum",
   "GB3" : "HomeChoice Claria Procedure Guide",
   "GB4" :  "HomeChoice Claria Troubleshooting Guide",
   "GB5" :  "Sharesource device-based consent",
   "MC1" : "Machine home choice 10.4",
   "MC2" : "Machine Claria",
   "SC" : "Soft Case",
   "HC" : "Hard Case",
   "MOD" : "Modem",
   "PWC" : "Powercord"	
}
$(".swap").hide()
$(document).ready(function () {
  renderProfile();
	renderData();
	
});



$("#backPage").click(function(){
     window.location.href=session['context']+'/casemanagements/swapMachine'; 
})


$("#logout").click(function(){
	submitlogout() ;
});

function renderData(){
    var json= $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findCaseManagementById?id='+id,
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;

    var caseManagement = json ; 
    // if(json.refCase!=null){
    //   caseManagement = json.refCase;
    // }
    if(json.refCase){
      if(json.refCase.id){
        caseManagement=json.refCase;
      }
    }
    var machine = caseManagement.machine1;
    $("#caseNo").text(json.caseNumber);
    $("#productName").text(machineType[machine.machineType])
    $("#productNo").text(machine.code);
    $("#serialNo").text(machine.serialNumber);
    $("#status").text("Pending");
    $("#activeDate").text(DateUtil.coverDateToString (json.createdDate));
    $("#returnDate").text(DateUtil.coverDateToString (new Date().getTime()));
    $("#customerType").text(customerType[json.customer.customerType]  );
    $("#customerName").text(json.customer.patientName +" " + json.customer.patientLastName );
    $("#customerTel").text(json.customer.telNo );
    // $("#customerTel").text(json.customer.contactName +" "+ json.customer.contactLastName);
    console.log(json.customer)
    if(json.machine1) {

      var type = machineType[json.machine1.machineType]
  if(json.machine1.modelRef == "MC2" &&json.machine1.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine1.modelRef == "MC2" &&json.machine1.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine1' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine1.name+"</td>"+
      "<td>"+json.machine1.code+"</td>"+
      "</tr>");
    }
     if(json.machine2) {
      var type = machineType[json.machine2.machineType]
     if(json.machine2.modelRef == "MC2" &&json.machine2.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine2.modelRef == "MC2" &&json.machine2.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }  
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine2' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine2.name+"</td>"+
      "<td>"+json.machine2.code+"</td>"+
      "</tr>");
    }
     if(json.machine3) {
      var type = machineType[json.machine3.machineType]
if(json.machine3.modelRef == "MC2" &&json.machine3.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine3.modelRef == "MC2" &&json.machine3.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine3' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine3.name+"</td>"+
      "<td>"+json.machine3.code+"</td>"+
      "</tr>");
    }
     if(json.machine4) {
      var type = machineType[json.machine4.machineType]
if(json.machine4.modelRef == "MC2" &&json.machine4.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine4.modelRef == "MC2" &&json.machine4.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine4' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine4.name+"</td>"+
      "<td>"+json.machine4.code+"</td>"+
      "</tr>");
    }
     if(json.machine5) {
      var type = machineType[json.machine5.machineType]
if(json.machine5.modelRef == "MC2" &&json.machine5.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine5.modelRef == "MC2" &&json.machine5.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine5' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine5.name+"</td>"+
      "<td>"+json.machine5.code+"</td>"+
      "</tr>");
    }
     if(json.machine6) {
      var type = machineType[json.machine6.machineType]
 if(json.machine6.modelRef == "MC2" &&json.machine6.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine6.modelRef == "MC2" &&json.machine6.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine6' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine6.name+"</td>"+
      "<td>"+json.machine6.code+"</td>"+
      "</tr>");
    }
     if(json.machine7) {
      var type = machineType[json.machine7.machineType]
  if(json.machine7.modelRef == "MC2" &&json.machine7.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine7.modelRef == "MC2" &&json.machine7.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine7' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine7.name+"</td>"+
      "<td>"+json.machine7.code+"</td>"+
      "</tr>");
    }
     if(json.machine8) {
      var type = machineType[json.machine8.machineType]
       if(json.machine8.modelRef == "MC2" &&json.machine8.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine8.modelRef == "MC2" &&json.machine8.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";
      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine8' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine8.name+"</td>"+
      "<td>"+json.machine8.code+"</td>"+
      "</tr>");
    }
     if(json.machine9) {
      var type = machineType[json.machine9.machineType]
      if(json.machine9.modelRef == "MC2" &&json.machine9.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine9.modelRef == "MC2" &&json.machine9.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";

      }
       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine9' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine9.name+"</td>"+
      "<td>"+json.machine9.code+"</td>"+
      "</tr>");
    }
     if(json.machine10) {
      var type = machineType[json.machine10.machineType]
      if(json.machine10.modelRef == "MC2" &&json.machine10.machineType=="GB1" ){
        type = "HomeChoice Claria Patient At Home Guide";
      }else if(json.machine10.modelRef == "MC2" &&json.machine10.machineType=="GB2" ){
        type = " HomeChoice Claria Patient At Home Guide addendum";

      }

       $("#productInfo").append("<tr>"+
      "<td><input type='checkbox' id='machine10' / ></td>"+
      "<td>"+type+"</td>"+
      "<td>"+json.machine10.name+"</td>"+
      "<td>"+json.machine10.code+"</td>"+
      "</tr>");
    }
    
     
    $("#note").val(json.note);
    


}

$("#submit").click(function(){
  var data= {
    "id": id ,
    "updatedBy":session['user'],
    "machineStatus":$("[name=machineStatus]:checked").val(),
    "note":$("#note").val(),
    "flagMachine1":$("#machine1").prop("checked") ? "Y":"N",
    "flagMachine2":$("#machine2").prop("checked") ? "Y":"N",
    "flagMachine3":$("#machine3").prop("checked") ? "Y":"N",
    "flagMachine4":$("#machine4").prop("checked") ? "Y":"N",
    "flagMachine5":$("#machine5").prop("checked") ? "Y":"N",
    "flagMachine6":$("#machine6").prop("checked") ? "Y":"N",
    "flagMachine7":$("#machine7").prop("checked") ? "Y":"N",
    "flagMachine8":$("#machine8").prop("checked") ? "Y":"N",
    "flagMachine9":$("#machine9").prop("checked") ? "Y":"N",
    "flagMachine10":$("#machine10").prop("checked") ? "Y":"N",
  }

   $('.dv-background').show();
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/casemanagements/returnMachine",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
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
                                    window.location.href=session['context']+'/casemanagements/swapMachine'
                                   
                                });
                         }else{
                            alert(xhr.getResponseHeader("errorMsg"));
                        }
                    }
                 $('.dv-background').hide();
                    
                },
                async:false
            });

});