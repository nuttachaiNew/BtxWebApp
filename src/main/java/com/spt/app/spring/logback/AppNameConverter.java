package com.spt.app.spring.logback;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.spt.app.constant.LogbackConstant;

import ch.qos.logback.classic.pattern.ClassicConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;

public class AppNameConverter extends ClassicConverter {
    @Override
    public String convert(ILoggingEvent event) {
       return LogbackConstant.WAR_NAME;
    }
}
