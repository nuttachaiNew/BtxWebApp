package com.spt.app.controller.application;

import com.spt.app.aop.annotation.Loggable;
import com.spt.app.service.MachineService;

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
@RequestMapping("/machines")
public class MachineController{

    static final Logger LOGGER = LoggerFactory.getLogger(MachineController.class);

    @Autowired
    MachineService machineService;

    //@Loggable
    @GetMapping("/setupMachine")
    public String setupMachine() {
        return "machines/setupMachine";
    }
    @GetMapping("/productTracking")
    public String productTracking() {
        return "machines/productTracking";
    }

    @GetMapping("/returnMachine")
    public String returnMachine() {
        return "machines/returnMachine";
    }

    @GetMapping("/manageProduct")
    public String manageProduct() {
        return "machines/manageProduct";
    }

   @GetMapping("/addProduct")
    public String addProduct() {
        return "machines/addProduct";
    }


    @GetMapping("/findAllMachine")
    public ResponseEntity<String> findAllMachine( HttpServletRequest request ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = machineService.findAllMachine();
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findAllMachine[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
     @GetMapping("/findById")
    public ResponseEntity<String> findById( HttpServletRequest request ,@RequestParam(value = "id") Long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = machineService.findById(id);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findById[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @PostMapping("/insert")
    public ResponseEntity<String> insert(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("insert[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = machineService.insert(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("insert[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

         @PostMapping("/insertList")
    public ResponseEntity<String> insertList(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("insertList[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = machineService.insertList(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("insert[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/update")
    public ResponseEntity<String> update(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("update[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = machineService.update(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("update[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}