package com.spt.app.spring.logback;

import java.util.function.Consumer;

import javax.annotation.PostConstruct;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.ExecutorSubscribableChannel;
import org.springframework.stereotype.Component;

import com.spt.app.spring.websocket.Message;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.AppenderBase;

@Component
public class SockJsAppender extends AppenderBase<ILoggingEvent> {

	@Autowired
	private SimpMessagingTemplate messageSender;

	@Override
	protected void append(ILoggingEvent event) {
		LogMessage message = new LogMessage();
		message.setMessage(event.getLevel()+" " +event.getLoggerName()+" "+ event.getMessage());
		
		
		messageSender.convertAndSend("/topic/log/messages", message);
	}
	
	@PostConstruct
    public void init() {
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        Logger logger = context.getLoggerList().get(0);
        logger.addAppender(SockJsAppender.this);
        setContext(context);
        start();
    }
	
	
}
