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
@RequestMapping("/managers")
public class ManagerController{

    static final Logger LOGGER = LoggerFactory.getLogger(ManagerController.class);

    @GetMapping("/Dashboard-MG")
    public String managers1() {
        return "managers/Dashboard-MG";
    }

    @GetMapping("/Profile-Setting-MG")
    public String managers2() {
        return "managers/Profile-Setting-MG";
    }

    @GetMapping("/View-Account-MG")
    public String managers3() {
        return "managers/View-Account-MG";
    }

     @GetMapping("/View-Case-MG")
    public String managers4() {
        return "managers/View-Case-MG";
    }


     @GetMapping("/View-Case-MG1")
    public String managers6() {
        return "managers/View-Case-MG1";
    }

    @GetMapping("/View-Report-MG")
    public String managers5() {
        return "managers/View-Report-MG";
    }


}