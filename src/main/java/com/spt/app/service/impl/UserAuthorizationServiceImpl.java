package com.spt.app.service.impl;

import com.spt.app.aop.annotation.Loggable;
import com.spt.app.service.AbstractEngineService;
import com.spt.app.service.UserAuthorizationService;
import com.spt.app.spring.security.CustomUser;
import com.spt.app.spring.security.CustomUserModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletContext;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserAuthorizationServiceImpl extends AbstractEngineService implements UserAuthorizationService {

    static final Logger LOGGER = LoggerFactory.getLogger(UserAuthorizationServiceImpl.class);

    @Autowired
    CustomUserModel customUserModel;

    @Autowired
    private ServletContext servletContext;

    /* For case Special Authentication */
    @Loggable
    public Object getUserDetail(String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");
        headers.add("userName", username);

        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        String url = "/users/findUserByUserName?username=" + username;
            LOGGER.info("CHECK USER URL ====>   {}",url);
        String json = restTemplate.exchange(EngineServer + url, HttpMethod.GET, entity, String.class).getBody();
        // Map userMap = gson.fromJson(json, Map.class);
        LOGGER.info("information user : {}",json);

        /* Set Role by Stream*/
        CustomUser userTmp = gson.fromJson(json, CustomUser.class);

        return userTmp;
    }

    public Double returnStatusLogin(String username) {

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");
        headers.add("userName", username);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        String url = "/users/search/findByUsername?username=" + username;
        String json = restTemplate.exchange(EngineServer + url, HttpMethod.GET, entity, String.class).getBody();
        Map userMap = gson.fromJson(json, Map.class);
        Double isActive = (Double) userMap.get("isActive");


        return isActive;

    }


    @Override
    @Autowired
    public void setRestTemplate(RestTemplate restTemplate) {

        super.restTemplate = restTemplate;
    }

}
