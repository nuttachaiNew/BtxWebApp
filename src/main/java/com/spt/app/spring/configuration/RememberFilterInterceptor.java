package com.spt.app.spring.configuration;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.spt.app.util.SerializeUtil;

public class RememberFilterInterceptor extends HandlerInterceptorAdapter{

	static final Logger LOGGER = LoggerFactory.getLogger(RememberFilterInterceptor.class);
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,  Object handler) throws Exception  {
		
		
		HandlerMethod hm = (HandlerMethod)handler; 
		try {
			String[] getMapping = hm.getMethod().getAnnotation(GetMapping.class).value();
			String code  = request.getParameter("masterdataCode");
			
			 
			
			if(getMapping!=null && getMapping.length >= 1){
				String pageName = hm.getBeanType().getSimpleName().replace("Controller", "").toLowerCase();
				
				String cookieName = pageName+"-search-filter";
				 if(code!=null && code.trim().length() > 0){
					 cookieName = pageName+"_"+code+"-search-filter";
				 }
				 Map<String,String[]> paramMap = new HashMap<String,String[]>();
				 for(String key:request.getParameterMap().keySet()){
					 paramMap.put(key, request.getParameterMap().get(key));
				 }
				Cookie cookie = new Cookie(cookieName,new  String(SerializeUtil.mapToStream(paramMap)));
				response.addCookie(cookie);
			}
		} catch (Exception e) { }
		
		try {
			String[] postMapping = hm.getMethod().getAnnotation(PostMapping.class).value();
			String code  = request.getParameter("masterdataCode");
			
			if(postMapping!=null && postMapping.length >= 1){
				String pageName = hm.getBeanType().getSimpleName().replace("Controller", "").toLowerCase();
				String cookieName = pageName+"-search-filter";
				 if(code!=null && code.trim().length() > 0){
					 cookieName = pageName+"_"+code+"-search-filter";
				 }
				 Map<String,String[]> paramMap = new HashMap<String,String[]>();
				 for(String key:request.getParameterMap().keySet()){
					 paramMap.put(key, request.getParameterMap().get(key));
				 }
				Cookie cookie = new Cookie(cookieName,new  String(SerializeUtil.mapToStream(paramMap)));
				response.addCookie(cookie);
			}
		} catch (Exception e) { }
		
		
		return true;
	}
	
}
