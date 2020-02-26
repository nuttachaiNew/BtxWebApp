package com.spt.app.controller.application;

import com.spt.app.aop.annotation.Loggable;
import com.spt.app.service.CaseManagementService;
import com.spt.app.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.http.HttpHeaders;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@Controller
@RequestMapping("/casemanagements")
public class CaseManagementController{

    static final Logger LOGGER = LoggerFactory.getLogger(CaseManagementController.class);

    @Autowired
    CaseManagementService caseManagementService;

     @Autowired
    UserService userService;

    @Loggable
    @GetMapping("/viewReport")
    public String viewReport() {
        return "casemanagements/viewReport";
    }

    @Loggable
    @GetMapping("/listviewcase")
    public String listviewcase() {
        return "casemanagements/listviewcase";
    }

    @Loggable
    @GetMapping("/manageCaseforBU")
    public String manageCaseforBU() {
        return "casemanagements/manageCaseforBU";
    }

    @Loggable
    @GetMapping("/mockup1")
    public String mockup1() {
        return "casemanagements/mockup1";
    }
      @Loggable
    @GetMapping("/mockup2")
    public String mockup2() {
        return "casemanagements/mockup2";
    }
      @Loggable
    @GetMapping("/mockup3")
    public String mockup3() {
        return "casemanagements/mockup3";
    }

    @Loggable
    @GetMapping("/manageCaseforFN")
    public String manageCaseforFN() {
        return "casemanagements/manageCaseforFN";
    }

    @Loggable
    @GetMapping("/manageCaseforTS")
    public String manageCaseforTS() {
        return "casemanagements/manageCaseforTS";
    }


    @Loggable
    @GetMapping("/depositlist")
    public String depositView() {
        return "casemanagements/depositView";
    }

    @Loggable
    @GetMapping("/deposit")
    public String deposit() {
        return "casemanagements/deposit";
    }

    @Loggable
    @GetMapping("/swapMachine")
    public String swapMachine() {
        return "casemanagements/swapMachine";
    }

    @Loggable
    @GetMapping("/swapMachineDetail")
    public String swapMachineDetail() {
        return "casemanagements/swapMachineDetail";
    }



    @PostMapping("/findCaseByParameter")
    public ResponseEntity<String> findCaseByParameter( HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.findCaseByParameter(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findAllAreas[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/findCaseByCriteria")
    public ResponseEntity<String> findCaseByCriteria( @RequestParam(value = "role") String role ,@RequestParam(value = "date") String date,@RequestParam(value = "caseNumber") String caseNumber ,@RequestParam(value = "username") String username 
      ,@RequestParam(value = "dateFrom",required = false) String dateFrom
      ,@RequestParam(value = "dateTo",required = false) String dateTo 
      ,@RequestParam(value = "areaId",required = false) String areaId 
      ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.findCaseByCriteria(role,date,caseNumber,username,dateFrom,dateTo,areaId);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findCaseByCriteria[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @GetMapping("/findCaseManagementByDeliveryNote")
    public ResponseEntity<String> findCaseManagementByDeliveryNote( @RequestParam(value = "deliveryNote") String deliveryNote ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.findCaseManagementByDeliveryNote(deliveryNote);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findCaseManagementById[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/findCaseManagementById")
    public ResponseEntity<String> findCaseManagementById( @RequestParam(value = "id") String id ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.findCaseManagementById(id);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findCaseManagementById[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Loggable
    @GetMapping("/listcase")
    public String listcase() {
        return "casemanagements/listcase";
    }

    @Loggable
    @GetMapping("/manage")
    public String manageCase(@RequestParam(value = "id") Long id) {
        return "casemanagements/manage";
    }

    @Loggable
    @GetMapping("/popup")
    public String popup(
         @RequestParam(value = "id") String id
        ,@RequestParam(value = "fileType") String fileType
        ,Model uiModel)  {
       try{
          return "casemanagements/popup";
       }catch(Exception e){
         LOGGER.error("error :{]",e);
         throw new RuntimeException(e);
       }
    }

    @Loggable
    @GetMapping("/popupDigitalSignature")
    public String popupDigitalSignature(
         @RequestParam(value = "username") String username
        ,Model uiModel)  {
       try{
          return "casemanagements/popupDigitalSignature";
       }catch(Exception e){
         LOGGER.error("error :{]",e);
         throw new RuntimeException(e);
       }
    }


     @PostMapping("/confirmByBU")
    public ResponseEntity<String> confirmByBU(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("confirmByBU[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = caseManagementService.confirmByBU(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("confirmByBU[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/confirmByTS")
    public ResponseEntity<String> confirmByTS(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("confirmByTS[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = caseManagementService.confirmByTS(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("confirmByTS[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

       @PostMapping("/confirmByFN")
    public ResponseEntity<String> confirmByFN(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("confirmByTS[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = caseManagementService.confirmByFN(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("confirmByFN[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


      @PostMapping("/confirmByCS")
    public ResponseEntity<String> confirmByCS(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("confirmByTS[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = caseManagementService.confirmByCS(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("confirmByCS[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value="/uploadDigitalSignature",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> uploadDigitalSignature( MultipartHttpServletRequest multipartHttpServletRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.uploadDigitalSignature(multipartHttpServletRequest);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("uploadDigitalSignature[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Loggable
    @GetMapping("/manageWorkflowCase")
    public String manageWorkflowCase(@RequestParam(value = "id") Long id) {
        return "casemanagements/manageWorkflowCase";
    }

    @Loggable
    @GetMapping("/dashboard")
    public String dashboard() {
        return "casemanagements/dashboard";
    }

    @Loggable
    @GetMapping("/detailCase")
    public String detailCase() {
        return "casemanagements/detailCase";
    }



    @GetMapping("/findHistoryDocByAreaAndDocStatusAndRoleAndCase")
    public ResponseEntity<String> findHistoryDocByAreaAndDocStatusAndRoleAndCase( @RequestParam(value = "documentStatus") String documentStatus, @RequestParam(value = "createdBy") String createdBy  ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.findHistoryDocByAreaAndDocStatusAndRoleAndCase(documentStatus,createdBy);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findHistoryDocByAreaAndDocStatusAndRoleAndCase[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @RequestMapping(value="/sendDeposit",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    public ResponseEntity<String> sendDeposit( MultipartHttpServletRequest multipartHttpServletRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.sendDeposit(multipartHttpServletRequest);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("getUserProfile[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/listDeposit")
    public ResponseEntity<String> listDeposit( @RequestParam(value = "role") String role  ,@RequestParam(value = "username") String username  ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.listDeposit(role,username);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("listDeposit[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




  @GetMapping("/listSwapMachine")
    public ResponseEntity<String> listSwapMachine( @RequestParam(value = "username") String username  ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.listSwapMachine(username);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("listDeposit[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/returnMachine")
    public ResponseEntity<String> returnMachine(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("returnMachine[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.returnMachine(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("confirmByCS[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getPaySlip")
    public ResponseEntity<String> getPaySlip( @RequestParam(value = "id") String id ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = caseManagementService.getPaySlip(id);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("getImage[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
