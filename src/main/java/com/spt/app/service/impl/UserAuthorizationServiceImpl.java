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
        try{
            
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
            headers.add("Content-Type", "application/json; charset=utf-8");
            headers.add("userName", username);
            HttpEntity<String> entity = new HttpEntity<String>("", headers);
            String tokenUrl = "http://58.181.168.159:8081/getToken";
            String token = restTemplate.exchange(tokenUrl, HttpMethod.GET, entity, String.class).getBody();
            LOGGER.debug("token : {}",token.replace("\"", ""));
            headers.add("Authorization", "Bearer " + token.replace("\"", ""));
            entity = new HttpEntity<String>("", headers);
            String url = "/api/users/findUserByUserName?username=" + username;
            LOGGER.info("CHECK USER URL ====>   {}",url);
            String json = restTemplate.exchange(EngineServer + url, HttpMethod.GET, entity, String.class).getBody();
            // Map userMap = gson.fromJson(json, Map.class);
            LOGGER.info("information user : {}",json);

            /* Set Role by Stream*/
            CustomUser userTmp = gson.fromJson(json, CustomUser.class);
            // Map roles = (Map)userTmpMap.get("role");
            // CustomUser userTmp = new CustomUser();
            // userTmp.setUsername(userTmpMap.get("username").toString());
            // userTmp.setAccessToken(userTmpMap.get("password").toString());
            // userTmp.setPassword(userTmpMap.get("password").toString());
            // userTmp.setRoles(roles.get("name").toString());
            return userTmp;

        }catch(Exception e){
            throw new RuntimeException(e);
        }

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
