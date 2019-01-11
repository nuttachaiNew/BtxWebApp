package com.spt.app.controller.application;

import com.spt.app.aop.annotation.Loggable;
// import com.spt.app.service.PositionService;

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
@RequestMapping("/admins")
public class AdminController{

    //static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);

    @Autowired

    //@Loggable
    @GetMapping("/setupAdmin")
    public String setupAdmin() {
        return "admins/setupAdmin";
    }
}