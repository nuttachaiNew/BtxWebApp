
var privateData = ["jwtpass","password"];

var role=null;
var id = window.location.href.split("=")[1];
var status = "";
var caseManagement ;
var fileUploads = [];
var $txtFile = $("#fileDigitalSignature");
var flagApprove = 0;
var paymentTypeData = [{value:"เงินสด"  },{value:"เงินโอน"},{value:"เช็คเงินสด"}]
var bankData = [{value:"-"  },{value:"ธนาคารกรุงเทพ"  },{value:"ธนาคารกสิกรไทย"},{value:"ธนาคารกรุงไทย"}
,{value:"ธนาคารทหารไทย"},{value:"ธนาคารไทยพาณิชย์"},{value:"ธนาคารกรุงศรีอยุธยา"},{value:"ธนาคารเกียรตินาคิน"},{value:"ธนาคารซีไอเอ็มบีไทย"}
,{value:"ธนาคารทิสโก้"},{value:"ธนาคารธนชาต"},{value:"ธนาคารยูโอบี"},{value:"ธนาคารสแตนด์ดาร์ดชาร์เดอร์ด"},{value:"ธนาคารออมสิน"},{value:"ธนาคารอิสลามแห่งประเทศไทย"}
,{value:"ธนาคารอาคารสงเคราะห์"}]

const sortThaiDictionary = list => {
  const newList = [...list]
  newList.sort((a, b) => a.value.localeCompare(b.value, 'th'))
  return newList
}
bankData = sortThaiDictionary(bankData);

// bankData.sort((a, b) => (a.value > b.value) ? 1 : -1)


 var clickStatus = null;

$("#reject").click(function(){
  clickStatus =1;
});
$("#approve").click(function(){
  clickStatus =1;
});

$(document).ready(function () {
    renderProfile();
    checkRole();
    renderCase();
    $("#amount").autoNumeric('init');
    $("#sum").autoNumeric('init');
    $("#vat").autoNumeric('init');
    $("#total").autoNumeric('init');
    renderPaySlip();
    initData();
});

function initData(){
  $.each(bankData,function(index,item){
    $("#bank").append("<option value="+item.value+" > "+item.value +" </option> ");
  });
   $.each(paymentTypeData,function(index,item){
    $("#paymentType").append("<option value="+item.value+" > "+item.value +" </option> ");
  });



}
$("#amount").change(function(){
    var amount = $(this).autoNumeric('get');
    $("#total").autoNumeric('set',amount);
    checkField();
});

   function checkField()
      {
          var val =  $("#total").autoNumeric('get');
          var v=0;
          v= parseFloat(val)*7/107 ;
          var  s=0;
          s=val-v;

           $("#sum").autoNumeric('set',s);
           $("#vat").autoNumeric('set',v);
          // document.getElementById("vat").value=v.toFixed(2);
         
          // document.getElementById("sum").value=s.toFixed(2);

       }

function downloadAgreement(){
  window.location.href=fileHttp+"/downloadFormAccept?caseId="+id
}
function downloadPrescription(){
  window.location.href=fileHttp+"/downloadFormPrescription?caseId="+id
}
function downloadInstallation(){


    if(caseManagement.assignBu){
       window.location.href=fileHttp+"/downloadFormInstallation?caseId="+id
    }else{
          swal({
                  title:"Warning",
                  text: "ไม่สามารถดาวน์โหลดเอกสารได้ เนื่องจากเอกสารยังไม่อนุมัติ",
                  type: "warning",
                  showCancelButton: false,
                  // timer: 1500,
                  showConfirmButton: true,
                  closeOnConfirm: true
                },function(){
                   
                });
    }
}
function downloadReceipt(){
  window.location.href=fileHttp+"/downloadFormReceipt?caseId="+id
  
}

$('a.yourlink').click(function(e) {
    e.preventDefault();
    window.open('http://yoururl1.com');
    window.open('http://yoururl2.com');
});
$('a#yourlink').click(function(e) {
    // e.preventDefault();

  window.open(fileHttp+"/downloadFormAccept?caseId="+id);
  window.open(fileHttp+"/forms/downloadFormPrescription?caseId="+id);
  window.open(fileHttp+"/forms/downloadFormInstallation?caseId="+id);
  window.open(fileHttp+"/forms//downloadFormReceipt?caseId="+id);
  // downloadPrescription(); 
      // downloadReceipt();
      


});

function myModalAgreement(){
    var payDate  = $("#payDate").val();
    var paymentType = $("#paymentType").val();
    var bank = $("#bank").val();
    var amount  =  $("#amount").autoNumeric('get') ;
    var receiptNo = $("#receiptNo").val();
    var receiptDate = $("#receiptDate").val();
    var receipientName = $("#receipientName").val();
    var receipientAddress1 = $("#receipientAddress1").val();
    var receipientAddress2 = $("#receipientAddress2").val();
    var receipientAddress3 = $("#receipientAddress3").val();
    var receipientAddress4 = $("#receipientAddress4").val();
    var receipientAddress5= $("#receipientAddress5").val();

    if(payDate ==""|| paymentType =="" || bank =="" || amount=="" || receiptNo==""|| receiptDate =="" ||receipientName =="" ){
        swal({
                  title:"Warning",
                  text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                  type: "warning",
                  showCancelButton: false,
                  // timer: 1500,
                  showConfirmButton: true,
                  closeOnConfirm: true
                },function(){
                   
                });
       
        return false;
    }

    var data ={
        updatedBy  : session['user'],
        payDate : DateUtil.coverStringToDate(payDate),
        paymentType : paymentType,
        bank : bank,
        amount : amount,
        receiptNo : receiptNo,
        receiptDate : DateUtil.coverStringToDate(receiptDate),
        receipientName : receipientName,
        // receipientAddress1 : receipientAddress1,
        // receipientAddress2 : receipientAddress2,
        // receipientAddress3 : receipientAddress3,
        // receipientAddress4 : receipientAddress4,
        // receipientAddress5 : receipientAddress5,
        receiptAddress1 : receipientAddress1,
        receiptAddress2 : receipientAddress2,
        receiptAddress3 : receipientAddress3,
        receiptAddress4 : receipientAddress4,
        receiptAddress5 : receipientAddress5,
        id : id

    };


         $('.dv-background').show();
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/casemanagements/confirmByFN",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.getResponseHeader('errorStatus')=="N"){
                          downloadReceipt();
                         }else{
                            alert(xhr.getResponseHeader("errorMsg"));
                        }
                    }
                 $('.dv-background').hide();
                    
                },
                async:false
            });
}

$("#backPage").click(function(){
     window.location.href=session['context']+'/casemanagements/listviewcase'; 
})

function checkRole(){
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
     role  = json.role.name;
     // case = json;
     
    $("#pageName").text(role+" Management"); 

   if(role != "TS"){
       $("#viewProduct").hide() 
    }
    // if(role == "TS"){
    //     $("[name=panelTS]").removeClass('hide');
    //     $("#collapseTS").addClass("in");
       
    // }else if(role == "FN"){
    //     $("[name=panelFN]").removeClass('hide');
    //     $("#collapseFN").addClass("in");
        

    // }else if(role == "CS"){
    //     $("[name=panelCS]").removeClass('hide');
    //     $("#collapseCS").addClass("in");
        
    // }
    if(role != "FN"){
        $("#collapseFN").removeClass("show");
        $("#fnSend").prop("disabled",true);

    }else{
         $("#collapseFN").addClass("show");
        $("#fnSend").prop("disabled",false);
    }

    if(role != "BU"){
        $("#buSend").prop("disabled",true);
        $("#buNote").prop("disabled",true);
        $("#collapseBU").removeClass("show");
    }

    if(role !="CS"){
        $("#collapseCS").removeClass("show");
        $("#csSend").prop("disabled",true);

    }else{
         $("#collapseCS").addClass("show");
        $("#csSend").prop("disabled",false);
    }

     if(role != "TS"){
        $("#tsSend").prop("disabled",true);
        $("#collapseTS").removeClass("show");
    }else{
         $("#tsSend").prop("disabled",false);
        $("#collapseTS").addClass("show");
    }
    // if(role != "TS"){
    //     $("#tsSend").prop("disabled",true);
    // }


    if(role == "BU"){
        $("#tsHeader").hide();
        $("#fnHeader").hide();
        $("#csHeader").hide();
    }else if(role =="CS"){
        $("#buHeader").hide();
        $("#tsHeader").hide();
        $("#fnHeader").hide();
    }else if(role =="TS"){
        $("#buHeader").hide();
        $("#fnHeader").hide();
        $("#csHeader").hide();
    }else if(role =="FN"){
        $("#buHeader").hide();
        $("#csHeader").hide();
        $("#tsHeader").hide();

    }
}   

function renderPaySlip(){
    var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/getPaySlip?id='+id,
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
    $("#payslipImage").attr("src", "data:image/png;base64," + json);

      // return json;
}

function getImage(user){
      var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/users/getImage?username='+user,
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
      return json;
}


function getImageProfileData(data){
    var userList ={};
    $.each(data,function(index,item){
        var role = item.user.authorities[0].name;
        var username = item.user.username;
        if(role != "SALE" && role != "ASM"){
            userList[role] = username;
        }
    });

    if(userList["FN"]){
        var image = getImage(userList["FN"]);
        $("#imgFn").attr("src", "data:image/png;base64," + image);
    }
    if(userList["TS"]){
        var image = getImage(userList["TS"]);
        $("#imgTs").attr("src", "data:image/png;base64," + image);
    }
    if(userList["BU"]){
        var image = getImage(userList["BU"]);
        $("#imgBU").attr("src", "data:image/png;base64," + image);
    }
    if(userList["CS"]){
        var image = getImage(userList["CS"]);
        $("#imgCs").attr("src", "data:image/png;base64," + image);
    }


}

function renderCase(){
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
    caseManagement = json;

    getImageProfileData(caseManagement.caseActivitys);
    $(".caseNumber").text(json.caseNumber);
    $(".date").text( DateUtil.coverDateToStringAndTime(new Date() ) );
    $("#txtDate").val( DateUtil.coverDateToStringAndTime(json.installation.dates) );
    $("#txtInstallationPlace").val(json.installation.installationPlace);
    $("#txtPatientName").val(json.installation.patientName);
    $("#buNote").val(json.buNote);
    var caseType =null;
        $("#Choronicc3").prop("checked",false).prop("disabled",true);
        $("#AcuteCasec3").prop("checked",false).prop("disabled",true);
        $("#returnCase3").prop("checked",false).prop("disabled",true);
        $("#Demo2").prop("checked",false).prop("disabled",true);
       $("#Package2").prop("checked",false).prop("disabled",true);

    // if(json.caseType == "CR"){
    //     $("#Choronicc3").prop("checked",true).prop("disabled",true);
    // }else if(json.caseType == "AR"){
    //     $("#AcuteCasec3").prop("checked",true).prop("disabled",true);
    // }else if(json.caseType == "RT"){
    //     $("#returnCase3").prop("checked",true).prop("disabled",true);
    // }else if(json.caseType == "CH"){
    //    $("#Package2").prop("checked",true).prop("disabled",true);
    // }

    // if(json.caseType=="RT"){
    //   $("td.normal").hide();
    // }else{
    //   $("td.return").hide();
    // }

    if(caseManagement.installation.orders){
       var order =caseManagement.installation.orders;
       console.log(order)
       if(order=="Chronic Case")$("#Choronicc3").prop("checked",true);
       if(order=="Acute Case")$("#AcuteCasec3").prop("checked",true);
       if(order=="Demo")$("#Demo2").prop("checked",true);
       if(order=="รับเครื่องกลับ")$("#returnCase3").prop("checked",true);
       if(order=="เช่ายืมพร้อม Package พร้อมรับเครื่องกลับ")$("#Package2").prop("checked",true);
    }
    if(caseManagement.installation.dates){
      console.log("installation date")
       $("#usedDate").text(DateUtil.coverDateToStringAndTime(caseManagement.installation.dates));
       $("#txtDeliveryDate").val(DateUtil.coverDateToStringAndTime3(caseManagement.installation.dates));
    }

    $("tbody[name=product]").empty();
    if(json.machine1 != null){
    
        $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine1'  /> </center></td>"+
          "<td>"+json.machine1.code+ "</td>"+
          "<td>"+(json.machine1.serialNumber==null?"":json.machine1.serialNumber)+" </td>"+
          "<td>"+json.machine1.name+" </td>"+
           "</tr>");

        $("tbody[name=product]").append("<tr><td>1</td><td>"+(json.machine1.code == null ?"":json.machine1.code)+"</td><td>"+json.machine1.name+" "+(json.machine1.serialNumber==null?"" :"<br/>"+json.machine1.serialNumber ) +"</td><td>1</td></tr>");
    }
    if(json.machine2 != null){
         $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine2'  /> </center></td>"+
          "<td>"+json.machine2.code+ "</td>"+
          "<td>"+(json.machine2.serialNumber==null?"":json.machine2.serialNumber)+" </td>"+
          "<td>"+json.machine2.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>2</td><td>"+(json.machine2.code == null ?"":json.machine2.code)+"</td><td>"+json.machine2.name+" "+(json.machine2.serialNumber==null?"" :"<br/>"+json.machine2.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine3 != null){
          $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox'  for='tsCheckbox' name='flagCheckMachine3'  /> </center></td>"+
          "<td>"+json.machine3.code+ "</td>"+
          "<td>"+(json.machine3.serialNumber==null?"":json.machine3.serialNumber)+" </td>"+
          "<td>"+json.machine3.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>3</td><td>"+(json.machine3.code == null ?"":json.machine3.code)+"</td><td>"+json.machine3.name+" "+(json.machine3.serialNumber==null?"" :"<br/>"+json.machine3.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine4 != null){
          $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine4'  /> </center></td>"+
          "<td>"+json.machine4.code+ "</td>"+
          "<td>"+(json.machine4.serialNumber==null?"":json.machine4.serialNumber)+" </td>"+
          "<td>"+json.machine4.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>4</td><td>"+(json.machine4.code == null ?"":json.machine4.code)+"</td><td>"+json.machine4.name+" "+(json.machine4.serialNumber==null?"" :"<br/>"+json.machine4.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine5 != null){
         $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine5'  /> </center></td>"+
          "<td>"+(json.machine5.code == null?"": json.machine5.code) + "</td>"+
          "<td>"+(json.machine5.serialNumber==null?"":json.machine5.serialNumber)+" </td>"+
          "<td>"+(json.machine5.name == null?"": json.machine5.name) +" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>5</td><td>"+(json.machine5.code == null ?"":json.machine5.code)+"</td><td>"+json.machine5.name+"  "+(json.machine5.serialNumber==null?"" :"<br/>"+json.machine5.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine6 != null){
         $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine5'  /> </center></td>"+
          "<td>"+(json.machine6.code == null?"": json.machine6.code) + "</td>"+
          "<td>"+(json.machine6.serialNumber==null?"":json.machine6.serialNumber)+" </td>"+
          "<td>"+(json.machine6.name == null?"": json.machine6.name) +" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>5</td><td>"+(json.machine6.code == null ?"":json.machine6.code)+"</td><td>"+json.machine6.name+"  "+(json.machine6.serialNumber==null?"" :"<br/>"+json.flagCheckMachine6.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine7 != null){
             $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine7'  /> </center></td>"+
          "<td>"+json.machine7.code+ "</td>"+
          "<td>"+(json.machine7.serialNumber==null?"":json.machine7.serialNumber)+" </td>"+
          "<td>"+json.machine7.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>7</td><td>"+(json.machine7.code == null ?"":json.machine7.code)+"</td><td>"+json.machine7.name+" "+(json.machine7.serialNumber==null?"" :"<br/>"+json.machine7.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine8 != null){
        $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine8'  /> </center></td>"+
          "<td>"+json.machine8.code+ "</td>"+
          "<td>"+(json.machine8.serialNumber==null?"":json.machine8.serialNumber)+" </td>"+
          "<td>"+json.machine8.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>8</td><td>"+(json.machine8.code == null ?"":json.machine8.code)+"</td><td>"+json.machine8.name+" "+(json.machine8.serialNumber==null?"" :"<br/>"+json.machine8.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine9 != null){
          $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine9'  /> </center></td>"+
          "<td>"+json.machine9.code+ "</td>"+
          "<td>"+(json.machine9.serialNumber==null?"":json.machine9.serialNumber)+" </td>"+
          "<td>"+json.machine9.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>9</td><td>"+(json.machine9.code == null ?"":json.machine9.code)+"</td><td>"+json.machine9.name+" "+(json.machine9.serialNumber==null?"" :"<br/>"+json.machine9.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine10 != null){
         $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine10'  /> </center></td>"+
          "<td>"+json.machine10.code+ "</td>"+
          "<td>"+(json.machine10.serialNumber==null?"":json.machine10.serialNumber)+" </td>"+
          "<td>"+json.machine10.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>10</td><td>"+(json.machine10.code == null ?"":json.machine10.code)+"</td><td>"+json.machine10.name+" "+(json.machine10.serialNumber==null?"" :"<br/>"+json.machine10.serialNumber ) +"</td><td>1</td></tr>");

    }
    if(json.machine11 != null){
         $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine10'  /> </center></td>"+
          "<td>"+json.machine11.code+ "</td>"+
          "<td>"+(json.machine11.serialNumber==null?"":json.machine11.serialNumber)+" </td>"+
          "<td>"+json.machine11.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>10</td><td>"+(json.machine11.code == null ?"":json.machine11.code)+"</td><td>"+json.machine11.name+" "+(json.machine11.serialNumber==null?"" :"<br/>"+json.machine11.serialNumber ) +"</td><td>1</td></tr>");

    }
    if(json.machine12 != null){
         $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine10'  /> </center></td>"+
          "<td>"+json.machine12.code+ "</td>"+
          "<td>"+(json.machine12.serialNumber==null?"":json.machine12.serialNumber)+" </td>"+
          "<td>"+json.machine12.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>10</td><td>"+(json.machine12.code == null ?"":json.machine12.code)+"</td><td>"+json.machine12.name+" "+(json.machine12.serialNumber==null?"" :"<br/>"+json.machine12.serialNumber ) +"</td><td>1</td></tr>");

    }
    if(json.machine13 != null){
         $("#tsFlag").append("<tr>"+
          "<td><center> <input type='checkbox' for='tsCheckbox' name='flagCheckMachine10'  /> </center></td>"+
          "<td>"+json.machine13.code+ "</td>"+
          "<td>"+(json.machine13.serialNumber==null?"":json.machine13.serialNumber)+" </td>"+
          "<td>"+json.machine13.name+" </td>"+
           "</tr>");
        $("tbody[name=product]").append("<tr><td>10</td><td>"+(json.machine13.code == null ?"":json.machine13.code)+"</td><td>"+json.machine13.name+" "+(json.machine13.serialNumber==null?"" :"<br/>"+json.machine13.serialNumber ) +"</td><td>1</td></tr>");

    }

$("input[for=tsCheckbox]").click(function(){
  var length1 = $("input[for=tsCheckbox]").length;
  var length2 = $("input[for=tsCheckbox]:checked").length;
  if(length1 == length2){
    $("#checkAll").prop("checked",true);
  }else{
    $("#checkAll").prop("checked",false);
  }
});
    if(json.flagCheckMachine1 == "Y"){
        $("[name=flagCheckMachine1]").prop("checked",true);
    }

    if(json.flagCheckMachine2 == "Y"){
        $("[name=flagCheckMachine2").prop("checked",true);
    }
    if(json.flagCheckMachine3 == "Y"){
        $("[name=flagCheckMachine3]").prop("checked",true);
    }
    
    if(json.flagCheckMachine4 == "Y"){
        $("[name=flagCheckMachine4]").prop("checked",true);
    }
    
    if(json.flagCheckMachine5 == "Y"){
        $("[name=flagCheckMachine5]").prop("checked",true);
    }
    
    if(json.flagCheckMachine6 == "Y"){
        $("[name=flagCheckMachine6]").prop("checked",true);
    }
    
    if(json.flagCheckMachine7 == "Y"){
        $("[name=flagCheckMachine7]").prop("checked",true);
    }
    
    if(json.flagCheckMachine8 == "Y"){
        $("[name=flagCheckMachine8]").prop("checked",true);
    }
    
    if(json.flagCheckMachine9 == "Y"){
        $("[name=flagCheckMachine9]").prop("checked",true);
    }
    
    if(json.flagCheckMachine10 == "Y"){
        $("[name=flagCheckMachine10]").prop("checked",true);
    }
    
    $("#receiptNo").val( json.receiptNo == null ?"":json.receiptNo);
    $("#receipientName").val(json.receipientName == null ? "" : json.receipientName );
    $("#receiptDate").val(json.receiptDate == null ? "" :DateUtil.coverDateToStringAndTime3(json.receiptDate));
    $("#payDate").val(json.payDate == null ? "" :DateUtil.coverDateToStringAndTime3(json.payDate));
    $("#bank").val(json.bank==null?"":json.bank);
    $("#paymentType").val(json.paymentType==null?"":json.paymentType);
    $("#receipientAddress1").val(json.receipientAddress1==null?"":json.receipientAddress1);
    $("#receipientAddress2").val(json.receipientAddress2==null?"":json.receipientAddress2);
    $("#receipientAddress3").val(json.receipientAddress3==null?"":json.receipientAddress3);
    $("#receipientAddress4").val(json.receipientAddress4==null?"":json.receipientAddress4);
    $("#receipientAddress5").val(json.receipientAddress5==null?"":json.receipientAddress5);


    $("#txtDeliveryName").val(json.deliveryName==null?"":json.deliveryName);
    $("#deliveryTelNo").val(json.deliveryTelNo==null?"":json.deliveryTelNo);
     // $("#txtDeliveryDate").val(json.deliveryDate==null?"":DateUtil.coverDateToStringAndTime3(json.deliveryDate));
   
     $("#txtDeliveryDate").val(DateUtil.coverDateToStringAndTime3(caseManagement.installation.dates));

    $("#txtDeliveryNote").val(json.deliveryNote==null?"":json.deliveryNote);

    
     
      
       


     $("#amount").autoNumeric('init');
    $("#amount").autoNumeric('set',json.amount == null?0: json.amount);

    $("[name=caseNumber]").text(json.caseNumber);
    $("[name=patientName").text(json.prescription.patientName);
    $("[name=hospitalName").text(json.prescription.hospitalName);
    $("[name=serialNumber").text(json.prescription.serialNumber);
    $("div#home").find("[name=modes]").text(json.prescription.nurseMenu.modes == null ? "":json.prescription.nurseMenu.modes   );
    $("div#home").find("[name=minDrawVol]").text(json.prescription.nurseMenu.minDrawVol == null ? "":json.prescription.nurseMenu.minDrawVol );
    $("div#home").find("[name=minDrainTime]").text(json.prescription.nurseMenu.minDrawTime == null ? "":json.prescription.nurseMenu.minDrawTime );
    $("div#home").find("[name=negOfLimit]").text(json.prescription.nurseMenu.negOfTime == null ? "":json.prescription.nurseMenu.negOfTime );
    $("div#home").find("[name=postOfLimit]").text(json.prescription.nurseMenu.postOfLimit == null ? "":json.prescription.nurseMenu.postOfLimit );
    $("div#home").find("[name=smartDwells]").text(json.prescription.nurseMenu.smartDwells == null ? "":json.prescription.nurseMenu.smartDwells );
    $("div#home").find("[name=heaterBagEmpty]").text(json.prescription.nurseMenu.heaterBagEmpty == null ? "":json.prescription.nurseMenu.heaterBagEmpty );
    $("div#home").find("[name=tidalFullDrns]").text(json.prescription.nurseMenu.tidalFullDrns == null ? "":json.prescription.nurseMenu.tidalFullDrns );
    $("div#home").find("[name=language]").text(json.prescription.nurseMenu.language == null ? "":json.prescription.nurseMenu.language );
    $("div#home").find("[name=flush]").text(json.prescription.nurseMenu.flush == null ? "":json.prescription.nurseMenu.flush );
    $("div#home").find("[name=programLocked]").text(json.prescription.nurseMenu.programLocked == null ? "":json.prescription.nurseMenu.programLocked );
    $("div#home").find("[name=weightReset]").text(json.prescription.nurseMenu.weightReset == null ? "":json.prescription.nurseMenu.weightReset );
   
    $("div#menu1").find("[name=adjustBrightNess]").text(json.prescription.makeAdjustment.adjustBrightness == null ? "":json.prescription.makeAdjustment.adjustBrightness   );
    $("div#menu1").find("[name=adjustLoudness]").text(json.prescription.makeAdjustment.adjustLoundNess == null ? "":json.prescription.makeAdjustment.adjustLoundNess );
    $("div#menu1").find("[name=autoDim]").text(json.prescription.makeAdjustment.autoDim == null ? "":json.prescription.makeAdjustment.autoDim );
    $("div#menu1").find("[name=setClock]").text(json.prescription.makeAdjustment.setClock == null ? "":json.prescription.makeAdjustment.setClock );
    $("div#menu1").find("[name=setDate]").text(json.prescription.makeAdjustment.setDail == null ? "":json.prescription.makeAdjustment.setDail );
    $("div#menu1").find("[name=drainTime]").text(json.prescription.makeAdjustment.drainTimeMin == null ? "":json.prescription.makeAdjustment.drainTimeMin );
    $("div#menu1").find("[name=drainAlram]").text(json.prescription.makeAdjustment.drainAlram == null ? "":json.prescription.makeAdjustment.drainAlram );
    $("div#menu1").find("[name=comfortControl]").text(json.prescription.makeAdjustment.comfortControll == null ? "":json.prescription.makeAdjustment.comfortControll );
    $("div#menu1").find("[name=lastManualDrain]").text(json.prescription.makeAdjustment.lastManualDrain == null ? "":json.prescription.makeAdjustment.lastManualDrain );
    $("div#menu1").find("[name=ufTarget]").text(json.prescription.makeAdjustment.urTarget == null ? "":json.prescription.makeAdjustment.urTarget );
    $("div#menu1").find("[name=alram]").text(json.prescription.makeAdjustment.alram == null ? "":json.prescription.makeAdjustment.alram );
   

    $("div#menu2").find("[name=opdThearapy]").text(json.prescription.changePrograme.opd.therapy)
    $("div#menu2").find("[name=opdTotalVol]").text(json.prescription.changePrograme.opd.totalVol)
    $("div#menu2").find("[name=opdThearapyTime]").text(json.prescription.changePrograme.opd.therapyTime)
    $("div#menu2").find("[name=opdFillVol]").text(json.prescription.changePrograme.opd.fillVol);
    $("div#menu2").find("[name=opdLastFillVol]").text(json.prescription.changePrograme.opd.lastFillVol)
    $("div#menu2").find("[name=opdDextRose]").text(json.prescription.changePrograme.opd.dextRose ==null ?"":json.prescription.changePrograme.opd.dextRose);
    $("div#menu2").find("[name=opdWeightUnit]").text(json.prescription.changePrograme.opd.weightUnit)
    $("div#menu2").find("[name=opdPatientWeight]").text(json.prescription.changePrograme.opd.patientWeight)

    $("div#menu2").find("[name=dextRose]").text(json.prescription.changePrograme.tidal.dextRose==null?"":json.prescription.changePrograme.tidal.dextRose)
    $("div#menu2").find("[name=fillVol]").text(json.prescription.changePrograme.tidal.fillVol)
    $("div#menu2").find("[name=fullDrainEvery]").text(json.prescription.changePrograme.tidal.fullDrainEvery)
    $("div#menu2").find("[name=lastFillVol]").text(json.prescription.changePrograme.tidal.lastFillVol)
    $("div#menu2").find("[name=patientWeight]").text(json.prescription.changePrograme.tidal.patientWeight)
    $("div#menu2").find("[name=therapy]").text(json.prescription.changePrograme.tidal.therapy)
    $("div#menu2").find("[name=therapyTime]").text(json.prescription.changePrograme.tidal.therapyTime)
    $("div#menu2").find("[name=tidalVol]").text(json.prescription.changePrograme.tidal.tidalVol)
    $("div#menu2").find("[name=totalOf]").text(json.prescription.changePrograme.tidal.totalOf)
    $("div#menu2").find("[name=totalVol]").text(json.prescription.changePrograme.tidal.totalVol)
    $("div#menu2").find("[name=weightUnit]").text(json.prescription.changePrograme.tidal.weightUnit)
    console.log("assignBu : "+json.assignBu)
    if(json.assignBu !=null ){
         $("#dsPass").addClass('green');
    }
    var customer = json.customer;
    $("#receipientName").val(customer.patientName == null ?"":customer.patientName);
    $("#receipientSur").val(customer.patientLastName == null ?"":customer.patientLastName);
    $("#receipientAddress1").val(customer.currentAddress1);
    $("#receipientAddress2").val(customer.currentAddress2);
    $("#receipientAddress3").val(customer.currentSubDistrict);
    $("#receipientAddress4").val(customer.currentProvince);
    $("#receipientAddress5").val(customer.currentZipCode);


    $("#shippingAddress1").val(customer.shippingAddress1);
    $("#shippingAddress2").val(customer.shippingAddress2);
    $("#shippingAddress3").val(customer.shippingDistrict );
    $("#shippingAddress4").val(customer.shippingProvince);
    $("#shippingAddress5").val(customer.shippingZipCode);

    if(json.note!=null){
        $("#buNote").val(json.note)
        $("#txtDeliveryNote").val(json.note)
        $("#tsNote").val(json.note)
        $("#fnNote").val(json.note)
    }

    fileUploads = json.fileUploads;
    $.each(json.fileUploads,function(index,item){
        if(item.fileType == "ID"){
            $("#idPass").addClass('green');
        }else if(item.fileType == 'PS'){
            $("#payslipPass").addClass('green');
        }else if(item.fileType == 'DS'){
            $("#dsPass").addClass('green');
             status = "A";
             $("#reject").addClass("disabled");
        }
    });
    $("#prescriptionPass").addClass('green');
}
$("#reject").click(function(){
    status = "R";
    $("#approve").addClass("disabled");
});
$("#approve").click(function(){
    status = "A";
    $("#reject").addClass("disabled");
    // $("#digitalSignatureModal").modal('show');
});

// $("#btnPrescription").click(function(){
//    $("#prescriptionModal").modal('show');
// });

$("#tsSave").click(function(){
    flagCheckMachine1 = $("[name=flagCheckMachine1]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine2 = $("[name=flagCheckMachine2]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine3 = $("[name=flagCheckMachine3]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine4 = $("[name=flagCheckMachine4]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine5 = $("[name=flagCheckMachine5]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine6 = $("[name=flagCheckMachine6]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine7 = $("[name=flagCheckMachine7]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine8 = $("[name=flagCheckMachine8]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine9 = $("[name=flagCheckMachine9]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine10 = $("[name=flagCheckMachine10]").prop("checked")  == true ? "Y" : "N";

    data = {
        updatedBy : session['user'],
        flagCheckMachine1 : flagCheckMachine1,
        flagCheckMachine2 : flagCheckMachine2,
        flagCheckMachine3 : flagCheckMachine3,
        flagCheckMachine4 : flagCheckMachine4,
        flagCheckMachine5 : flagCheckMachine5,
        flagCheckMachine6 : flagCheckMachine6,
        flagCheckMachine7 : flagCheckMachine7,
        flagCheckMachine8 : flagCheckMachine8,
        flagCheckMachine9 : flagCheckMachine9,
        flagCheckMachine10 : flagCheckMachine10,
        id : id,
        closeFlag:null,
        note:$("#tsNote").val()

    }
    tsToBackEnd(data);

});



function tsToBackEnd(data){

      $('.dv-background').show();
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/casemanagements/confirmByTS",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.getResponseHeader('errorStatus')=="N"){
                          swal({
                                  title:"Success",
                                  text: "Send Success",
                                  type: "success",
                                  showCancelButton: false,
                                  // timer: 1500,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                    window.location.href=session['context']+'/casemanagements/listviewcase'
                                   
                                });
                         }else{
                            alert(xhr.getResponseHeader("errorMsg"));
                        }
                 $('.dv-background').hide();
                    
                },
                async:false
            });


}

$("#tsSend").click(function(){
flagCheckMachine1 = $("[name=flagCheckMachine1]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine2 = $("[name=flagCheckMachine2]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine3 = $("[name=flagCheckMachine3]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine4 = $("[name=flagCheckMachine4]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine5 = $("[name=flagCheckMachine5]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine6 = $("[name=flagCheckMachine6]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine7 = $("[name=flagCheckMachine7]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine8 = $("[name=flagCheckMachine8]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine9 = $("[name=flagCheckMachine9]").prop("checked")  == true ? "Y" : "N";
    flagCheckMachine10 = $("[name=flagCheckMachine10]").prop("checked")  == true ? "Y" : "N";

    data = {
        updatedBy : session['user'],
        flagCheckMachine1 : flagCheckMachine1,
        flagCheckMachine2 : flagCheckMachine2,
        flagCheckMachine3 : flagCheckMachine3,
        flagCheckMachine4 : flagCheckMachine4,
        flagCheckMachine5 : flagCheckMachine5,
        flagCheckMachine6 : flagCheckMachine6,
        flagCheckMachine7 : flagCheckMachine7,
        flagCheckMachine8 : flagCheckMachine8,
        flagCheckMachine9 : flagCheckMachine9,
        flagCheckMachine10 : flagCheckMachine10,
        id : id,
        closeFlag:"Y",
        note:$("#tsNote").val()


    }
    tsToBackEnd(data);

});

    $("#buSend").click(function(){

      if(clickStatus == null){
         swal({
                title:"information",
                text: "กรุณาเลือกสถานะของเอกสาร",
                type: "warning",
                showCancelButton: false,
                // timer: 1500,
                showConfirmButton: true,
                closeOnConfirm: true
              },function(){
              });
        return false;
      }


       var buNote = $("#buNote").val();
       if(status != ""){
         var data ={
            buNote : buNote,
            status : status,
            updatedBy : session['user'],
            id : id
        }
         $('.dv-background').show();
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/casemanagements/confirmByBU",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.getResponseHeader('errorStatus')=="N"){
                          swal({
                                  title:"Success",
                                  text: "Send Success",
                                  type: "success",
                                  showCancelButton: false,
                                  // timer: 1500,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                    window.location.href=session['context']+'/casemanagements/listviewcase'
                                });
                         }else{
                            alert(xhr.getResponseHeader("errorMsg"));
                        }
                    }
                 $('.dv-background').hide();
                    
                },
                async:false
            });

       }
       

    });

    $("#copyId").click(function(){
        commonWindowPopupfile("ID");
    });

    $("#psId").click(function(){
        commonWindowPopupfile("PS");
    });


    $("#dsId").click(function(){
        // if(caseManagement.)
        downloadInstallation();
    });


function commonWindowPopupfile(fileType) {
  // var url =   'http://58.181.168.159:8082/files/downloadFileByCaseIdAndFileType?caseId='+id+'&fileType='+fileType;
  var url = session['context']+"/casemanagements/popup?id="+id+"&fileType="+fileType;
  var properties;
  var positionX = 20;
  var positionY = 20;
  var width = 800;
  var height = 600;
  properties = "width=" + width + ", height=" + height;
  properties += ", toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no";
  properties += ", top=" + positionY + ", left=" + positionX;
  window.open(url, '', properties);


}

function commonWindowDigitalPopupfile() {
 var username = caseManagement.assignBu ==null? flagApprove==1?session['user'] :null: caseManagement.assignBu  ;  

  var url = session['context']+"/casemanagements/popupDigitalSignature?username="+username;
  var properties;
  var positionX = 20;
  var positionY = 20;
  var width = 800;
  var height = 600;
  properties = "width=" + width + ", height=" + height;
  properties += ", toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no";
  properties += ", top=" + positionY + ", left=" + positionX;
  window.open(url, '', properties);


}

$("#btnConfirmSave").click(function(){
    var formData = new FormData();
    var data={
         "id":id
     }
     var txtPassword = $("#inputPassword").val();
     var checkFlag = 0 ; 

     $.each(privateData,function(index,item){
          if(item.toUpperCase() == txtPassword.toUpperCase()  ){
            checkFlag =1;
          }
     });
    

     if(checkFlag == 0 ){
       swal({
                  title:"Warning",
                  text: "กรุณาระบุ Password ให้ถูกต้อง",
                  type: "warning",
                  showCancelButton: false,
                  showConfirmButton: true,
                  closeOnConfirm: true
                },function(){
                });
        return false;
     }

      var buNote = $("#buNote").val();
       if(status != ""){
         var data ={
            buNote : buNote,
            status : status,
            updatedBy : session['user'],
            id : id
        }
         $('.dv-background').show();
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/casemanagements/confirmByBU",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                       
                    formData.append("json",JSON.stringify(data));
                    if(role.toUpperCase()=="BU"){
                        $("#browsingSig").modal('hide');
                         swal({
                                  title:"Information",
                                  text: "Approve Success",
                                  type: "success",
                                  showCancelButton: false,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                  caseManagement.assignBu = session['user']
                                    $("#dsPass").addClass('green');
                                    $("#approve").removeClass('btn-blue');
                                    $("#approve").removeClass('btn-info');
                                    $("#approve").addClass('btn-success');
                                    $("#approve").prop('disabled',true);

                                    flagApprove=1;
                                });
                     }else{
                          swal({
                                  title:"Warning",
                                  text: "Approve fail",
                                  type: "warning",
                                  showCancelButton: false,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                });
                     }
                    }
                 $('.dv-background').hide();
                    
                },
                async:false
            });

       }


 
    
    

    // $.ajax({
    //     type: "POST",
    //     headers: {
    //         Accept: 'application/json',
    //     },
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     url: session.context+'/casemanagements/uploadDigitalSignature',
    //     processData: false,
    //     contentType: false,
    //     data: formData,
    //     async: false,
    //     complete: function (xhr) {
    //          if(xhr.readyState==4){
    //             if(xhr.getResponseHeader('errorStatus')=="N"){
    //                 renderCase();
    //                 $("#digitalSignatureModal").modal('hide');
    //             }else {
    //                 alert(xhr.getResponseHeader("errorMsg"));
    //             }
    //          }   
    //     }
    // });


})



    $("#logout").click(function(){
      submitlogout() 
    });
$("#csSend").click(function(){
    var dateDeliver = $("#txtDeliveryDate").val().split("-");
    dateDeliver = dateDeliver[2]+"-"+dateDeliver[1]+"-"+dateDeliver[0]
    var deliverType = $("#deliveryType").val() == "OTH" ? $("#txtOTh").val() : "TNT Express";

    var shippingAddress1 = $("#shippingAddress1").val();
    var shippingAddress2 = $("#shippingAddress2").val();
    var shippingDistrict= $("#shippingAddress3").val();
    var shippingProvince= $("#shippingAddress4").val();
    var shippingZipCode= $("#shippingAddress5").val();

   var data= {
    "updatedBy":session['user'],
    "deliveryProvider":deliverType,
    "deliveryName":$("#txtDeliveryName").val(),
    "deliveryNote":$("#txtDeliveryNote").val(),
    "id":id,
    "deliveryDate":dateDeliver  , 
    "deliveryTelNo":$("#deliveryTelNo").val(),
    "shippingAddress1":shippingAddress1,
    "shippingAddress2":shippingAddress2,
    "shippingDistrict":shippingDistrict,
    "shippingProvince":shippingProvince,
    "shippingZipCode":shippingZipCode
    }

    if( $("#txtDeliveryName").val() == "" || $("#deliveryTelNo").val() == ""){
        swal({
                  title:"Warning",
                  text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                  type: "warning",
                  showCancelButton: false,
                  // timer: 1500,
                  showConfirmButton: true,
                  closeOnConfirm: true
                },function(){
                   
                });
       
        return false;
    }

         $('.dv-background').show();
     $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/casemanagements/confirmByCS",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.getResponseHeader('errorStatus')=="N"){
                          swal({
                                  title:"Success",
                                  text: "Send Success",
                                  type: "success",
                                  showCancelButton: false,
                                  // timer: 1500,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                    window.location.href=session['context']+'/casemanagements/listviewcase'
                                   
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


$("#checkAll").click(function(){
    var flag =  $("#checkAll").prop("checked");
  if( flag== true){
    $("input[for=tsCheckbox]").prop("checked",true);
  }else{
     $("input[for=tsCheckbox]").prop("checked",false);
  }

});


$("#fnSend").click(function(){
    var payDate  = $("#payDate").val();
    var paymentType = $("#paymentType").val();
    var bank = $("#bank").val();
    var amount  =  $("#amount").autoNumeric('get') ;
    var receiptNo = $("#receiptNo").val();
    var receiptDate = $("#receiptDate").val();
    var receipientName = $("#receipientName").val();
    var receiptAddress1 = $("#receipientAddress1").val();
    var receiptAddress2 = $("#receipientAddress2").val();
    var receiptAddress3 = $("#receipientAddress3").val();
    var receiptAddress4 = $("#receipientAddress4").val();
    var receiptAddress5= $("#receipientAddress5").val();

    if(payDate ==""|| paymentType =="" || bank =="" || amount=="" || receiptNo==""|| receiptDate =="" ||receipientName =="" ){
        swal({
                  title:"Warning",
                  text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                  type: "warning",
                  showCancelButton: false,
                  // timer: 1500,
                  showConfirmButton: true,
                  closeOnConfirm: true
                },function(){
                   
                });
       
        return false;
    }

    var data ={
        updatedBy  : session['user'],
        payDate : DateUtil.coverStringToDate(payDate),
        paymentType : paymentType,
        bank : bank,
        amount : amount,
        receiptNo : receiptNo,
        receiptDate : DateUtil.coverStringToDate(receiptDate),
        receipientName : receipientName,
        receiptAddress1 : receiptAddress1,
        receiptAddress2 : receiptAddress2,
        receiptAddress3 : receiptAddress3,
        receiptAddress4 : receiptAddress4,
        receiptAddress5 : receiptAddress5,
        id : id,
        note : $("fnNote").val()

    };


         $('.dv-background').show();
         $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/casemanagements/confirmByFN",
                data:JSON.stringify(data),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.getResponseHeader('errorStatus')=="N"){
                          swal({
                                  title:"Success",
                                  text: "Send Success",
                                  type: "success",
                                  showCancelButton: false,
                                  // timer: 1500,
                                  showConfirmButton: true,
                                  closeOnConfirm: true
                                },function(){
                                    window.location.href=session['context']+'/casemanagements/listviewcase'
                                   
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
// $("input[type=date]").change(function(){
//      var a = $(this).val()
//      var data = a.split("-");
//      var dateformat = data[0]+"-"+data[1]+'-'+data[2]
//      console.log(dateformat)
//      $(this).val(dateformat);
// });


$("#receiptNo").keypress(function(event){
 // return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57)


    var ew = event.which;
    if(ew == 32)
        return true;
    if(45 <= ew && ew <= 61)
        return true;
    if(65 <= ew && ew <= 90)
        return true;
    if(97 <= ew && ew <= 122)
        return true;
    if(ew<=60){
      return true;
    }
    return false;

});


$("#deliveryType").change(function(){
  console.log("change")
  var value = $(this).val();
  if(value == "OTH"){
    $("#txtOTh").show();

  }else{
    $("#txtOTh").hide();
  }
})

