package com.spt.app.controller.application;

import com.spt.app.aop.annotation.Loggable;
import com.spt.app.service.PositionService;

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
@RequestMapping("/positions")
public class PositionController{

    static final Logger LOGGER = LoggerFactory.getLogger(PositionController.class);

    @Autowired
    PositionService positionService;


    @Loggable
    @GetMapping("/setupPosition")
    public String setupPosition() {
        return "positions/setupPosition";
    }


    @GetMapping("/findAllPosition")
    public ResponseEntity<String> findAllPosition( HttpServletRequest request ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = positionService.findAllPosition();
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("findAllPosition[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/insertPosition")
    public ResponseEntity<String> insertPosition(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("insertPosition[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = positionService.insertPosition(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("insertPosition[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/updatePosition")
    public ResponseEntity<String> updatePosition(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("updatePosition[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = positionService.updatePosition(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("updatePosition[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping("/deletePosition")
    public ResponseEntity<String> deletePosition(HttpServletRequest request,@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        LOGGER.info("deletePosition[Controller] :{}",json);
        ResponseEntity<String> responseEntity;
        
        try {
            responseEntity = positionService.deletePosition(json);
            return responseEntity;
        } catch (Exception e) {
            LOGGER.error("deletePosition[Controller] error msg : {}",e.getMessage());
            return new ResponseEntity<String>("{\"ERROR\":" +e.getMessage()+ "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



}