package com.spt.app.spring.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UrlAuthorizationInterceptor extends HandlerInterceptorAdapter{

	static final Logger LOGGER = LoggerFactory.getLogger(UrlAuthorizationInterceptor.class);
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,  Object handler) throws Exception  {
		
//		try {
//			String requestUrl = request.getRequestURI().replaceFirst(request.getContextPath(), "")+"/";
//			if(!requestUrl.startsWith("/")){
//				requestUrl += "/";
//			}
//
//			requestUrl = requestUrl.substring(requestUrl.indexOf("/")+1, requestUrl.indexOf("/", requestUrl.indexOf("/")+1));
//
//			String user = ""+SecurityContextHolder.getContext().getAuthentication().getName();
//			LOGGER.info("user :{} access requestUrl :{}",user,requestUrl);
//			Map menu_authorize = (Map) request.getSession().getAttribute("menu_authorize");
//			if(requestUrl.trim().length() > 0 && menu_authorize.get(requestUrl)==null){
//				response.sendRedirect(request.getContextPath()+"/Access_Denied");
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
		
		return true;
	}
	
}
