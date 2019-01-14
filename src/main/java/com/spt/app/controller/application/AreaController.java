package com.spt.app.controller.application;

import com.spt.app.aop.annotation.Loggable;
import com.spt.app.service.AreaService;

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
@RequestMapping("/areas")
public class AreaController{

    static final Logger LOGGER = LoggerFactory.getLogger(AreaController.class);

    @Autowired
    AreaService areaService;


    @Loggable
    @GetMapping("/setupArea")
    public String setupArea() {
        return "areas/setupArea";
    }


    @GetMapping("/findAllAreas")
    public ResponseEntity<String> findAllAreas( HttpServletRequest request ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = areaService.findAllAreas();
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findAllAreas[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/insertArea")
    public ResponseEntity<String> insertArea(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("insertArea[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = areaService.insertArea(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("insertArea[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/updateArea")
    public ResponseEntity<String> updateArea(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("updateArea[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = areaService.updateArea(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("updateArea[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping("/deleteArea")
    public ResponseEntity<String> deleteArea(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("deleteArea[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = areaService.deleteArea(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("deleteArea[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
