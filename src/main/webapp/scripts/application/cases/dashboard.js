var tempUser = {};
var tempImage = {};
var roleName = "";
var caselist=[];
$(document).ready(function () {
  renderProfile();
  renderData();

});


  $("#logout").click(function(){
      submitlogout()
    });

$("#datePicker1").change(function(){
   search();
});  

function search(){
   var caseNumber = $("#txtCaseNumber").val()==null?"":$("#txtCaseNumber").val();
    var date =  $("#datePicker1").val()==null?"":$("#datePicker1").val();

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
     console.log("rolename : "+roleName)
  var dashList = [];
   dashList = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findCaseByCriteria?role='+roleName+"&username="+session['user']+"&dateFrom="+date,
        headers: {
            Accept: "application/json",
        },
        data:{date:"",caseNumber:caseNumber},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
 if(caselist.length == 0){
   caselist = dashList;
 }
 // console.log(caselist);
 var countCaseCR= 0;
 var countCaseAR= 0;
 var crApprove = 0;
 var arApprove = 0;


 if(roleName == "TS"){
var changeNew= 0 ;
var changeApprove = 0;
var returnNew = 0;
var returnApprove = 0;
 $.each(dashList,function(index,item){
        if(item.caseType=="CR"){
          if(item.assignTs == session['user']){
            crApprove++;
          }else{
            countCaseCR++;
          }
        }else if(item.caseType=="AR"){
          if(item.assignTs == session['user']){
            arApprove++;
          }else{
            countCaseAR++;
          }
        }else if(item.caseType=="CH"){
          console.log("chec")
          if(item.assignTs == session['user'] ){
            changeApprove++;
          }else{
             changeNew++;
          }

       }else{
         if(item.assignTs == session['user'] ){
            returnApprove++;
          }else{
             returnNew++;
          }
       }
    })

 var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/listSwapMachine?username='+session['user'],
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;

  $.each(json,function(index,item){
      if(item.caseType == "CH"){
        changeNew++;
      }else{
        returnNew++;
      }

  });

    $(".reject").hide();
    $(".approach").hide();
    $("#chronicNew").text(countCaseCR);
    $("#acuteNew").text(countCaseAR);
    $("#changeNew").text(changeNew);
    $("#returnNew").text(returnNew);
    $("#returnApprove").text(returnApprove);


 }else if(roleName == "FN"){
  $("#divAcute").hide();
  $("#divSwap").hide();

  $.each(dashList,function(index,item){
        if(item.caseType=="CR"){
          if(item.assignFn == session['user']){
            crApprove++;
          }else{
            countCaseCR++;
          }
        }else if(item.caseType=="RT"){

          if(item.depositBy == session['user']){
            arApprove++;
          }else{
            countCaseAR++;
          }
        }
    })
    $(".reject").hide();
    $("#chronicNew").text(countCaseCR);
    $("#chronicApprove").text(crApprove);
    $("#returnNew").text(countCaseAR);
    $("#returnApprove").text(arApprove);
 }else if(roleName == "CS"){
 
var changeNew= 0 ;
var changeApprove = 0;
var returnNew = 0;
var returnApprove = 0;
  $.each(dashList,function(index,item){
        if(item.caseType=="CR"){
          if(item.assignCs == session['user']){
            crApprove++;
          }else{
            countCaseCR++;
          }
        }else if(item.caseType=="AR"){

          if(item.assignCs == session['user']){
            arApprove++;
          }else{
            countCaseAR++;
          }
        }else if(item.caseType=="CH"){
          console.log("change case ");

          
           if(item.assignCs == session['user']){
            changeApprove++;
          }else{
            changeNew++;
          }
        }else {
           if(item.assignCs == session['user']){
            returnApprove++;
          }else{
            returnNew++;
          }
        }
    })
    $(".reject").hide();
    $("#chronicNew").text(countCaseCR);
    $("#chronicApprove").text(crApprove);
    $("#acuteNew").text(countCaseAR);
    $("#acuteApprove").text(arApprove);
    $("#changeNew").text(changeNew);
    $("#changeApprove").text(changeApprove);
    $("#returnNew").text(returnNew);
    $("#returnApprove").text(returnApprove);
 }else if(roleName == "BU"){
    var chronicWait=0;
    var chronicApprove=0;
    var chronicReject=0;
    var acuteWait=0;
    var acuteApprove=0;
    var acuteReject=0;
    var chWait=0;
    var chApprove=0;
    var chReject=0;
    var returnWait = 0;
    var returnApprove = 0;
    var returnReject = 0;


   $.each(dashList,function(index,item){
      if(item.caseType=="AR"){
        if(item.caseStatus=="A"){
          acuteWait++;
        }else if(item.caseStatus=="F"){
          acuteApprove++;
        }else{
          acuteReject++;
        }
     

      }else if(item.caseType=="CR"){
         if(item.caseStatus=="A"){
          chronicWait++;
        }else if(item.caseStatus=="F"){
          chronicApprove++;
        }else{
          chronicReject++;
        }
   
      }else if(item.caseType=="CH"){
         if(item.caseStatus=="A"){
          chWait++;
        }else if(item.caseStatus=="F"){
          chApprove++;
        }else{
          chReject++;
        }
      }else{
         if(item.caseStatus=="A"){
          returnWait++;
        }else if(item.caseStatus=="F"){
          returnApprove++;
        }else{
          returnReject++;
        }
      }
   });
    $("#chronicNew").text(chronicWait);
    $("#chronicApprove").text(chronicApprove);
    $("#chronicReject").text(chronicReject);
    $("#acuteNew").text(acuteWait);
    $("#acuteApprove").text(acuteApprove);
    $("#acuteReject").text(acuteReject);
    $("#changeNew").text(chWait);
    $("#changeApprove").text(chApprove);
    $("#changeReject").text(chReject);
    $("#returnNew").text(returnWait);
    $("#returnApprove").text(returnApprove);
    $("#returnReject").text(returnReject);
 }
}

$("#datePicker2").change(function(){
    var caseNumber = $("#txtCaseNumber").val()==null?"":$("#txtCaseNumber").val();
    var date =  $("#datePicker2").val()==null?"":$("#datePicker2").val();
 
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
     console.log("rolename : "+roleName)
   var chartList = [];
   chartList = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findCaseByCriteria?role='+roleName+"&username="+session['user']+"&dateFrom="+date,
        headers: {
            Accept: "application/json",
        },
        data:{date:"",caseNumber:caseNumber},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
  renderChart(chartList);

});

function renderData(){
  
  search();
  renderCaseActivity();
  renderChart(caselist);

}

$("#searchBtn").click(function(){
  var search =  $("#tNAM").val();

    $("#renderActivity").empty();

 if(search != "" ){
      $.each(histories,function(index,item){
        if(search.toUpperCase() == item.actionBy.toUpperCase()){
            if(tempImage[item.actionBy] == null ){
                tempImage[item.actionBy] = getImage(item.actionBy);
            }
            $("#renderActivity").append(
              '<div class="card-body shadow" style="background-color:#CCF5FB;margin:2%">'+
                             '<div class="row">'+
                                '<div class="col-2" style="text-align:center;background-color:white;">'+
                                  '<img src="data:image/png;base64,'+tempImage[item.actionBy]+'" style="margin-top:15%" class="rounded-circle" width="60px" height="60px"/>'+
                                 item.roleName+' <span style="color:#5DB2FC">'+item.actionBy+'</span>'+
                                '</div>'+

                                '<div class="col-10">'+
                                  '<div class="row">'+
                           '<div class="col-5" style="text-align:left;color:black">'+
                           '<span>Case ID: '+item.caseNumber+'</span>' +
                            ' <br/>'+
                            '      <span>'+caseType[item.caseType]+'</span> '+
                            '      </div>'+
                            '      <div class="col-7" style="text-align:right;">'+
                            '        <span>'+
                            '         Update: '+DateUtil.coverDateToStringAndTime2(item.actionDate) +
                            '        </span>'+
                            '     </div> '+
                            '     </div>'+
                            '      <div class="row" style="margin-top:20px">'+
                            '         <div class="col-6" style="text-align:left;color:black;">'+
                            '          <span>Active: '+item.actionStatus.split(":").join("") +'</span>'+
                            '         </div>'+
                            '        <div class="col-6" style="text-align:right">'+
                            '         <span style="color:#5DB2FC">'+
                            '         <a href="'+session['context']+'/casemanagements/detailCase?id='+item.caseId+'"> More Detail</a>'+
                            '          </span>'+
                            '       </div>'+
                            '      </div>'+
                            '     </div>'+
                            '      </div>'+
                            '    </div>'+
                           ' </div> '


          );
        }

      });
  }else{
     $.each(histories,function(index,item){
            if(tempImage[item.actionBy] == null ){
                tempImage[item.actionBy] = getImage(item.actionBy);
            }
            $("#renderActivity").append(
              '<div class="card-body shadow" style="background-color:#CCF5FB;margin:2%">'+
                             '<div class="row">'+
                                '<div class="col-2" style="text-align:center;background-color:white;">'+
                                  '<img src="data:image/png;base64,'+tempImage[item.actionBy]+'" style="margin-top:15%" class="rounded-circle" width="60px" height="60px"/>'+
                                 item.roleName+' <span style="color:#5DB2FC">'+item.actionBy+'</span>'+
                                '</div>'+

                                '<div class="col-10">'+
                                  '<div class="row">'+
                           '<div class="col-5" style="text-align:left;color:black">'+
                           '<span>Case ID: '+item.caseNumber+'</span>' +
                            ' <br/>'+
                            '      <span>'+caseType[item.caseType]+'</span> '+
                            '      </div>'+
                            '      <div class="col-7" style="text-align:right;">'+
                            '        <span>'+
                            '         Update: '+DateUtil.coverDateToStringAndTime2(item.actionDate) +
                            '        </span>'+
                            '     </div> '+
                            '     </div>'+
                            '      <div class="row" style="margin-top:20px">'+
                            '         <div class="col-6" style="text-align:left;color:black;">'+
                            '          <span>Active: '+item.actionStatus.split(":").join("") +'</span>'+
                            '         </div>'+
                            '        <div class="col-6" style="text-align:right">'+
                            '         <span style="color:#5DB2FC">'+
                            '         <a href="'+session['context']+'/casemanagements/detailCase?id='+item.caseId+'"> More Detail</a>'+
                            '          </span>'+
                            '       </div>'+
                            '      </div>'+
                            '     </div>'+
                            '      </div>'+
                            '    </div>'+
                           ' </div> '


          );

      });
  }



});

function renderChart(caselist){
var size = {};
size.ar=0;
size.cr=0;
size.rt=0;
size.ch=0;
if(caselist.length>0){
  $("#graph").show();
  $.each(caselist,function(index,item){
  if(item.caseType=="AR"){
    size.ar++;
  }else if(item.caseType=="CR"){
    size.cr++;
  }else if(item.caseType=="RT"){
    console.log(item)
    size.rt++;
  }else if(item.caseType=="CH"){
    console.log(item)
    size.ch++;
  }
});

console.log(size.ar);
var ar = size.ar/caselist.length *100 ;
var cr = size.cr/caselist.length *100;
var ch = size.ch/caselist.length *100;
var rt = size.rt/caselist.length*100;

ar = ar.toFixed(0);
cr = cr.toFixed(0);
ch = ch.toFixed(0);
rt = rt.toFixed(0);

$("#chartCr").text(cr+"%");
$("#chartAr").text(ar+"%");
$("#chartCh").text(ch+"%");
$("#chartRt").text(rt+"%");


var ctxD = document.getElementById("doughnutChart").getContext('2d');
               var myLineChart = new Chart(ctxD, {
                 type: 'doughnut',
                 data: {

                   labels: ["Acute Case    ", "Chronic Case    ", "Return Machine    ",  "Change Machine    "],
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                    toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                   datasets: [{
                     data: [size.ar, size.cr, size.rt, size.ch],
                     backgroundColor: ["#F26C4F", "#3CB878", "#FFA700",  "#5DB2FC"],
                     hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870",  "#38C7F9"]
                   }]
                 },
                 options: {
                   responsive: true
                 }
               });
               var ctxD2 = document.getElementById("RED1").getContext('2d');
               var myLineChart2 = new Chart(ctxD2, {
                 type: 'doughnut',
                 data: {
                   label:["a","b"],
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                   toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                   datasets: [{
                     data: [size.ar, caselist.length],
                     backgroundColor: ["#F26C4F", "#F0F0F0"],
                     weight: 1,
                     hoverBackgroundColor: ["#FF5A5E", "#F0F0F0"]
                   }]
                 },
                 options: {
                   responsive: true
                 }
               });

               var ctxD3 = document.getElementById("GREEN1").getContext('2d');
               var myLineChart3 = new Chart(ctxD3, {
                 type: 'doughnut',
                 data: {
                   label:["a","b"],
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                   toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                   datasets: [{
                     data: [size.cr, caselist.length],
                     backgroundColor: ["#3CB878", "#F0F0F0"],
                     weight: 1,
                     hoverBackgroundColor: ["#1cc88a", "#F0F0F0"]
                   }]
                 },
                 options: {
                   responsive: true
                 }
               });

               var ctxD4 = document.getElementById("BLUE1").getContext('2d');
               var myLineChart4 = new Chart(ctxD4, {
                 type: 'doughnut',
                 data: {
                   label:["a","b"],
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                   toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                   datasets: [{
                     data: [size.ch, caselist.length],
                     backgroundColor: ["#5DB2FC", "#F0F0F0"],
                     weight: 1,
                     hoverBackgroundColor: ["#219eec", "#F0F0F0"]
                   }]
                 },
                 options: {
                   responsive: true
                 }
               });

               var ctxD4 = document.getElementById("YELLOW1").getContext('2d');
               var myLineChart4 = new Chart(ctxD4, {
                 type: 'doughnut',
                 data: {
                   label:["a","b"],
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                   toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                   datasets: [{
                     data: [size.rt, caselist.length],
                     backgroundColor: ["#FFA700", "#F0F0F0"],
                     weight: 1,
                     hoverBackgroundColor: ["#F9C738", "#F0F0F0"]
                   }]
                 },
                 options: {
                   responsive: true
                 }
               });

}else{
  $("#graph").hide();
}

}


var histories = [];

function renderCaseActivity(){
console.log("caseaCtivity : "+roleName)
if(roleName == "TS" ||  roleName == "CS" || roleName == "FN"){
     histories = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findHistoryDocByAreaAndDocStatusAndRoleAndCase?documentStatus=F&createdBy='+session['user'],
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
  // console.log(histories)

  }else{
    histories = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findHistoryDocByAreaAndDocStatusAndRoleAndCase?documentStatus=A,F&createdBy='+session['user'],
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
  }
// var imageData ={}
  $.each(histories,function(index,item){
    if(tempImage[item.actionBy] == null ){
        tempImage[item.actionBy] = getImage(item.actionBy);
    }
    $("#renderActivity").append(
      '<div class="card-body shadow" style="background-color:#f0f4f7;margin:2%">'+
                         '<div class="row">'+
                            '<div class="col-2" style="text-align:center;background-color:white;">'+
                              '<img src="data:image/png;base64,'+tempImage[item.actionBy]+'" style="margin-top:15%" class="rounded-circle" width="60px" height="60px"/>'+
                             item.roleName+' <span style="color:#5DB2FC">'+item.actionBy+'</span>'+
                            '</div>'+

                            '<div class="col-10">'+
                              '<div class="row">'+
                       '<div class="col-5" style="text-align:left;color:black">'+
                       '<span>Case ID: '+item.caseNumber+'</span>' +
                        ' <br/>'+
                        '      <span>'+caseType[item.caseType]+'</span> '+
                        '      </div>'+
                        '      <div class="col-7" style="text-align:right;">'+
                        '        <span>'+
                        '         Update: '+DateUtil.coverDateToStringAndTime2(item.actionDate) +
                        '        </span>'+
                        '     </div> '+
                        '     </div>'+
                        '      <div class="row" style="margin-top:20px">'+
                        '         <div class="col-6" style="text-align:left;color:black;">'+
                        '          <span>Active: '+item.actionStatus.split(":").join("") +'</span>'+
                        '         </div>'+
                        '        <div class="col-6" style="text-align:right">'+
                        '         <span style="color:#5DB2FC">'+
                        '         <a href="'+session['context']+'/casemanagements/detailCase?id='+item.caseId+'"> More Detail</a>'+
                        '          </span>'+
                        '       </div>'+
                        '      </div>'+
                        '     </div>'+
                        '      </div>'+
                        '    </div>'+
                       ' </div> '


      );
  });








}



// // console.log(histories);
//  $.each(histories,function(index,item){
//    if(index<=5){
//      if(tempUser[item.actionBy] == null){
//        tempUser[item.actionBy] =getUserProfile(item.actionBy);
//      }
//      if(tempImage[item.actionBy]==null){
//        tempImage[item.actionBy] =getImage(item.actionBy);
//      }

//      $("#renderActivity").append( '<div class="card-body shadow" style="background-color:#CCF5FB;margin:2%" >'+
//       '                <div class="row">'+
//       '                  <div class="col-2" style="text-align:center;background-color:white;">'+
//       '                    <img src="data:image/png;base64,'+tempImage[item.actionBy]+'"  style="margin-top:15%" class="rounded-circle" width="100%" height="40%">'+
//                          '</img>'+tempUser[item.actionBy].role.name+' <span style="color:#5DB2FC">'+item.actionBy+'</span>'+
//                         '</div>'+

//                         '<div class="col-10">'+
//                           '<div class="row">'+
//                             '<div class="col-5" style="text-align:left;color:black">'+
//                               '<span>Case ID: '+ item.caseNumber+'</span>'+
//                               '<br/>'+
//                               '<span>'+caseType[item.caseType]+'</span>'+
//                             '</div>'+
//                             '<div class="col-7" style="text-align:right;">'+
//                               '<span>'+
//                                 'Upated: '+ DateUtil.coverDateToStringAndTime( item.actionDate)  +
//                               '</span>'+
//                             '</div>'+

//                             '</div>'+
//                             '<div class="row" style="margin-top:15%">'+
//                               '<div class="col-6" style="text-align:left;color:black;">'+
//                                 '<span>Active: '+item.actionStatus+' </span>'+
//                               '</div>'+
//                               '<div class="col-6" style="text-align:right">'+
//                                 '<span style="color:#5DB2FC">'+
//                                   'More Detail'+
//                                 '</span>'+
//                               '</div>'+
//                             '</div>'+
//                          ' </div>'+
//                           '</div>'+
//                         '</div>');

//    }
//  });

//  $("#renderActivity").append(
// '<div class="text-center" style="margin:3%">'+
//                        '<form class="user text-center">'+
//                        '<a  class="btn btn-primary btn-user " style="width:20%">'+
//                         ' <label>  View all  </label>'+
//                        '</a>'+
//                      '</form>'+
//                     '</div>'

//    );

// }

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

$(".toggle2").click(function(){
    var checked = $(this).prop("checked");
    $("#renderActivity").empty();

     if(checked == true){
  $.each(histories,function(index,item){
      console.log()
    if(session['user'] == item.actionBy){
        if(tempImage[item.actionBy] == null ){
            tempImage[item.actionBy] = getImage(item.actionBy);
        }


        $("#renderActivity").append(
          '<div class="card-body shadow" style="background-color:#CCF5FB;margin:2%">'+
                         '<div class="row">'+
                            '<div class="col-2" style="text-align:center;background-color:white;">'+
                              '<img src="data:image/png;base64,'+tempImage[item.actionBy]+'" style="margin-top:15%" class="rounded-circle" width="60px" height="60px"/>'+
                             item.roleName+' <span style="color:#5DB2FC">'+item.actionBy+'</span>'+
                            '</div>'+

                            '<div class="col-10">'+
                              '<div class="row">'+
                       '<div class="col-5" style="text-align:left;color:black">'+
                       '<span>Case ID: '+item.caseNumber+'</span>' +
                        ' <br/>'+
                        '      <span>'+caseType[item.caseType]+'</span> '+
                        '      </div>'+
                        '      <div class="col-7" style="text-align:right;">'+
                        '        <span>'+
                        '         Update: '+DateUtil.coverDateToStringAndTime2(item.actionDate) +
                        '        </span>'+
                        '     </div> '+
                        '     </div>'+
                        '      <div class="row" style="margin-top:20px">'+
                        '         <div class="col-6" style="text-align:left;color:black;">'+
                        '          <span>Active: '+item.actionStatus.split(":").join("") +'</span>'+
                        '         </div>'+
                        '        <div class="col-6" style="text-align:right">'+
                        '         <span style="color:#5DB2FC">'+
                        '         <a href="'+session['context']+'/casemanagements/detailCase?id='+item.caseId+'"> More Detail</a>'+
                        '          </span>'+
                        '       </div>'+
                        '      </div>'+
                        '     </div>'+
                        '      </div>'+
                        '    </div>'+
                       ' </div> '


      );

    }

    });




      }else{


      $.each(histories,function(index,item){
      if(tempImage[item.actionBy] == null ){
            tempImage[item.actionBy] = getImage(item.actionBy);
        }


        $("#renderActivity").append(
          '<div class="card-body shadow" style="background-color:#CCF5FB;margin:2%">'+
                         '<div class="row">'+
                            '<div class="col-2" style="text-align:center;background-color:white;">'+
                              '<img src="data:image/png;base64,'+tempImage[item.actionBy]+'" style="margin-top:15%" class="rounded-circle" width="60px" height="60px"/>'+
                             item.roleName+' <span style="color:#5DB2FC">'+item.actionBy+'</span>'+
                            '</div>'+

                            '<div class="col-10">'+
                              '<div class="row">'+
                       '<div class="col-5" style="text-align:left;color:black">'+
                       '<span>Case ID: '+item.caseNumber+'</span>' +
                        ' <br/>'+
                        '      <span>'+caseType[item.caseType]+'</span> '+
                        '      </div>'+
                        '      <div class="col-7" style="text-align:right;">'+
                        '        <span>'+
                        '         Update: '+DateUtil.coverDateToStringAndTime2(item.actionDate) +
                        '        </span>'+
                        '     </div> '+
                        '     </div>'+
                        '      <div class="row" style="margin-top:20px">'+
                        '         <div class="col-6" style="text-align:left;color:black;">'+
                        '          <span>Active: '+item.actionStatus.split(":").join("") +'</span>'+
                        '         </div>'+
                        '        <div class="col-6" style="text-align:right">'+
                        '         <span style="color:#5DB2FC">'+
                        '         <a href="'+session['context']+'/casemanagements/detailCase?id='+item.caseId+'"> More Detail</a>'+
                        '          </span>'+
                        '       </div>'+
                        '      </div>'+
                        '     </div>'+
                        '      </div>'+
                        '    </div>'+
                       ' </div> '


      );

    });


      }


});
