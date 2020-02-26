
$(document).ready(function () {
    $("#demo").val("Chronic Case")
    renderProfile();
	 renderData();
});



$("#logout").click(function(){
  submitlogout() 
});


$("#dateFrom").change(function(){
  $("#dateTo").val($(this).val());
});

$("#search").click(function(){
  search();
});

function renderData(){

    $("#selectArea").empty();
    $("#selectArea").append("<option value='' >All</option>")
      var areas = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/areas/findAllAreas',
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
     $.each(areas,function(index,item){
        $("#selectArea").append("<option value="+item.id+" >"+item.code+" : "+item.name+ "</option>");
     }); 

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
     roleName = json.role.name; 
     console.log("rolename : "+roleName)
     search();
                        



}

function search(){
    var areaId= $("#selectArea").val()
    var caselist = [];
    var dateFrom = $("#dateFrom").val(); 
    var dateTo = $("#dateTo").val();
   caselist = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/casemanagements/findCaseByCriteria?role='+roleName+"&username="+session['user']+"&dateFrom="+dateFrom+"&dateTo="+dateTo+"&areaId="+areaId,
        headers: {
            Accept: "application/json",
        },
        data:{date:"",caseNumber:""},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;

  $("tbody").empty();
 var cases =  $("#demo").text();
 var type ="";
 if(cases == "Chronic Case"){
  type ="CR";
 }else if(cases == "Acute Case"){
  type = "AR";
 }else if(cases =="Change Machine"){
  type = "CH"
 }else if(cases =="Return Machine"){
  type = "RT"
 }
 console.log(cases + " " + type )
 var orders=1;

 if(caselist.length>0){
  $("#staticGraph").show();
  $("tbody#data").empty();
  $.each(caselist,function(index,item){
  if(item.caseType ==type){
    $("tbody#data").append(
    "<tr>"+
      "<td>"+orders+"</td>"+
      "<td>"+item.caseNumber+"</td>"+
      "<td>"+item.cutsomerName+"</td>"+
      "<td>"+(item.address.split("#").join("</br>"))  +"</td>"+
      "<td>0 days</td>"+

    "</tr>"
    )
    orders++;
  }
  
 });
var size = {};
size.ar=0;
size.cr=0;
size.rt=0;
size.ch=0;
$.each(caselist,function(index,item){
  if(item.caseType=="AR"){
    size.ar++;
  }else if(item.caseType=="CR"){
    size.cr++;
  }else if(item.caseType=="RT"){
    size.rt++;
  }else if(item.caseType=="CH"){
    size.ch++;
  }
});


     var ctxD = document.getElementById("doughnutChart").getContext('2d');
     var myLineChart = new Chart(ctxD, {
       type: 'doughnut',
       data: {

         labels: ["Acute Case", "Chronic Case", "Return Machine",  "Change Machine"],
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

     //chart2
 }else{
  $("#staticGraph").hide();

 }
}
