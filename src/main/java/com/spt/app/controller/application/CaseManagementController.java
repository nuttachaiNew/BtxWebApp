package com.spt.app.controller.application;

import com.spt.app.aop.annotation.Loggable;
import com.spt.app.service.CaseManagementService;

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
@RequestMapping("/casemanagements")
public class CaseManagementController{

    static final Logger LOGGER = LoggerFactory.getLogger(CaseManagementController.class);

    @Autowired
    CaseManagementService caseManagementService;



    @Loggable
    @GetMapping("/manageCaseforBU")
    public String manageCaseforBU() {
        return "casemanagements/manageCaseforBU";
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



}
