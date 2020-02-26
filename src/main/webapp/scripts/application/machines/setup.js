
var $tbody   =  $("#tableData");
var tempMachine = {};
var machine=[];
var machineType ={
   "GB1" : "Homechoice 10.4 Patient at Home Guide",
   "GB2" : "Homechoice 10.4 Patient at Home Guide addendum",
   "GB3" : "HomeChoice Claria Procedure Guide",
   "GB4" :  "HomeChoice Claria Troubleshooting Guide",
   "GB5" :  "Homechoice Claria Sharesource Patient Consent Notice - Thai",
   "GB6" :  "APD Patient Record Book",
   "MC1" : "Machine home choice 10.4",
   "MC2" : "Machine Claria",
   "SC" : "Soft Case",
   "HC" : "Hard Case",
   "MOD" : "Modem",
   "PWC" : "Powercord"	
}

 $("[name=sortDate]").click(function(){
        var sortBy = $(this).attr("sortBy");
        var machineList =machine;
        if(""==sortBy || sortBy =="DESC"){
          machineList.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : -1)
          $(this).attr("sortBy","ASC")
        }else{
          machineList.sort((a, b) => (a.createdDate < b.createdDate) ? 1 : -1)
          $(this).attr("sortBy","DESC")
        }
         renderTable(machineList);
    });


  $("#btnSearch").click(function(){
     var  caseType = $("#caseType").val();
     var data =[];
     
     if(caseType == ""){
        data = machine;
     }else{
      console.log(caseType)
        $.each(machine,function(index,item){
            if(caseType == item.machineType){
               data.push(item);
            }
        });
     }


     renderTable(data);
  });
var type = [
{"code":"MC1",
   "name":"Machine home choice 10.4"
  },
  {"code":"MC2",
   "name":"Machine Claria"
  },
{"code":"MOD",
   "name":"Modem"
  },
 {"code":"HC",
   "name":"Hard Case"
  },
 {"code":"SC",
   "name":"Soft Case"
  },
  {"code":"PWC",
   "name":"Powercord"
  },
  {"code":"GB1",
   "name":"Homechoice 10.4 Patient at Home Guide"
  },
  {"code":"GB2",
   "name":"Homechoice 10.4 Patient at Home Guide addendum"
  },{"code":"GB3",
   "name":"HomeChoice Claria Procedure Guide"
  },{"code":"GB4",
   "name":"HomeChoice Claria Troubleshooting Guide"
  },{"code":"GB5",
   "name":"Homechoice Claria Sharesource Patient Consent Notice - Thai"
  },{"code":"GB6",
   "name":"APD Patient Record Book"
  }
]

 $("#caseType").append("<option value='' >All</option>")
$.each(type,function(index,item){
  $("#caseType").append("<option value="+item.code+" >"+item.name+" </option> ")
});
$(document).ready(function () {
	// on load 
    renderProfile();
	  renderData();
});

function compare( a, b ) {
  if ( a.code < b.code ){
    return -1;
  }
  if ( a.code > b.code ){
    return 1;
  }
  return 0;
}


function renderData(){
	$tbody.empty();
	    var json = $.ajax({
        type: "GET",
        dataType: "json",
        url: session['context'] + '/machines/findAllMachine',
        headers: {
            Accept: "application/json",
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseJSON;
      var data = [];
      $.each(json,function(index,item){
          if(item.machineType){
            data.push(item);
          }
      });

      data.sort( compare );


    machine = data;
	 renderTable(data);
}

function renderTable(data){
  $tbody.empty();
  $.each(data,function(index,item){

    var $btnEdit  = "<button class='btn btn-sm btn-info btnlist' onclick='editData("+item.id+")' name='btnEdit' id="+item.id+" > <span class='fa fa-pencil'></span></button>" ;
    var $btnDelete  = "<button class='btn btn-sm btn-info btnlist' onclick='deleteData("+item.id+")' name='btnDelete' id="+item.id+" > <span class='fa fa-search'></span></button>" ;
    var status= item.status == 1 ? 'Ready' : item.status == 0 ? "Used" : item.status==2 ? "Waiting Return" : item.status==3?"Waiting Swap":item.status==4?"Waste":"";
    if(item.code){
      var type = machineType[item.machineType] ;
      if(item.modelRef == "MC2" && item.machineType == "GB1"){
        type= "HomeChoice Claria Patient At Home Guide";
      }else if (item.modelRef == "MC2" && item.machineType == "GB2"){
        type= "HomeChoice Claria Patient At Home Guide addendum"
      }

      $tbody.append(
      "<tr>"+
        "<td>"+ (item.code == null ? "" : item.code) +"</td>"+
        "<td>"+ (item.serialNumber == null ? "" : item.serialNumber) +"</td>"+
        "<td>"+ (item.createdDate == null ? "" : DateUtil.coverDateToStringAndTime(item.createdDate)) +"</td>"+
        "<td>"+ (item.name == null ? "" : item.name) +"</td>"+
        "<td>"+ type +"</td>"+
        "<td>"+ status +"</td>"+
        // "<td>"+ $btnEdit +"</td>"+
                '<td> <div class="fa-2x editblue" ><a href="'+session['context']+'/machines/manageProduct?id='+item.id+'"  ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.083" height="48.799" viewBox="0 0 85.083 48.799"> <defs> <filter id="Rectangle_772" x="0" y="0" width="85.083" height="48.799" filterUnits="userSpaceOnUse"> <feOffset dx="1" dy="1" input="SourceAlpha"/> <feGaussianBlur stdDeviation="0.5" result="blur"/> <feFlood flood-opacity="0.161"/> <feComposite operator="in" in2="blur"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="Group_931" data-name="Group 931" transform="translate(-2368.799 -8098.5)"> <g transform="matrix(1, 0, 0, 1, 2368.8, 8098.5)" filter="url(#Rectangle_772)"> <rect id="Rectangle_772-2" data-name="Rectangle 772" width="82.083" height="45.799" rx="22.9" transform="translate(0.5 0.5)" fill="#5db2fc"/> </g> <g id="baseline-edit-24px" transform="translate(2393.969 8104.134)"> <path id="Path_357" data-name="Path 357" d="M3,21.928v4.981H7.981l14.69-14.69L17.69,7.238ZM26.522,8.367a1.323,1.323,0,0,0,0-1.873L23.414,3.386a1.323,1.323,0,0,0-1.873,0L19.111,5.817,24.092,10.8l2.431-2.431Z" transform="translate(0.985 0.984)" fill="#fff"/> <path id="Path_358" data-name="Path 358" d="M0,0H31.877V31.877H0Z" fill="none"/> </g> </g> </svg></a></div></td>'+

      "</tr>"
      );
    tempMachine[item.id] = item;
    }
    
  });

   $("table").tablesorter({
    headers: {
        0: {
            sorter: false
        },
        1:{  sorter: false },
        2:{  sorter: false }
        }
    });

}

$("#addProdduct").click(function(){
	window.location.href= session['context']+'/machines/addProduct';
});
// function editData(id){
// 	var itemEdit = tempMachine[id];
// 	alert (itemEdit.name + " " + item.machineType + " : Edit");
// }

// function deleteData(id){
// 	var deleteId = id;
// 	alert (deleteId + " : Delete");
// }
   $("#logout").click(function(){
      submitlogout() 
    });


