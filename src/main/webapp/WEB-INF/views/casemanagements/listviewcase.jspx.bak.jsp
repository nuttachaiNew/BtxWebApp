<div xmlns:spring="http://www.springframework.org/tags"   xmlns:util="urn:jsptagdir:/WEB-INF/tags/util"  xmlns:form="http://www.springframework.org/tags/form"  xmlns:c="http://java.sun.com/jsp/jstl/core"  xmlns:jsp="http://java.sun.com/JSP/Page"    version="2.0">
  <jsp:directive.page contentType="text/html;charset=UTF-8" />
  <jsp:output omit-xml-declaration="yes" />
    <spring:url value="/resources/images/cancel.png" var="img_cancel"/>
    <spring:url value="/resources/images/checked.png" var="img_checked"/>

  <c:set scope="request" var="LB_CODE"><spring:message code="LB_CODE"/></c:set>
  <c:set scope="request" var="LB_NAME"><spring:message code="LB_NAME"/></c:set>
  <c:set scope="request" var="LB_SAVED_DATE"><spring:message code="LB_SAVED_DATE"/></c:set>
  <c:set scope="request" var="LB_RECIEVE_DATE"><spring:message code="LB_RECIEVE_DATE"/></c:set>
  <c:set scope="request" var="LB_DELETE"><spring:message code="LB_DELETE"/></c:set>
  <spring:url value="/resources/images/user.png" var="img_user" />
  
  <style>
              .Pend{
                color:red;
              }
              .Rejec{
                color:orange;
              }
              .Approve{
                color:green;
              }
              .searchblue{
                text-align:center;
                color:#219FEC;
              }
              .editblue{
                text-align:center;
                color:#219FEC;
              }
              .editgray{
                text-align:center;
                color:#909798;
              }
                 .icon {color: white!important;}

              </style>

 <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="menuboom navbar-nav bg-gradient-light sidebar sidebar-light accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <div class="container" style="padding-top: 0px;">
      <div class="row" style="text-align:center">
      <div class="col-12">
      <br/>
      <span>
      <img src="${img_user}" class="rounded-circle" width="100" height="100" id="profileImage" />

      </span>
      </div>
      <div class="col-12">
      <p class="mr-2 d-none d-lg-inline text-light-600 xx-large" id="profileName" style="color:#219FEC">Valerie Luna</p><br/>
      <p class="mr-2 d-none d-lg-inline text-light-600 large" id="profileRole" style="color:black">CS</p><br/>
      <p class="mr-2 d-none d-lg-inline text-light-600 large" id="profileArea" >Baxter Area</p>
      <div class="col-12">
        <jsp:text/>
      </div>
        <jsp:text/>
      </div>
         <!--  <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </a> -->

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Nav Item - Dashboard -->

<ul class="nav nav-pills" id="menubarbu">
      <li class="nav-item" id="Dashboard">
        <a class="nav-link text-center" href="/BTX/casemanagements/dashboard" style="color:#219FEC">
          <i class="fas fa-fw fa-tachometer-alt icon" style="color:#219FEC!important"><jsp:text/></i>
          <span>Dashboard</span>
        </a>

      </li>
        <li class="nav-item" id="ViewCase">

        <a class="nav-link activeVC text-center collapse-inner rounded"  >
          <i class="fas fa-align-justify icon" style="color:red"><jsp:text/></i>
          <span>View Case</span></a>
      </li>

        <li class="nav-item" id="ViewReport">
        <a class="nav-link text-center" href="/BTX/casemanagements/viewReport" style="color:#5ADA79">
          <i style="color:#5ADA79!important" class="far fa-chart-bar icon"><jsp:text/></i>
          <span>View Report</span></a>
      </li>
       <li class="nav-item" id="viewProduct">
        <a class="nav-link text-center" href="/BTX/machines/setupMachine" >
          <i class="fas fa-cog icon"  style="color:red!important"><jsp:text/></i>
          <span style="color:red!important">Manage Product</span></a>
      </li>

        <li class="nav-item" id="logout">
        <a id="logout" href="#" class="nav-link text-center" onlick="submitlogout()" style="color:#5ADA79;">
          <i style="color:#5ADA79!important" ><jsp:text/></i>
          <span>Logout</span></a>
      </li>


</ul>

      <div class="text-center d-none d-md-inline">
        <jsp:text/>
      </div>

    </div></div>

</ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content" style="background-color:#219FEC">

        <!-- Topbar -->

        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid" >

          <!-- Page Heading -->
          <br/>
          <div class="row d-sm-flex align-items-center justify-content-between" style="padding-top:5px">
           <div class="col-8"> <h1 class="h6 text-light">View Case</h1></div>
              <div class="col-2">
                <h1 class="h6 text-light"><i class="fas fa-bell"><jsp:text/></i>   Notification</h1>
              </div>
              <div class="col-2"><h1 class="h6 text-light"><i class="fas fa-cog"><jsp:text/></i>   Settings</h1>
              </div>
          </div>
          <hr/>
          <form class="user">
            <div class="row">

              <!-- Earnings (Monthly) Card Example -->
              <div class="col-6">
                <div class="dropdown">
                  <input type="date" id="txtDate" class="btn btn-light" />
                </div>
              </div>

              

              <!-- Earnings (Monthly) Card Example -->
              <div class="col-6 " style="text-align:right">
                 <div class="row">
                   <div class="col-8">
                      <input type="text" class="form-control form-control-user" id="txtCaseNumber" placeholder="Search by Case ID or Name" />
                   </div>
                   <div class="col-4">
                     <button type="button" id="btnSearch" class="btn btn-light btn-user btn-block">
                      Search
                    </button>
                   </div>
                 </div>
              </div>

            </div>
          </form>

<!-- Modal -->

          <form class="user">
              <div class="row">

                <!-- Area Chart -->
                <div class="col">
                  <div class="card shadow mb-4">

                <div class="card-body">
                  <div class="table">
                    <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">

                      <div class="row">
                        <div class="col-sm-12">
                      <table class="table table-sm dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                      <thead>
                        <tr role="row">
                          <th>Case ID</th>
                          <th>Date</th>
                          <th>Case Type</th>
                          <th>Customer Name</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Manage</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                       <jsp:text/>
                      </tbody>
                     
                    </table>
                    <!-- end of table -->

                  </div>
                </div>
              </div>
                  </div>
                </div>
                <!-- end card body -->
              </div>
                </div>

                <!-- col  -->

              </div>
            </form>


          </div>

          <!-- Content Row -->


        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->


    </div>
    <!-- End of Content Wrapper -->


  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top" style="display: inline;">
    <i class="fas fa-angle-up"><jsp:text/></i>
  </a>


  <spring:url value="${urls.getForLookupPath('/resources/scripts/application/cases/list.js')}" var="setup" />
    <script type="text/javascript"  src="${setup}" ><!-- required for FF3 and Opera --></script>

</div>