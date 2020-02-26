var ROLE = "";


$(document).ready(function () {
console.log("test")
    renderProfile();
    renderData();
});


$("#btnSearch").click(function(){
    renderData();
});


    $("#logout").click(function(){
      submitlogout() 
    });

function renderData(){

    var caseNumber = $("#txtCaseNumber").val()==null?"":$("#txtCaseNumber").val();
    var date =  $("#txtDate").val()==null?"":$("#txtDate").val();
    if(date != ""){
        var arrDate= date.split("-");
        date = arrDate[1]+"-"+arrDate[0];
    }
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
    var roleName = json.role.name; 
    ROLE = roleName;

   if(roleName != "TS"){
       $("#viewProduct").hide() 
    }
    var caselist = [];
     caselist = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/listDeposit?role='+roleName+"&username="+session['user'],
        headers: {
            Accept: "application/json",
        },
        data:{date:date,caseNumber:caseNumber},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
     renderTable(caselist);

}

function renderTable(data){
    $("tbody").empty();
    console.log(data);
    $.each(data,function(index,item){
        console.log("each")
        var disabledFlag = false;
        if(item.assignFN == session['user']){
            disabledFlag =true;
        }

        var flagReadyApprove = 0;
        var btn=        '<td> <div class="fa-2x editblue" ><a href="'+session['context']+'/casemanagements/deposit?id='+item.id+'"  disabled='+disabledFlag+' ><i class="fas fa-edit" ><jsp:text/></i></a></div></td>';
             var status= "<td class='text-center Approve'>"+(item.caseStatus ==null?"":caseStatus[item.caseStatus]) +"</td>";
             if(ROLE == "BU" || ROLE == "TS" || ROLE == "FN" || ROLE == "CS"){
                 if(flagReadyApprove == 1){
                    status= "<td class='text-center Approve'>Done</td>";
                 }else{
                    status= "<td class='text-center Pend'>Pending...</td>";
                 }
             }
             var custName = item.cutsomerType == 1 ? item.cutsomerName : item.hospitalName;
        console.log(custName );
        if(item.depositBy !=null){
            btn= "<td></td>";
        }
            $("tbody").append("<tr>"+
                "<td>"+item.caseNumber+"</td>"+
                "<td class='text-center'>"+DateUtil.coverDateToStringAndTime(item.createdDate)+"</td>"+
                "<td>"+(custName ==null?"":custName) +"</td>"+
                "<td>"+(item.cutsomerType ==null?"":customerType[item.cutsomerType]) +"</td>"+
                "<td>"+(item.amt ==null?"":NumberUtil.addComma(item.amt)) +"</td>"+
                "<td>"+(item.depositBy== null?"":item.depositBy) +"</td>"+
                 btn+
            "</tr>");
    
       
       
    });

    $("button[name=manage]").click(function(){
        var id = $(this).attr('id');
        window.location.href = session['context']+"/casemanagements/deposit?id="+id;
    });

}