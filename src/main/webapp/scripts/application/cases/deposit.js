var role=null;
var id = window.location.href.split("=")[1];
var status = "";
var caseManagement ;
var fileUploads = [];
var id = window.location.href.split("=")[1];
var $txtdepositName = $("#depositName") 
var $txtdepositDate = $("#depositDate") 
var $txtdepositPaymentType = $("#depositPaymentType") 
var $txtdepositBankName = $("#depositBankName") 
var $txtdepositAmount = $("#depositAmount") 
var $txtuploadPayInFile = $("#uploadPayInFile")

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


$("#backPage").click(function(){
     window.location.href=session['context']+'/casemanagements/depositlist'; 
})


$(document).ready(function () {
    renderProfile();
    checkRole();
    $txtdepositAmount.autoNumeric('init');


    if(id){
      var data=  $.ajax({
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
        $("[name=caseNumber]").text(data.caseNumber);
    }
    init();

});

function init(){
   

$.each(bankData,function(index,item){
    $("#depositBankName").append("<option value="+item.value+" > "+item.value +" </option> ");
  });
   $.each(paymentTypeData,function(index,item){
    $("#depositPaymentType").append("<option value="+item.value+" > "+item.value +" </option> ");
  });


}
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



$("#saveDeposit").click(function(){
    var formData = new FormData();

   if($txtuploadPayInFile[0].files.length == 0){
             swal({
                  title:"Warning",
                  text: "กรุณาเลือกไฟล์เพื่ออัพโหลด",
                  type: "warning",
                  showCancelButton: false,
                  // timer: 1500,
                  showConfirmButton: true,
                  closeOnConfirm: true
                },function(){
                });

      return false;
   } 

  var dateDeliver = $txtdepositDate.val().split("-");
    dateDeliver = dateDeliver[2]+"-"+dateDeliver[1]+"-"+dateDeliver[0]
    var data={
        "id":id,   
        "updatedBy": session['user'],   
        "depositName":$txtdepositName.val() ,
        "depositDate":dateDeliver,
        "depositPaymentType":$txtdepositPaymentType.val(), 
        "depositBankName":$txtdepositBankName.val() ,
        "depositAmount":$txtdepositAmount.autoNumeric('get')
    }

    formData.append("json",JSON.stringify(data));
    if($txtuploadPayInFile.val()!=""){
        formData.append("image",$txtuploadPayInFile[0].files[0]);
    }

    $.ajax({
        type: "POST",
        headers: {
            Accept: 'application/json',
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session.context+'/casemanagements/sendDeposit',
        processData: false,
        contentType: false,
        data: formData,
        async: false,
        complete: function (xhr) {
           // window.location.href=session['context']+"/casemanagements/depositlist"
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
    });

});