package com.spt.app.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

/**
 * Created by nancom on 3/21/17.
 */
@Component
@Aspect
public class AccessLoggingAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(AccessLoggingAspect.class);

    private static final String[] HEADERS_TO_TRY = {
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR" };

    @Pointcut("execution(* com.spt.app.controller.general.*.*(..))")
    private void executeControllerPointCut() {
    }

    @Pointcut("execution(* com.spt.app.service.UserAuthorizationService.getUserDetail(..))")
    private void loginSuccessPointCut() {
    }

    @Before("loginSuccessPointCut()")
    public void doBeforeGetUserDetailTask(JoinPoint joinPoint) throws Exception {
        String accessIPAddress = "x.x.x.x";
        String userName = "anonymous";
        try {
            userName = ""+joinPoint.getArgs()[0];
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            accessIPAddress = this.getClientIP(request);
            LOGGER.info("-= USER:{}#{} Login Success =-",userName,accessIPAddress);

        }catch(Exception e){
            e.printStackTrace();
            LOGGER.error("-= Error :{} =-",e.getMessage());
        }
    }

    @Before("executeControllerPointCut()")
    public void doBeforeTask(JoinPoint joinPoint) throws Exception {
        //LOGGER.info("execute [{}]-[{}]-[{}]",joinPoint.getSignature().getDeclaringType(), joinPoint.getSignature().getName(), Arrays.asList(((MethodSignature) joinPoint.getSignature()).getParameterNames()));
        String accessIPAddress = "x.x.x.x";
        String userName = "anonymous";
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            accessIPAddress = this.getClientIP(request);
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            userName = auth.getName(); //get logged in username

        }catch(Exception e){
            LOGGER.error("-= Error :{} =-",e.getMessage());
        }finally {
            LOGGER.info("request user :{} ip: {} execute : {} method : {} {}", userName,accessIPAddress,joinPoint.getSignature().getDeclaringType(),joinPoint.getSignature().getName(), Arrays.asList(((MethodSignature) joinPoint.getSignature()).getParameterNames()));
        }
    }

    private String getClientIP(HttpServletRequest request) {
        try {
            for (String header : HEADERS_TO_TRY) {
                String ip = request.getHeader(header);
                if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                    return ip;
                }
            }
        } catch(Exception e) {
            return request.getRemoteAddr();
        }

        return request.getRemoteAddr();
    }



}
