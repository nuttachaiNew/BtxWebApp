package com.spt.app.spring.logback;

import com.spt.app.constant.LogbackConstant;

import ch.qos.logback.classic.PatternLayout;
import ch.qos.logback.classic.html.HTMLLayout;

public class HtmlPatternLayoutWithUserContext extends HTMLLayout {
    static {
        PatternLayout.defaultConverterMap.put("user", UserConverter.class.getName());
        PatternLayout.defaultConverterMap.put("session", SessionConverter.class.getName());
        PatternLayout.defaultConverterMap.put("warname", AppNameConverter.class.getName());
        
        
    }
}
