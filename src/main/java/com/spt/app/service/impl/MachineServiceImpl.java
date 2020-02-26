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
import com.spt.app.service.MachineService;

@Service("MachineService")
public class MachineServiceImpl extends AbstractEngineService implements MachineService {

	static final Logger LOGGER = LoggerFactory.getLogger(MachineService.class);
	
	@Override
	@Autowired
	public void setRestTemplate(RestTemplate restTemplate) {
		super.restTemplate = restTemplate;
	}


	@Override
	public ResponseEntity<String> findAllMachine() {
			String url = "/api/machines/findAllMachine";
	        return getResultStringAndSetUser(url);
	}

	@Override
	public ResponseEntity<String> findById(Long id) {
			String url = "/api/machines/findById?id="+id;
	        return getResultStringAndSetUser(url);
	}

	@Override
	public ResponseEntity<String> insert(String json){
        try{
			String url = "/api/machines/insert";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> insertList(String json){
        try{
			String url = "/api/machines/insertList";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> update(String json){
        try{
			String url = "/api/machines/update";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

}
