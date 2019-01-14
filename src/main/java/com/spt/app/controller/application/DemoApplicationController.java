package com.spt.app.controller.application;

import com.spt.app.aop.annotation.Loggable;
import com.spt.app.service.DemoApplicationService;

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


@Controller
@RequestMapping("/demos")
public class DemoApplicationController{

    static final Logger LOGGER = LoggerFactory.getLogger(DemoApplicationController.class);

    @Autowired
    DemoApplicationService demoService;

    
    @Loggable
    @GetMapping("/inquiry")
    public String inquiry() {
        return "demos/inquiry";
    }

    @Loggable
    @GetMapping("/list")
    public String list(){
       return "demos/list";
    }

    @Loggable
    @PostMapping("/find")
    public String find( 
                        HttpServletRequest request 
                       ){
                        // @RequestParam(value = "id", required = true) Long id
                        // Model uiModel, 
       return "demos/find";
    }
            

    @GetMapping("/listDemoApplicationOrderByParam")
    public ResponseEntity<String> listDemoApplicationOrderByParam( HttpServletRequest request 
                                                                 ,@RequestParam(value = "orderBy", required = false) String orderBy
                                                                 ,@RequestParam(value = "sortBy", required = false) String sortBy
                                                                 ,@RequestParam(value = "firstResult", required = false) Integer firstResult 
                                                                 ,@RequestParam(value = "maxResult", required = false) Integer maxResult ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = demoService.listDemoApplicationOrderByParam(orderBy,sortBy,firstResult,maxResult);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("listDemoApplicationOrderByParam[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/listDemoApplicationOrderByParamAndKeyword")
    public ResponseEntity<String> listDemoApplicationOrderByParamAndKeyword( HttpServletRequest request 
                                                                 ,@RequestParam(value = "orderBy", required = false) String orderBy
                                                                 ,@RequestParam(value = "sortBy", required = false) String sortBy
                                                                 ,@RequestParam(value = "firstResult", required = false) Integer firstResult 
                                                                 ,@RequestParam(value = "maxResult", required = false) Integer maxResult
                                                                 ,@RequestParam(value = "keyword", required = false) String keyword

                                                                  ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = demoService.listDemoApplicationOrderByParamAndKeyword(keyword,orderBy,sortBy,firstResult,maxResult);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("listDemoApplicationOrderByParam[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


     @GetMapping("/listDemoApplicationOrderByParamSizeKeyword")
    public ResponseEntity<String> listDemoApplicationOrderByParamSizeKeyword( HttpServletRequest request 
                                                                 ,@RequestParam(value = "orderBy", required = false) String orderBy
                                                                 ,@RequestParam(value = "sortBy", required = false) String sortBy
                                                                 ,@RequestParam(value = "keyword", required = false) String keyword
 ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = demoService.listDemoApplicationOrderByParamSizeKeyword(keyword,orderBy,sortBy);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("listDemoApplicationOrderByParamSizeKeyword[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     @GetMapping("/listDemoApplicationOrderByParamSize")
    public ResponseEntity<String> listDemoApplicationOrderByParamSize( HttpServletRequest request 
                                                                 ,@RequestParam(value = "orderBy", required = false) String orderBy
                                                                 ,@RequestParam(value = "sortBy", required = false) String sortBy ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = demoService.listDemoApplicationOrderByParamSize(orderBy,sortBy);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("listDemoApplicationOrderByParamSize[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("/deleteDemo/{id}")
    public ResponseEntity<String> deleteDemo( HttpServletRequest request 
                                                             ,@PathVariable Long id    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = demoService.deleteDemo(id);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("deleteDemo[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


     @PostMapping("/insertDemo")
    public ResponseEntity<String> insertDemo( HttpServletRequest request 
                                                             ,@RequestBody String json    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = demoService.insertDemo(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("insertDemo[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



   @GetMapping("/listDemoHeaderNamelikeAndmaxSizeAndOrderby")
    public ResponseEntity<String> listDemoHeaderNamelikeAndmaxSizeAndOrderby( HttpServletRequest request 
                                                                 ,@RequestParam(value = "orderBy", required = false) String orderBy
                                                                 ,@RequestParam(value = "sortBy", required = false) String sortBy
                                                                 ,@RequestParam(value = "size", required = false) Integer size
                                                                 ,@RequestParam(value = "name", required = true) String name
                                                                  ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = demoService.listDemoHeaderNamelikeAndmaxSizeAndOrderby(orderBy,sortBy,size,name);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("listDemoHeaderNamelikeAndmaxSizeAndOrderby[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     @RequestMapping(value = "/viewDetail", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
     public String viewDetail(@RequestParam(value = "id", required = true) String id,
                                                       Model uiModel) {
        try{
          LOGGER.debug(" viewDetail : {}",id);
          uiModel.addAttribute("id", id);
        }catch(Exception e){
            e.printStackTrace();
            LOGGER.error("error :", e.getMessage());
        }
       return "demos/viewDetail";
    }


}
