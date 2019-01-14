package com.spt.app.spring.localstorage;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.spt.app.constant.ApplicationConstant;
import com.spt.app.util.SerializeUtil;


public class CookieLocalStorageInteceptor extends HandlerInterceptorAdapter{

	
	static final Logger LOGGER = LoggerFactory.getLogger(CookieLocalStorageInteceptor.class);
	
	//@Autowired
	//ParameterService parameterService;
	
	SimpleDateFormat sd = new SimpleDateFormat("yyyyMMddhhmmss");

	public void postHandle( HttpServletRequest request, HttpServletResponse response,  Object handler,  ModelAndView modelAndView) throws Exception  {
//		 if (modelAndView != null && modelAndView.getModelMap() != null) {
//			 HandlerMethod hm = (HandlerMethod)handler; 
//				
//			 if(hm.getMethod().getAnnotation(GetMapping.class) !=null){
//				 String[] getMapping = hm.getMethod().getAnnotation(GetMapping.class).value();
//					boolean isFetchData = true;
//					if(getMapping!=null && getMapping.length >= 1){
//						String cookieName = ApplicationConstant.FETCH_PARAMETER_NAME;
//						for(Cookie cookie:request.getCookies()){
//							if(cookie.getName().equals(cookieName) 
//									&& !"".equals(ApplicationConstant.FETCH_FRONTEND_PARAMETER_TIME)
//									&& cookie.getValue().equals(ApplicationConstant.FETCH_FRONTEND_PARAMETER_TIME) ){
//								isFetchData = false;
//								break;
//							}
//						}
//						
//					}
//					
//					if(isFetchData){
//						Cookie cookie = new Cookie(ApplicationConstant.FETCH_PARAMETER_NAME,ApplicationConstant.FETCH_FRONTEND_PARAMETER_TIME);
//						response.addCookie(cookie);
//						modelAndView.getModelMap().addAttribute("PARAMETER_FETCH", parameterService.getAllParameter());
//						
//					}
//			 }
//	     }
	}

}
