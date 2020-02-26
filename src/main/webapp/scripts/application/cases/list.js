var ROLE = "";


$(document).ready(function () {
    $("#txtDate").val("");
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

   if(roleName == "CS"){
    $("tr[role=row]").empty();
    $("tr[role=row]").append(
      '<th class="text-center">Case ID</th>'+
      '<th class="text-primary text-center"  sortBy="" name="sortDate" >Create Date <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class="text-primary text-center">Case Type <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class="text-center">Customer Name</th>'+
      '<th class="text-primary text-center">Type <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class="text-primary text-center">Status <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class=" text-center">Finance</th>'+
      '<th class=" text-center">Tecnical Support</th>    '+
      '<th class="text-primary text-center">Manage</th>'+
      '<th class="text-center">View</th>'
    );
   }else if(roleName == "TS"){
    $("tr[role=row]").empty();
    $("tr[role=row]").append(
      '<th class="text-center">Case ID</th>'+
      '<th class="text-primary text-center"  sortBy="" name="sortDate" >Create Date <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class="text-primary text-center">Case Type <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class="text-center">Customer Name</th>'+
      '<th class="text-primary text-center">Type <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class="text-primary text-center">Status <i class="fas fa-caret-down"><jsp:text/></i></th>'+
      '<th class=" text-center">Finance</th>'+
      '<th class=" text-center">Customer Service</th>    '+
      '<th class="text-primary text-center">Manage</th>'+
      '<th class="text-center">View</th>'
    );
   }



    var caselist = [];
     caselist = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findCaseByCriteria?role='+roleName+"&username="+session['user'],
        headers: {
            Accept: "application/json",
        },
        data:{date:date,caseNumber:caseNumber},
        // data:{date:"",caseNumber:caseNumber},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;

    $("[name=sortDate]").click(function(){

        var sortBy = $(this).attr("sortBy");
        if(""==sortBy || sortBy =="DESC"){
          caselist.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : -1)
          $(this).attr("sortBy","ASC")
        }else{
          caselist.sort((a, b) => (a.createdDate < b.createdDate) ? 1 : -1)
          $(this).attr("sortBy","DESC")
        }
         renderTable(caselist);
    });

     renderTable(caselist);
   
     // $("table").tablesorter({
     //          0: { sorter: "textFormat" },
     //          // 1: { sorter: "datePeriod" }, //, dateFormat will parsed as the default above
     //          2: { sorter: "textFormat" },
     //          3: { sorter: "textFormat" },
     //          4: { sorter: "textFormat" },
     // });


}


// $.tablesorter.addParser({
//                 // set a unique id
//                 id: 'textFormat',
//                 is: function (s) {
//                     return false;
//                 },
//                 format: function (s) {
//                     var text = s.split("}");
//                     var size = text.length;
//                     return text[size - 1].trim();
//                 },
//                 type: 'text'
//             });

//  $.tablesorter.addParser({
//                 // set a unique id
//                 id: 'datePeriod',
//                 is: function (s) {
//                     return false;
//                 },
//                 format: function (s) {
//                     var data = s.split(" ")[0];
//                     var returnData = 0;
//                     console.log(data)
//                     if(data != "-"){
//                         var date = data.split('/');
//                         var  returnDate = new Date(date[2].trim() + "/" + date[1] + "/" + date[0]);
//                         returnData = returnDate.getTime();
//                     }
//                     return returnData;
//                 },
//                 type: 'numeric'
//             });


function renderTable(data){
    $("tbody").empty();
    $.each(data,function(index,item){
        var flagReadyApprove = 0;
        var btn=        '<td> <div class="fa-2x editblue" ><a href="'+session['context']+'/casemanagements/manageWorkflowCase?id='+item.id+'"  ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.083" height="48.799" viewBox="0 0 85.083 48.799"> <defs> <filter id="Rectangle_772" x="0" y="0" width="85.083" height="48.799" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_931" data-name="Group 931" transform="translate(-2368.799 -8098.5)"> <g transform="matrix(1, 0, 0, 1, 2368.8, 8098.5)" filter="url(#Rectangle_772)"> <rect id="Rectangle_772-2" data-name="Rectangle 772" width="82.083" height="45.799" rx="22.9" transform="translate(0.5 0.5)" fill="#5db2fc"/> </g> <g id="baseline-edit-24px" transform="translate(2393.969 8104.134)"> <path id="Path_357" data-name="Path 357" d="M3,21.928v4.981H7.981l14.69-14.69L17.69,7.238ZM26.522,8.367a1.323,1.323,0,0,0,0-1.873L23.414,3.386a1.323,1.323,0,0,0-1.873,0L19.111,5.817,24.092,10.8l2.431-2.431Z" transform="translate(0.985 0.984)" fill="#fff"/> <path id="Path_358" data-name="Path 358" d="M0,0H31.877V31.877H0Z" fill="none"/> </g> </g> </svg></a></div></td>';
        if((item.assignBu == session['user'] && (item.caseStatus=="F"  ||item.caseStatus=="R" ))|| item.assignTs == session['user'] || item.assignFn == session['user'] || item.assignCs == session['user'] ){
         btn=        '<td><center> <div class="fa-2x" ><a><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.083" height="48.8" viewBox="0 0 85.083 48.8"> <defs> <filter id="Rectangle_1315" x="0" y="0" width="85.083" height="48.8" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_932" data-name="Group 932" transform="translate(-2368.799 -8164.5)"> <g transform="matrix(1, 0, 0, 1, 2368.8, 8164.5)" filter="url(#Rectangle_1315)"> <rect id="Rectangle_1315-2" data-name="Rectangle 1315" width="82.083" height="45.799" rx="22.9" transform="translate(0.5 0.5)" fill="#95989a"/> </g> <g id="baseline-edit-24px" transform="translate(2393.969 8170.134)"> <path id="Path_357" data-name="Path 357" d="M3,21.928v4.981H7.981l14.69-14.69L17.69,7.238ZM26.522,8.367a1.323,1.323,0,0,0,0-1.873L23.414,3.386a1.323,1.323,0,0,0-1.873,0L19.111,5.817,24.092,10.8l2.431-2.431Z" transform="translate(0.985 0.984)" fill="#fff"/> <path id="Path_358" data-name="Path 358" d="M0,0H31.877V31.877H0Z" fill="none"/> </g> </g> </svg></a></div></center></td>';
         flagReadyApprove = 1;
        }
        if(ROLE == "CS"){
            var assignFN = item.assignFn;
            var assignTs = item.assignTs;
            assignFN = generateColor(assignFN);
            assignTs = generateColor(assignTs);
            if(item.caseType =="AR" || item.caseType == "CH"){
                assignFN = "-";  
            }

             var status= "<td class='text-center Approve'>"+(item.caseStatus ==null?"":caseStatus[item.caseStatus]) +"</td>";
             if(ROLE == "BU" || ROLE == "TS" || ROLE == "CS"){
                 if(flagReadyApprove == 1){
                    status= "<td class='text-center Approve'>Complete</td>";
                 }else{
                    status= "<td class='text-center Pend'>In Process...</td>";
                 }
             }else{
                   if(flagReadyApprove == 1){
                    status= "<td class='text-center Approve'>Complete</td>";
                 }else{
                    status= "<td class='text-center Pend'>In Process...</td>";
                 }
             }
             var custName = item.cutsomerType == 1 ? item.cutsomerName : item.hospitalName;
            $("tbody").append("<tr>"+
                "<td>"+item.caseNumber+"</td>"+
                "<td class='text-center'>"+DateUtil.coverDateToStringAndTime(item.createdDate)+"</td>"+
                "<td>"+caseType[item.caseType]+"</td>"+
                "<td>"+(custName ==null?"":custName) +"</td>"+
                "<td>"+(item.cutsomerType ==null?"":customerType[item.cutsomerType]) +"</td>"+
                status +
                "<td class='text-center'>"+assignFN+"</td>"+
                "<td class='text-center'>"+assignTs+"</td>"+

                btn+
                '<td> <div class="fa-2x searchblue" ><a href="'+session['context']+'/casemanagements/detailCase?id='+item.id+'"  ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.683" height="49.134" viewBox="0 0 85.683 49.134"> <defs> <filter id="Rectangle_772" x="0" y="0" width="85.683" height="49.134" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_933" data-name="Group 933" transform="translate(-2530.013 -8100.165)"> <g transform="matrix(1, 0, 0, 1, 2530.01, 8100.17)" filter="url(#Rectangle_772)"> <rect id="Rectangle_772-2" data-name="Rectangle 772" width="82.683" height="46.134" rx="23" transform="translate(0.5 0.5)" fill="#61b0fe"/> </g> <g id="outline-pageview-24px" transform="translate(2551.258 8103)"> <g id="Bounding_Boxes"> <path id="Path_211" data-name="Path 211" d="M0,0H41.327V41.327H0Z" fill="none"/> </g> <g id="Outline" transform="translate(3.444 6.888)"> <g id="Group_161" data-name="Group 161"> <path id="Path_212" data-name="Path 212" d="M14.732,22.5a7.635,7.635,0,0,0,4.115-1.205l4.2,4.2,2.445-2.445-4.2-4.184A7.735,7.735,0,1,0,14.732,22.5Zm.017-12.054a4.3,4.3,0,1,1-4.3,4.3A4.306,4.306,0,0,1,14.749,10.444Z" transform="translate(1.61 -1.834)" fill="#fff"/> <path id="Path_213" data-name="Path 213" d="M32.995,4H5.444A3.454,3.454,0,0,0,2,7.444V28.107a3.454,3.454,0,0,0,3.444,3.444H32.995a3.454,3.454,0,0,0,3.444-3.444V7.444A3.454,3.454,0,0,0,32.995,4Zm0,24.107H5.444V7.444H32.995Z" transform="translate(-2 -4)" fill="#fff"/> </g> </g> </g> </g> </svg></a></div></td>'+
            "</tr>");
       }else if(ROLE != "BU" && ROLE !="TS"){
             if(item.caseType == "AR" ||  item.caseType == "CR"){
              var status= "<td class='text-center Approve'>"+(item.caseStatus ==null?"":caseStatus[item.caseStatus]) +"</td>";
             if(ROLE == "BU" || ROLE == "TS"  || ROLE == "CS"){
                 if(flagReadyApprove == 1){
                    status= "<td class='text-center Approve'>Complete</td>";
                 }else{
                    if(item.caseStatus == "R"){
                        status= "<td class='text-center Rejec'>Reject</td>";
                    }else{
                        status= "<td class='text-center Pend'>In process...</td>";
                    }
                 }
             }else{
                 if(flagReadyApprove == 1){
                    status= "<td class='text-center Approve'>Complete</td>";
                 }else{
                    status= "<td class='text-center Pend'>In process...</td>";
                 }
             }
             var custName = item.cutsomerType == 1 ? item.cutsomerName : item.hospitalName;
             if(ROLE =="FN" ){
                 if( item.caseType !="RT" &&  item.caseType != "AR" && item.caseType!="CH"){
                    $("tbody").append("<tr>"+
                        "<td>"+item.caseNumber+"</td>"+
                        "<td class='text-center'>"+DateUtil.coverDateToStringAndTime(item.createdDate)+"</td>"+
                        "<td>"+caseType[item.caseType]+"</td>"+
                        "<td>"+(custName ==null?"":custName) +"</td>"+
                        "<td>"+(item.cutsomerType ==null?"":customerType[item.cutsomerType]) +"</td>"+
                        status +
                        btn+
                        '<td> <div class="fa-2x searchblue" ><a href="'+session['context']+'/casemanagements/detailCase?id='+item.id+'"  ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.683" height="49.134" viewBox="0 0 85.683 49.134"> <defs> <filter id="Rectangle_772" x="0" y="0" width="85.683" height="49.134" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_933" data-name="Group 933" transform="translate(-2530.013 -8100.165)"> <g transform="matrix(1, 0, 0, 1, 2530.01, 8100.17)" filter="url(#Rectangle_772)"> <rect id="Rectangle_772-2" data-name="Rectangle 772" width="82.683" height="46.134" rx="23" transform="translate(0.5 0.5)" fill="#61b0fe"/> </g> <g id="outline-pageview-24px" transform="translate(2551.258 8103)"> <g id="Bounding_Boxes"> <path id="Path_211" data-name="Path 211" d="M0,0H41.327V41.327H0Z" fill="none"/> </g> <g id="Outline" transform="translate(3.444 6.888)"> <g id="Group_161" data-name="Group 161"> <path id="Path_212" data-name="Path 212" d="M14.732,22.5a7.635,7.635,0,0,0,4.115-1.205l4.2,4.2,2.445-2.445-4.2-4.184A7.735,7.735,0,1,0,14.732,22.5Zm.017-12.054a4.3,4.3,0,1,1-4.3,4.3A4.306,4.306,0,0,1,14.749,10.444Z" transform="translate(1.61 -1.834)" fill="#fff"/> <path id="Path_213" data-name="Path 213" d="M32.995,4H5.444A3.454,3.454,0,0,0,2,7.444V28.107a3.454,3.454,0,0,0,3.444,3.444H32.995a3.454,3.454,0,0,0,3.444-3.444V7.444A3.454,3.454,0,0,0,32.995,4Zm0,24.107H5.444V7.444H32.995Z" transform="translate(-2 -4)" fill="#fff"/> </g> </g> </g> </g> </svg></a></div></td>'+
                    "</tr>");
                }
                 
             }else{

                 $("tbody").append("<tr>"+
                    "<td>"+item.caseNumber+"</td>"+
                    "<td class='text-center'>"+DateUtil.coverDateToStringAndTime(item.createdDate)+"</td>"+
                    "<td>"+caseType[item.caseType]+"</td>"+
                    "<td>"+(custName ==null?"":custName) +"</td>"+
                    "<td>"+(item.cutsomerType ==null?"":customerType[item.cutsomerType]) +"</td>"+
                    status +
                    btn+
                    '<td> <div class="fa-2x searchblue" ><a href="'+session['context']+'/casemanagements/detailCase?id='+item.id+'"  ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.683" height="49.134" viewBox="0 0 85.683 49.134"> <defs> <filter id="Rectangle_772" x="0" y="0" width="85.683" height="49.134" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_933" data-name="Group 933" transform="translate(-2530.013 -8100.165)"> <g transform="matrix(1, 0, 0, 1, 2530.01, 8100.17)" filter="url(#Rectangle_772)"> <rect id="Rectangle_772-2" data-name="Rectangle 772" width="82.683" height="46.134" rx="23" transform="translate(0.5 0.5)" fill="#61b0fe"/> </g> <g id="outline-pageview-24px" transform="translate(2551.258 8103)"> <g id="Bounding_Boxes"> <path id="Path_211" data-name="Path 211" d="M0,0H41.327V41.327H0Z" fill="none"/> </g> <g id="Outline" transform="translate(3.444 6.888)"> <g id="Group_161" data-name="Group 161"> <path id="Path_212" data-name="Path 212" d="M14.732,22.5a7.635,7.635,0,0,0,4.115-1.205l4.2,4.2,2.445-2.445-4.2-4.184A7.735,7.735,0,1,0,14.732,22.5Zm.017-12.054a4.3,4.3,0,1,1-4.3,4.3A4.306,4.306,0,0,1,14.749,10.444Z" transform="translate(1.61 -1.834)" fill="#fff"/> <path id="Path_213" data-name="Path 213" d="M32.995,4H5.444A3.454,3.454,0,0,0,2,7.444V28.107a3.454,3.454,0,0,0,3.444,3.444H32.995a3.454,3.454,0,0,0,3.444-3.444V7.444A3.454,3.454,0,0,0,32.995,4Zm0,24.107H5.444V7.444H32.995Z" transform="translate(-2 -4)" fill="#fff"/> </g> </g> </g> </g> </svg></a></div></td>'+
                "</tr>");
                
             }

           

          }

        }else{
            var status= "<td class='text-center Approve'>"+(item.caseStatus ==null?"":caseStatus[item.caseStatus]) +"</td>";
             if(ROLE == "BU" || ROLE == "TS" || ROLE == "CS"){
                 if(flagReadyApprove == 1){
                     if(item.caseStatus == "R"){
                        status= "<td class='text-center Rejec'>Reject</td>";
                    }else{
                       status= "<td class='text-center Approve'>Complete</td>";
                    }
                 }else{
                     if(item.caseStatus == "R"){
                        status= "<td class='text-center Rejec'>Reject</td>";
                    }else{
                        status= "<td class='text-center Pend'>In process...</td>";
                    }
                 }
             }else {
                  if(flagReadyApprove == 1){
                    status= "<td class='text-center Approve'>Complete</td>";
                 }else{
                    status= "<td class='text-center Pend'>In Process...</td>";
                 }
             }
             var custName = item.cutsomerType == 1 ? item.cutsomerName : item.hospitalName;

              var assignFN = item.assignFn;
              var assignCs = item.assignCs;
              assignFN = generateColor(assignFN);
              assignCs = generateColor(assignCs);
              if(item.caseType =="AR" || item.caseType == "CH"){
                  assignFN = "-";  
              }
              if(ROLE == "TS"){
                $("tbody").append("<tr>"+
                    "<td>"+item.caseNumber+"</td>"+
                    "<td class='text-center'>"+DateUtil.coverDateToStringAndTime(item.createdDate)+"</td>"+
                    "<td>"+caseType[item.caseType]+"</td>"+
                    "<td>"+(custName ==null?"":custName) +"</td>"+
                    "<td>"+(item.cutsomerType ==null?"":customerType[item.cutsomerType]) +"</td>"+
                    status +

                    "<td class='text-center'>"+assignFN+"</td>"+
                    "<td class='text-center'>"+assignCs+"</td>"+

                    btn+
                    '<td> <div class="fa-2x searchblue" ><a href="'+session['context']+'/casemanagements/detailCase?id='+item.id+'"  ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.683" height="49.134" viewBox="0 0 85.683 49.134"> <defs> <filter id="Rectangle_772" x="0" y="0" width="85.683" height="49.134" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_933" data-name="Group 933" transform="translate(-2530.013 -8100.165)"> <g transform="matrix(1, 0, 0, 1, 2530.01, 8100.17)" filter="url(#Rectangle_772)"> <rect id="Rectangle_772-2" data-name="Rectangle 772" width="82.683" height="46.134" rx="23" transform="translate(0.5 0.5)" fill="#61b0fe"/> </g> <g id="outline-pageview-24px" transform="translate(2551.258 8103)"> <g id="Bounding_Boxes"> <path id="Path_211" data-name="Path 211" d="M0,0H41.327V41.327H0Z" fill="none"/> </g> <g id="Outline" transform="translate(3.444 6.888)"> <g id="Group_161" data-name="Group 161"> <path id="Path_212" data-name="Path 212" d="M14.732,22.5a7.635,7.635,0,0,0,4.115-1.205l4.2,4.2,2.445-2.445-4.2-4.184A7.735,7.735,0,1,0,14.732,22.5Zm.017-12.054a4.3,4.3,0,1,1-4.3,4.3A4.306,4.306,0,0,1,14.749,10.444Z" transform="translate(1.61 -1.834)" fill="#fff"/> <path id="Path_213" data-name="Path 213" d="M32.995,4H5.444A3.454,3.454,0,0,0,2,7.444V28.107a3.454,3.454,0,0,0,3.444,3.444H32.995a3.454,3.454,0,0,0,3.444-3.444V7.444A3.454,3.454,0,0,0,32.995,4Zm0,24.107H5.444V7.444H32.995Z" transform="translate(-2 -4)" fill="#fff"/> </g> </g> </g> </g> </svg></a></div></td>'+
                "</tr>");
              }else{
                   $("tbody").append("<tr>"+
                    "<td>"+item.caseNumber+"</td>"+
                    "<td class='text-center'>"+DateUtil.coverDateToStringAndTime(item.createdDate)+"</td>"+
                    "<td>"+caseType[item.caseType]+"</td>"+
                    "<td>"+(custName ==null?"":custName) +"</td>"+
                    "<td>"+(item.cutsomerType ==null?"":customerType[item.cutsomerType]) +"</td>"+
                    status +
                    btn+
                    '<td> <div class="fa-2x searchblue" ><a href="'+session['context']+'/casemanagements/detailCase?id='+item.id+'"  ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.683" height="49.134" viewBox="0 0 85.683 49.134"> <defs> <filter id="Rectangle_772" x="0" y="0" width="85.683" height="49.134" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_933" data-name="Group 933" transform="translate(-2530.013 -8100.165)"> <g transform="matrix(1, 0, 0, 1, 2530.01, 8100.17)" filter="url(#Rectangle_772)"> <rect id="Rectangle_772-2" data-name="Rectangle 772" width="82.683" height="46.134" rx="23" transform="translate(0.5 0.5)" fill="#61b0fe"/> </g> <g id="outline-pageview-24px" transform="translate(2551.258 8103)"> <g id="Bounding_Boxes"> <path id="Path_211" data-name="Path 211" d="M0,0H41.327V41.327H0Z" fill="none"/> </g> <g id="Outline" transform="translate(3.444 6.888)"> <g id="Group_161" data-name="Group 161"> <path id="Path_212" data-name="Path 212" d="M14.732,22.5a7.635,7.635,0,0,0,4.115-1.205l4.2,4.2,2.445-2.445-4.2-4.184A7.735,7.735,0,1,0,14.732,22.5Zm.017-12.054a4.3,4.3,0,1,1-4.3,4.3A4.306,4.306,0,0,1,14.749,10.444Z" transform="translate(1.61 -1.834)" fill="#fff"/> <path id="Path_213" data-name="Path 213" d="M32.995,4H5.444A3.454,3.454,0,0,0,2,7.444V28.107a3.454,3.454,0,0,0,3.444,3.444H32.995a3.454,3.454,0,0,0,3.444-3.444V7.444A3.454,3.454,0,0,0,32.995,4Zm0,24.107H5.444V7.444H32.995Z" transform="translate(-2 -4)" fill="#fff"/> </g> </g> </g> </g> </svg></a></div></td>'+
                "</tr>");
              }
  

         
        }

    });

    $("button[name=manage]").click(function(){
        var id = $(this).attr('id');
        window.location.href = session['context']+"/casemanagements/manage?id="+id;
    });

    
     $("table").tablesorter({
    headers: {
        1: {
            sorter: false
        }
        
    }
})

}


function generateColor(status){
    if(status!=null){
        return "<span class='Approve'> Complete </span>";
    }else{
        return "<span class='Pend' >In Process...  </span>";

    }

}
