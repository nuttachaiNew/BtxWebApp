package com.spt.app.service.impl;

import com.spt.app.service.AbstractEngineService;
import com.spt.app.service.BaseCommonService;
import com.spt.app.aop.annotation.Loggable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.spt.app.service.AreaService;
import java.util.Arrays;

@Service("AreaService")
public class AreaServiceImpl extends AbstractEngineService implements AreaService {

	static final Logger LOGGER = LoggerFactory.getLogger(AreaServiceImpl.class);

	@Override
	@Autowired
	public void setRestTemplate(RestTemplate restTemplate) {
		// TODO Auto-generated method stub
		super.restTemplate = restTemplate;
	}


	@Loggable
	@Override
	public ResponseEntity<String> findAllAreas() {
        try{
			String url = "/api/branchs/findAllBranch";
	        return getResultStringAndSetUser(url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> insertArea(String json){
        try{
			String url = "/api/branchs/save";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> updateArea(String json){
        try{
			String url = "/api/branchs/update";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> deleteArea(String json){
        try{
			String url = "/api/branchs/delete";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}


}
