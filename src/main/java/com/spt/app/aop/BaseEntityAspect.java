package com.spt.app.aop;

import com.spt.app.spring.security.CustomUserModel;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Component
@Aspect
public class BaseEntityAspect {
    private static final String DEFAULT_STATUS = "Y";

	static final Logger LOGGER = LoggerFactory.getLogger(BaseEntityAspect.class);

    private ThreadLocal<SimpleDateFormat> sdf = new ThreadLocal<SimpleDateFormat>() {
        @Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-mm-dd HH:mm:ss");
        }
    };


    @Pointcut("execution(* com.spt.app.service.**.save*(..))")
    public void stampModelMethods() {
    }


    @Before("stampModelMethods()")
    public void addStandardField(JoinPoint jp) {
        LOGGER.info("-= addStandardField =-");
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            LOGGER.info("user : {}",user.getUsername());

            for (Object arg : jp.getArgs()) {
                if (arg instanceof Map) {
                    Map<String, Object> map = (Map<String, Object>) arg;
                    if (map.get("id") != null && ((String[]) map.get("id"))[0].trim().length() > 0) {
                        map.put("lastUser", new String[]{user.getUsername()});
                        map.put("lastDate", new String[]{String.valueOf(sdf.get().format(new Date()))});
                    } else {
                        map.put("createUser", new String[]{user.getUsername()});
                        map.put("createDate", new String[]{String.valueOf(sdf.get().format(new Date()))});
                        map.put("lastUser", new String[]{user.getUsername()});
                        map.put("lastDate", new String[]{String.valueOf(sdf.get().format(new Date()))});
                        map.put("dataStatus", new String[]{String.valueOf(DEFAULT_STATUS)});

                    }
                }

            }
        }catch(Exception e){
            LOGGER.error(" -= Can not get principal =-");
        }
    }

}
