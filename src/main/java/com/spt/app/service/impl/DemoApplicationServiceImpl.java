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
import com.spt.app.service.DemoApplicationService;
import java.util.Arrays;

@Service("DemoApplicationService")
public class DemoApplicationServiceImpl extends AbstractEngineService implements DemoApplicationService {

	static final Logger LOGGER = LoggerFactory.getLogger(DemoApplicationServiceImpl.class);
	
	@Override
	@Autowired
	public void setRestTemplate(RestTemplate restTemplate) {
		// TODO Auto-generated method stub
		super.restTemplate = restTemplate;
	}


	@Loggable
	@Override
	public ResponseEntity<String> listDemoApplicationOrderByParam(String orderBy , String sortBy,Integer firstResult,Integer maxResult) {
        try{
			String url = "/demos/listDemoApplicationOrderByParam?orderBy="+orderBy+"&sortBy="+sortBy+"&firstResult="+(firstResult==null?"": firstResult)+"&maxResult="+(maxResult==null?"":maxResult);
	        return getResultStringAndSetUser(url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Loggable
	@Override
	public ResponseEntity<String> listDemoApplicationOrderByParamSize(String orderBy , String sortBy) {
        try{
			String url = "/demos/listDemoApplicationOrderByParamSize?orderBy="+orderBy+"&sortBy="+sortBy;
	        return getResultStringAndSetUser(url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
    public ResponseEntity<String> deleteDemo(Long id) {
        String url = "/demos/demoDelete/" + id;
        return deleteSend(HttpMethod.DELETE, url);
    }

    @Override
    public ResponseEntity<String> insertDemo(String json){
        String url = "/demos/insertDemo/" ;
        return postWithStringJson(json,HttpMethod.POST, url);
    }



	

	@Loggable
	@Override
	public ResponseEntity<String> listDemoHeaderNamelikeAndmaxSizeAndOrderby(String orderBy , String sortBy,Integer size,String name) {
        try{
			String url = "/demos/listDemoHeaderNamelikeAndmaxSizeAndOrderby?orderBy="+orderBy+"&sortBy="+sortBy+"&size="+size+"&name="+name;
	        return getResultStringAndSetUser(url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}



	@Loggable
	@Override
	public ResponseEntity<String> listDemoApplicationOrderByParamAndKeyword(String keyword,String orderBy , String sortBy,Integer firstResult,Integer maxResult) {
        try{
			String url = "/demos/listDemoApplicationOrderByParamAndKeyword?keyword="+keyword+"&orderBy="+orderBy+"&sortBy="+sortBy+"&firstResult="+(firstResult==null?"": firstResult)+"&maxResult="+(maxResult==null?"":maxResult);
	        return getResultStringAndSetUser(url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Loggable
	@Override
	public ResponseEntity<String> listDemoApplicationOrderByParamSizeKeyword(String keyword,String orderBy , String sortBy) {
        try{
			String url = "/demos/listDemoApplicationOrderByParamSizeAndKeyword?keyword="+keyword+"&orderBy="+orderBy+"&sortBy="+sortBy;
	        return getResultStringAndSetUser(url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

}
