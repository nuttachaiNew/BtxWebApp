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
import com.spt.app.service.CaseManagementService;
import java.util.Arrays;

@Service("CaseManagementService")
public class CaseManagementServiceImpl extends AbstractEngineService implements CaseManagementService {

	static final Logger LOGGER = LoggerFactory.getLogger(CaseManagementServiceImpl.class);

		
		@Override
		@Autowired
		public void setRestTemplate(RestTemplate restTemplate) {
			// TODO Auto-generated method stub
			super.restTemplate = restTemplate;
		}


		public ResponseEntity<String> findCaseByParameter(String json){
			try{
				LOGGER.debug("findCaseByParameter :{}",json);
				String url = "/api/case/findCaseByParameter"+json;
	       		return getResultStringAndSetUser(url);
			}catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
			}
		}

}
