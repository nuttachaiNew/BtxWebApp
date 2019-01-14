<?xml version="1.0" encoding="UTF-8"?>
<!-- configuration file for LogBack (slf4J implementation)
See here for more details: http://gordondickens.com/wordpress/2013/03/27/sawing-through-the-java-loggers/ -->
<configuration>
  <!-- always a good activate OnConsoleStatusListener -->
  <statusListener class="ch.qos.logback.core.status.OnConsoleStatusListener" />  

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%h %l %u %user %date "%r" %s %b</pattern>
    </encoder>
  </appender>

  <appender-ref ref="STDOUT" />
</configuration>