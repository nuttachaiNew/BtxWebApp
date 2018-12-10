package com.spt.app.service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.spt.app.spring.security.GrantedAuthorityTypeAdaptor;


public abstract class  AbstractEmailService {
	protected static Logger LOGGER = LoggerFactory.getLogger(AbstractEmailService.class);

	protected String EmailServer = "localhost:8080/Email/rest";
    protected static Properties connectProperties = null;

    protected String webServicesString = "";
    protected String resultString = "";

    protected RestTemplate restTemplate = new RestTemplate();
    protected JsonParser parser = new JsonParser();

    JsonSerializer<Date> ser = new JsonSerializer<Date>() {
        public JsonElement serialize(Date src, Type typeOfSrc,
                                     JsonSerializationContext context) {
            return src == null ? null : new JsonPrimitive(src.getTime());
        }
    };
    
    JsonDeserializer<Date> deser = new JsonDeserializer<Date>() {
        public Date deserialize(JsonElement json, Type typeOfT,
                                JsonDeserializationContext context) throws JsonParseException {
            return json == null ? null : new Date(json.getAsLong());
        }
    };

    protected Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm").registerTypeAdapter(Date.class, deser).create();

    static {
        Resource resource = new ClassPathResource("/server.properties");
        try{
            connectProperties = PropertiesLoaderUtils.loadProperties(resource);

        } catch (IOException e){
            LOGGER.error("Error : {}", e);
        }

    }
    
    public AbstractEmailService(){
        this.EmailServer  = connectProperties.getProperty("EmailServer");
    }
    
    public String getWebServicesString() {
        return webServicesString;
    }
    
    public AbstractEmailService setWebServicesString(String webServicesString) {
        this.webServicesString = webServicesString;
        return this;
    }
    
    public String getResultString() {
        LOGGER.debug("request :{}",getWebServicesString());
        resultString  = restTemplate.getForObject(getWebServicesString(), String.class);
        return resultString;
    }
    
    public String getResultString(String url) {
        LOGGER.debug("request :{}",url);
        resultString  = restTemplate.getForObject(url, String.class);
        return resultString;
    }
    
    
    
}
