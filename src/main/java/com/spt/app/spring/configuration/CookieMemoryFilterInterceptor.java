package com.spt.app.spring.configuration;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.spt.app.util.SerializeUtil;

public class CookieMemoryFilterInterceptor extends HandlerInterceptorAdapter{

	static final Logger LOGGER = LoggerFactory.getLogger(CookieMemoryFilterInterceptor.class);
	

	public void postHandle( HttpServletRequest request, HttpServletResponse response,  Object handler,  ModelAndView modelAndView) throws Exception  {
		
		
		 if (modelAndView != null && modelAndView.getModelMap() != null) {
			 HandlerMethod hm = (HandlerMethod)handler; 
			 String controllerName  = hm.getBeanType().getSimpleName().replace("Controller", "").toLowerCase();
			 String code  = request.getParameter("code");
			 
			 String[] getMapping = hm.getMethod().getAnnotation(GetMapping.class).value();
			 
			 if(getMapping!=null && getMapping.length >= 1 && getMapping[0].contains("listView")){
				 String cookieName = controllerName+"-search-filter";
					 if(code!=null && code.trim().length() > 0){
						 cookieName = controllerName+"_"+code+"-search-filter";
					 }
					 
					for(Cookie cookie:request.getCookies()){
						if(cookie.getName().equals(cookieName)){
							Map<String,String[]> criteria = SerializeUtil.streamToMap(cookie.getValue().getBytes());
							LOGGER.info("criteria="+criteria);
							for(String key:criteria.keySet()){
								String[] value = criteria.get(key);
								LOGGER.info("criteria_"+key+"="+value[0]);
								modelAndView.getModelMap().addAttribute("criteria_"+key, value[0]);
							}
						}
					}
			 }
		 }
		
	}

}
