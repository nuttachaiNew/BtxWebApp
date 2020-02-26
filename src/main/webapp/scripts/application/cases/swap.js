var tempUser = {};
var tempImage = {};
var roleName = "";

var machineType ={
   "GB1" : "Homechoice 10.4 Patient at Home Guide",
   "GB2" : "Homechoice 10.4 Patient at Home Guide addendum",
   "GB3" : "HomeChoice Claria Procedure Guide",
   "GB4" :  "HomeChoice Claria Troubleshooting Guide",
    "GB5" : "Homechoice Claria Patient Consent Notice - Thai",
   "GB6" : "APD Patient Record Book",
   "MC1" : "Machine home choice 10.4",
   "MC2" : "Machine Claria",
   "SC" : "Soft Case",
   "HC" : "Hard Case",
   "MOD" : "Modem",
   "PWC" : "Powercord"	
}

$(document).ready(function () {
  renderProfile();
	renderData();
	
});


$("#logout").click(function(){
	submitlogout() ;
});

function renderData(){
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
var status = "";
if(item.caseType == "CH"){
	status= "waiting swap..";
}else{
	status= "waiting return..";
}

if(item.missingFlag != null){
  status= "missing";
}
      var   btn=        '<td><center> <div class="fa-2x" ><a  href="'+session['context']+'/casemanagements/swapMachineDetail?id='+item.id+'" ><i class="fas fa-edit" ><jsp:text/></i></a></div></center></td>';

    	$("tbody").append("<tr>"+
    		"<td>"+item.caseNumber+"</td>"+
        "<td>"+caseType[item.caseType]+"</td>"+
    		"<td>"+item.cutsomerName+"</td>"+

        "<td>"+(item.createdDate==null?"":DateUtil.coverDateToString (item.createdDate))+"</td>"+
        "<td>"+item.machineName+"</td>"+
    		"<td>"+status+"</td>"+

  btn+
                '<td> <div class="fa-2x searchblue" ><a href="'+session['context']+'/casemanagements/detailCase?id='+item.id+'"  ><i class="fas fa-search" ><jsp:text/></i></a></div></td>'+
         
    		"</tr>");
    });
}
