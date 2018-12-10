package com.spt.app.spring.configuration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class MemberLinkExcludeLangInterceptor extends HandlerInterceptorAdapter{

	static final Logger LOGGER = LoggerFactory.getLogger(MemberLinkExcludeLangInterceptor.class);
	

	public void postHandle( HttpServletRequest request, HttpServletResponse response,  Object handler,  ModelAndView modelAndView) throws Exception  {
		String queryString = request.getQueryString();
		if(queryString!=null && queryString.length() > 0){
			if(queryString.startsWith("lang")){
				queryString = "?"+queryString;
			}
			
			queryString= queryString.replaceAll("[&?]lang.*?(?=&|\\?|$)", "");
			if(!queryString.startsWith("&")){
				queryString = "&"+queryString;
			}
			
			if(modelAndView != null && modelAndView.getModelMap()!= null ){
				modelAndView.getModelMap().addAttribute("REQUEST_LINK", queryString);
			}
				
		}
		
		
		
	}

}
