package com.spt.app.service.impl;

import java.util.Arrays;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.spt.app.service.AbstractEngineService;
import com.spt.app.service.BaseCommonService;
import com.spt.app.service.PositionService;

@Service("PositionService")
public class PositionServiceImpl extends AbstractEngineService implements PositionService {

	static final Logger LOGGER = LoggerFactory.getLogger(PositionService.class);
	
	@Override
	@Autowired
	public void setRestTemplate(RestTemplate restTemplate) {
		super.restTemplate = restTemplate;
	}


	@Override
	public ResponseEntity<String> findAllPosition() {
			String url = "/api/roles/findAllRole";
	        return getResultStringAndSetUser(url);
	}

	@Override
	public ResponseEntity<String> insertPosition(String json){
        try{
			String url = "/api/roles/save";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> updatePosition(String json){
        try{
			String url = "/api/roles/update";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> deletePosition(String json){
        try{
			String url = "/api/roles/delete";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}
}
