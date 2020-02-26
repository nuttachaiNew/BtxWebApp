var tempUser = {};
var tempImage = {};
var id = window.location.href.split("=")[1];
var data = {};
$(document).ready(function () {
    renderProfile();
	renderData();
});


    $("#logout").click(function(){
      submitlogout() 
    });

  $("#btnReceipt").click(function(){
  window.location.href=fileHttp+"/downloadFormReceipt?caseId="+id
    
  });  

  
$("#backPage").click(function(){
     window.location.href=session['context']+'/casemanagements/listviewcase'; 
})


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
   data =json
    if(!json.assignFn){
      $("#btnReceipt").prop('disabled',true);
    }
    $("[name=caseNumber]").text(json.caseNumber);
    $("[name=date]").text( DateUtil.coverDateToStringAndTime(new Date() ) );
    var cureentAddess = ""; 

    cureentAddess+=  json.customer.currentAddress1 == null ? " " : json.customer.currentAddress1 +" ";
    cureentAddess+=  json.customer.currentAddress2 == null ? " " : json.customer.currentAddress2  +" ";
    cureentAddess+=  json.customer.currentDistrict == null ? " " : json.customer.currentDistrict  +" ";
    cureentAddess+=  json.customer.currentSubDistrict == null ? " " : json.customer.currentSubDistrict  +" ";
    cureentAddess+=  json.customer.currentProvince == null ? " " : json.customer.currentProvince  +" ";
    cureentAddess+=  json.customer.currentZipCode == null ? " " : json.customer.currentZipCode  +" ";
    if(json.customer.patientName) $("#customerName").text(json.customer.patientName + " "+ json.customer.patientLastName );
    $("#nationId").text(json.customer.nationId == null?" ":json.customer.nationId );
    $("#currentAddress").text(cureentAddess);
    $("#customerTelNo").text(json.customer.telNo == null?"":json.customer.telNo);
    $("#customerType").text(customerType[json.customer.customerType]);
    $("#caseType").text( caseType[json.caseType]);
    $("#note").text(json.note == null?"":json.note);

$("tbody[name=product]").empty();
    if(json.machine1 != null){
        $("tbody[name=product]").append("<tr><td>1</td><td>"+json.machine1.machineType+"</td><td>"+json.machine1.name+" "+(json.machine1.serialNumber==null?"" :"<br/>"+json.machine1.serialNumber ) +"</td><td>1</td></tr>");
    }
    if(json.machine2 != null){
        $("tbody[name=product]").append("<tr><td>2</td><td>"+json.machine2.machineType+"</td><td>"+json.machine2.name+" "+(json.machine2.serialNumber==null?"" :"<br/>"+json.machine2.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine3 != null){
        $("tbody[name=product]").append("<tr><td>3</td><td>"+json.machine3.machineType+"</td><td>"+json.machine3.name+" "+(json.machine3.serialNumber==null?"" :"<br/>"+json.machine3.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine4 != null){
        $("tbody[name=product]").append("<tr><td>4</td><td>"+json.machine4.machineType+"</td><td>"+json.machine4.name+" "+(json.machine4.serialNumber==null?"" :"<br/>"+json.machine4.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine5 != null){
        $("tbody[name=product]").append("<tr><td>5</td><td>"+json.machine5.machineType+"</td><td>"+json.machine5.name+"  "+(json.machine5.serialNumber==null?"" :"<br/>"+json.machine5.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine6 != null){
        $("tbody[name=product]").append("<tr><td>6</td><td>"+json.machine6.machineType+"</td><td>"+json.machine6.name+" "+(json.machine6.serialNumber==null?"" :"<br/>"+json.machine6.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine7 != null){
        $("tbody[name=product]").append("<tr><td>7</td><td>"+json.machine7.machineType+"</td><td>"+json.machine7.name+" "+(json.machine7.serialNumber==null?"" :"<br/>"+json.machine7.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine8 != null){
        $("tbody[name=product]").append("<tr><td>8</td><td>"+json.machine8.machineType+"</td><td>"+json.machine8.name+" "+(json.machine8.serialNumber==null?"" :"<br/>"+json.machine8.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine9 != null){
      
        $("tbody[name=product]").append("<tr><td>9</td><td>"+json.machine9.machineType+"</td><td>"+json.machine9.name+" "+(json.machine9.serialNumber==null?"" :"<br/>"+json.machine9.serialNumber ) +"</td><td>1</td></tr>");

    }if(json.machine10 != null){
        $("tbody[name=product]").append("<tr><td>10</td><td>"+json.machine10.machineType+"</td><td>"+json.machine10.name+" "+(json.machine10.serialNumber==null?"" :"<br/>"+json.machine10.serialNumber ) +"</td><td>1</td></tr>");

    }


  $("#deliverName").text(json.deliveryName==null?"":json.deliveryName);  
  $("#deliverType").text(json.deliveryProvider==null?"":json.deliveryProvider);  
  $("#deliverTelno").text(json.deliveryTelNo==null?"":json.deliveryTelNo);  
  
  $("[name=caseNumber]").text(json.caseNumber);
    $("[name=patientName").text(json.prescription.patientName);
    $("[name=hospitalName").text(json.prescription.hospitalName ==null ?"":json.prescription.hospitalName);
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


    var activities = json.caseActivitys;
    $.each(activities,function(index,item){
        var role = item.user.authorities[0].code;
        var roleName = item.user.authorities[0].name
        if(tempUser[item.user.username] ==null){
          var profile = getUserProfile(item.user.username);
          tempUser[item.user.username] = profile.branch.name;
        }
   
console.log(role+ " : "+roleName+" : "+DateUtil.coverDateToStringAndTime2(item.actionDate) + " : "+item.actionDate)
        if(role=="SAL" || role=="ADM"){
          $("#saleContainerTimeLine").removeClass('containerTL2');
          $("#saleContainerTimeLine").addClass('containerTL');
          $("#saleName").text(item.user.firstName+" "+item.user.lastName);
          $("#saleArea").text(tempUser[item.user.username]);
          $("#saleTel").text(item.user.telephoneNumber);
          $("#saleMail").text(item.user.email);
          $("#saleAction").text(item.actionStatus);
          $("#saleActionDate").text(DateUtil.coverDateToStringAndTime2(item.actionDate));
        }else if(role=="ASM"){
           $("#asmContainerTimeLine").removeClass('containerTL2');
          $("#asmContainerTimeLine").addClass('containerTL');
          $("#asmName").text(item.user.firstName+" "+item.user.lastName);
          $("#asmArea").text(tempUser[item.user.username]);
          $("#asmTel").text(item.user.telephoneNumber);
          $("#asmMail").text(item.user.email);
          $("#asmAction").text(item.actionStatus);
          $("#asmActionDate").text(DateUtil.coverDateToStringAndTime2(item.actionDate));
        }else if(role=="BU" || roleName == "BU"){
          console.log("BU=========================")
           $("#buContainerTimeLine").removeClass('containerTL2');
          $("#buContainerTimeLine").addClass('containerTL');
          $("#buName").text(item.user.firstName+" "+item.user.lastName);
          $("#buArea").text(tempUser[item.user.username]);
          $("#buTel").text(item.user.telephoneNumber);
          $("#buMail").text(item.user.email);
          $("#buAction").text(item.actionStatus);
          $("#buActionDate").text(DateUtil.coverDateToStringAndTime2(item.actionDate));
        }else if(role=="FN" || roleName=="FN" ){
           $("#fnContainerTimeLine").removeClass('containerTL2');
          $("#fnContainerTimeLine").addClass('containerTL');
          $("#fnName").text(item.user.firstName+" "+item.user.lastName);
          $("#fnArea").text(tempUser[item.user.username]);
          $("#fnTel").text(item.user.telephoneNumber);
          $("#fnMail").text(item.user.email);
          $("#fnAction").text(item.actionStatus);
          $("#fnActionDate").text(DateUtil.coverDateToStringAndTime2(item.actionDate));
        }else if(role=="TS" || roleName=="TS" ){
           $("#tsContainerTimeLine").removeClass('containerTL2');
          $("#tsContainerTimeLine").addClass('containerTL');
          $("#tsName").text(item.user.firstName+" "+item.user.lastName);
          $("#tsArea").text(tempUser[item.user.username]);
          $("#tsTel").text(item.user.telephoneNumber);
          $("#tsMail").text(item.user.email);
          $("#tsAction").text(item.actionStatus);
          $("#tsActionDate").text(DateUtil.coverDateToStringAndTime2(item.actionDate));
        }else if(role=="CS"  || roleName=="CS" ){
           $("#csContainerTimeLine").removeClass('containerTL2');
          $("#csContainerTimeLine").addClass('containerTL');
          $("#csName").text(item.user.firstName+" "+item.user.lastName);
          $("#csArea").text(tempUser[item.user.username]);
          $("#csTel").text(item.user.telephoneNumber);
          $("#csMail").text(item.user.email);
          $("#csAction").text(item.actionStatus);
          $("#csActionDate").text(DateUtil.coverDateToStringAndTime2(item.actionDate));
        }

    });

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
    // $("[name="+user).attr("src", "data:image/png;base64," + json);
	  return json;
}

function getUserProfile(user){
	    var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/users/getUserProfile?username='+user,
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
    return json;
}


  // function myID() {
  //   var captionText = document.getElementById("captionImg");
  //   var span = document.getElementsByClassName("close1")[0];
  //   span.onclick = function() {
  //     modal.style.display = "none";
  //   }
  //   var modal = document.getElementById('myModal-ID');
  //   var img = "images/idcard_example.jpg"; //variable of name
  //   var modalImg = document.getElementById("img01");

  //   modal.style.display = "block";
  //   modalImg.src = img;
  //   captionText.innerHTML = "idcard_example.jpg";

  // }
  // function mySlip() {
  //   var captionText = document.getElementById("captionImg2");
  //   var span = document.getElementsByClassName("close2")[0];
  //   span.onclick = function() {
  //     modal.style.display = "none";
  //   }
  //   var modal = document.getElementById('myModal-Slip');
  //   var img = "images/Slip_money.jpg"; //variable of name
  //   var modalImg = document.getElementById("img02");

  //   modal.style.display = "block";
  //   modalImg.src = img;
  //   captionText.innerHTML = 'Slip_money.jpg';

  // }
  // function myModalAgreement() {
  //   var captionText = document.getElementById("captionImg3");
  //   var span = document.getElementsByClassName("close3")[0];
  //   span.onclick = function() {
  //     modal.style.display = "none";
  //   }
  //   var modal = document.getElementById('myModal-Agreement');
  //   var img = "images/agreement.png"; //variable of name
  //   var modalImg = document.getElementById("img03");

  //   modal.style.display = "block";
  //   modalImg.src = img;
  //   captionText.innerHTML = 'agreement.pdf';

  // }
  // function Script() {
  //   var captionText = document.getElementById("captionImg4");
  //   var span = document.getElementsByClassName("close4")[0];
  //   span.onclick = function() {
  //     modal.style.display = "none";
  //   }
  //   var modal = document.getElementById('myModal-Script');
  //   var img = "images/Pre-scriptipn Request-form.png"; //variable of name
  //   var modalImg = document.getElementById("img04");

  //   modal.style.display = "block";
  //   modalImg.src = img;
  //   captionText.innerHTML = 'Pre-scriptipn Request-form.pdf';

  // }
  // function Installation() {
  //   var captionText = document.getElementById("captionImg5");
  //   var span = document.getElementsByClassName("close5")[0];
  //   span.onclick = function() {
  //     modal.style.display = "none";
  //   }
  //   var modal = document.getElementById('myModal-Installation');
  //   var img = "images/Installtion-request.png"; //variable of name
  //   var modalImg = document.getElementById("img05");

  //   modal.style.display = "block";
  //   modalImg.src = img;
  //   captionText.innerHTML = 'Installtion-request.pdf';

  // }
  $("#agreementFile").click(function(){
  window.location.href=fileHttp+"/downloadFormAccept?caseId="+id

  });

  $("#installationFile").click(function(){
    if(data.caseStatus =="F"){
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

  });

    $("#copyId").click(function(){
        commonWindowPopupfile("ID");
    });

    $("#psId").click(function(){
        commonWindowPopupfile("PS");
    });


    $("#dsId").click(function(){
        var checked = 0;
        $.each(fileUploads,function(index,item){
            if(item.fileType == "DS"){
                checked = 1;
            }
        });
        if(checked == 1){
         commonWindowPopupfile("DS");
        }else{
             var url = session['context']+"/casemanagements/popup?id=1809&fileType=DS";
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

    });

$("#btnPrescription").click(function(){
   $("#prescriptionModal").modal('show');
});

function downloadReceipt(){
  window.location.href=fileHttp+"/downloadFormReceipt?caseId="+id
}

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