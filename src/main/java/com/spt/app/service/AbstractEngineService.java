package com.spt.app.service;

import com.google.gson.*;
import com.spt.app.spring.security.GrantedAuthorityTypeAdaptor;
import com.spt.app.util.ConstantVariableUtil;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.http.*;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.*;


public abstract class  AbstractEngineService {
	protected static Logger LOGGER = LoggerFactory.getLogger(AbstractEngineService.class);

	protected String EngineServer = "localhost:8080/Engine/rest";
    protected static Properties connectProperties = null;
    private static  String tokenUrl = "http://58.181.168.159:8081/getToken";

    protected String webServicesString = "";
    protected String resultString = "";

    protected RestTemplate restTemplate;
    
    public abstract void setRestTemplate(RestTemplate restTemplate);

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

    protected Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm").registerTypeAdapter(Date.class, deser).registerTypeAdapter(GrantedAuthority.class, new GrantedAuthorityTypeAdaptor()).create();

    static {
        Resource resource = new ClassPathResource("/server.properties");
        try{
            connectProperties = PropertiesLoaderUtils.loadProperties(resource);

        } catch (IOException e){
            LOGGER.error("Error : {}", e);
        }

    }

    public AbstractEngineService(){
        this.EngineServer  = connectProperties.getProperty("EngineServer");
    }
    
    public String getWebServicesString() {
        return webServicesString;
    }
    
    public AbstractEngineService setWebServicesString(String webServicesString) {
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
    
    public ResponseEntity<String> getResultString(String urlParam,HttpEntity<String> entitys) {
    	String url = this.EngineServer +urlParam;
        LOGGER.info(" request :{}",url);
        return restTemplate.exchange(url, HttpMethod.GET, entitys, String.class);
    }

    public ResponseEntity<String> getResultStringAndSetUser(String urlParam) {

        String url = this.EngineServer +urlParam;
        LOGGER.info(" request :{}",url);
        try{
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
            headers.add("Content-Type", "application/json; charset=utf-8");
            HttpEntity<String> entity = new HttpEntity<String>("", headers);
            String token = restTemplate.exchange(tokenUrl, HttpMethod.GET, entity, String.class).getBody();
            LOGGER.debug("token : {}",token.replace("\"", ""));
            headers.add("Authorization", "Bearer " + token.replace("\"", ""));
            entity = new HttpEntity<String>("", headers);
            LOGGER.info("=============ABSTRACT ENGINE============= {}",restTemplate);
            return restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public byte[] printReport(String urlParam){
        String url = this.EngineServer +urlParam;
        LOGGER.info(" request :{}",url);
        try{
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
            headers.add("Content-Type", "application/json; charset=utf-8");
            HttpEntity<String> entity = new HttpEntity<String>("", headers);
            ResponseEntity<byte[]> reponseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, byte[].class);
            return reponseEntity.getBody();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public byte[] printReportWithPost(String json,HttpMethod httpMethod,String urlParam) {
        String url = this.EngineServer +urlParam;
        LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("application","json", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.add(ConstantVariableUtil.USER_NAME, SecurityContextHolder.getContext().getAuthentication().getName());

        HttpEntity<String> entity = new HttpEntity<String>(json, headers);

        // LOGGER.info("entity :{}", entity);
        if(httpMethod==null){
            httpMethod = HttpMethod.POST;
        }

        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));

        restTemplate.getMessageConverters().add(converter);
        ResponseEntity<byte[]> responseEntity = restTemplate.postForEntity(url, entity,  byte[].class);

        return responseEntity.getBody();
    }

    public ResponseEntity<String> putWithJsonAndSetUser(String json,String urlParam) {
        String url = this.EngineServer +urlParam;
        LOGGER.info(" request :{}",url);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");
        headers.add(ConstantVariableUtil.USER_NAME, SecurityContextHolder.getContext().getAuthentication().getName());
        HttpEntity<String> entity = new HttpEntity<String>(json, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
        return responseEntity;
    }
    
    public ResponseEntity<String> getResultByExchange(String urlParam) {
    	HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<String>("", headers);
    	String url = this.EngineServer +urlParam;
        LOGGER.info(" request :{}",url);
        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    }
    
    public ResponseEntity<String> getResultStringByTypeHttpMethodAndBodyContent(String json,HttpMethod httpMethod,String url,RestTemplate restTemplate) {
        LOGGER.debug("url :{}", url);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<String>(json, headers);
        if(httpMethod==null){
            httpMethod = HttpMethod.GET;
        }
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, entity, String.class);
        return responseEntity;
    }
    
    public ResponseEntity<String> getResultStringByTypeHttpMethodAndBodyContent(HttpMethod httpMethod,String urlParam) {
    	String url = this.EngineServer +urlParam;
        LOGGER.info("url :{}", url);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");


        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        if(httpMethod==null){
            httpMethod = HttpMethod.GET;
        }
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, entity, String.class);
        return responseEntity;
    }
    
    public ResponseEntity<String> postWithMapParameter(Map<String, String[]> parameterMap,HttpMethod httpMethod,String urlParam) {
    	String url = this.EngineServer +urlParam;
    	LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("application","x-www-form-urlencoded", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<String, String>();  
        if(parameterMap!=null){
        	for(String key:parameterMap.keySet()){
        		if(!"parentId".equals(key) && !"_csrf".equals(key)){
        				body.add(key, parameterMap.get(key)[0]);
        			
        		}
        		
        		
        	}
        }


        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<MultiValueMap<String, String>>(body, headers);
        if(httpMethod==null){
            httpMethod = HttpMethod.POST;
        }
        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, entity, String.class);
        return responseEntity;
    }
    
    public ResponseEntity<String> postWithJson(Map<String, String[]> parameterMap,HttpMethod httpMethod,String urlParam) {
    	String url = this.EngineServer +urlParam;
    	LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("application","json", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.add(ConstantVariableUtil.USER_NAME, SecurityContextHolder.getContext().getAuthentication().getName());

        Map<String, String> body = new HashMap<String, String>();  
        if(parameterMap!=null){
        	for(String key:parameterMap.keySet()){
        		if(!"parentId".equals(key) && !"_csrf".equals(key)){
        			body.put(key, parameterMap.get(key)[0]);
        			
        		}
        		
        		
        	}
        }


        HttpEntity<String> entity = new HttpEntity<String>(gson.toJson(body), headers);

        LOGGER.info("entity :{}", entity);
        if(httpMethod==null){
            httpMethod = HttpMethod.POST;
        }
        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, entity, String.class);
        
        return responseEntity;
    }

     public ResponseEntity<String> postWithStringJson(String json,HttpMethod httpMethod,String urlParam) {
        String url = this.EngineServer +urlParam;
        LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("application","json", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        String token = restTemplate.exchange(tokenUrl, HttpMethod.GET, entity, String.class).getBody();
        LOGGER.debug("token : {}",token.replace("\"", ""));
        headers.add("Authorization", "Bearer " + token.replace("\"", ""));
        entity = new HttpEntity<String>("", headers);

       entity = new HttpEntity<String>(json, headers);

        LOGGER.info("entity :{}", entity);
        if(httpMethod==null){
            httpMethod = HttpMethod.POST;
        }
        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, entity, String.class);
        
        return responseEntity;
    }

    public ResponseEntity<String> putWithJson(Map<String, String[]> parameterMap,HttpMethod httpMethod,String urlParam) {
    	String url = this.EngineServer +urlParam;
    	LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("application","json", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        Map<String, String> body = new HashMap<String, String>();  
        if(parameterMap!=null){
        	for(String key:parameterMap.keySet()){
        		body.put(key, parameterMap.get(key)[0]);
        	}
        }


        HttpEntity<String> entity = new HttpEntity<String>(gson.toJson(body), headers);

        LOGGER.info("entity :{}", entity);
        if(httpMethod==null){
            httpMethod = HttpMethod.PUT;
        }
        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        //restTemplate.put(url, entity, String.class);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, entity, String.class);
        
        return new ResponseEntity(responseEntity.getBody(), HttpStatus.OK);
    }
    
    public ResponseEntity<String> putAssociate(List<String> associateIdLs,String urlParam,String associatePath) {
    	String url = this.EngineServer +urlParam+associatePath;
    	LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("text","uri-list", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        String content = "";
        if(associateIdLs!=null) for(String id:associateIdLs){
        	content += this.EngineServer + associatePath+"/"+id+"\n";
        }
        
        
        HttpEntity<String> entity = new HttpEntity<String>(content, headers);

        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        LOGGER.info("entity :{}", restTemplate);
        restTemplate.put(url, entity, String.class);
        
        return new ResponseEntity("", HttpStatus.OK);
    }
    

    
    public ResponseEntity<String> putParent(List<String> associateIdLs,String urlParam,String associatePath) {
    	String url = this.EngineServer +urlParam+associatePath;
    	LOGGER.info("putParent url :{}", url);

        MediaType mediaType = new MediaType("text","uri-list", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        String content = "";
        if(associateIdLs!=null) for(String id:associateIdLs){
        	content += this.EngineServer + associatePath+"/"+id;
        }
        
        
        HttpEntity<String> entity = new HttpEntity<String>(content, headers);

        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        LOGGER.info("entity :{}", restTemplate);
        restTemplate.put(url, entity, String.class);
        
        return new ResponseEntity("", HttpStatus.OK);
    }
    
    public ResponseEntity<String> deleteSend(HttpMethod httpMethod,String urlParam) {
    	String url = this.EngineServer +urlParam;
    	LOGGER.info("url :{}", url);

        HttpHeaders headers = new HttpHeaders();

        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);
        // restTemplate.delete(url);
        return response;
    }
    
    public ResponseEntity<String> uploadFile(MultipartHttpServletRequest multipartHttpServletRequest,String urlParam) {


    	String url = this.EngineServer +urlParam;
    	LOGGER.info("url :{}", url);

    	ResponseEntity<String> responseEntity;
		try {

            HttpHeaders header = new HttpHeaders();
            header.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
            header.add("Content-Type", "application/json; charset=utf-8");
            HttpEntity<String> entitys = new HttpEntity<String>("", header);
            String token = restTemplate.exchange(tokenUrl, HttpMethod.GET, entitys, String.class).getBody();
            LOGGER.debug("token : {}",token.replace("\"", ""));

			MultipartFile multipathFile = multipartHttpServletRequest.getFile("image");
			String json =  multipartHttpServletRequest.getParameter("json");
        	File convFile = new File(multipathFile.getOriginalFilename());
			multipathFile.transferTo(convFile);
			MediaType mediaType = MediaType.MULTIPART_FORM_DATA;
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(mediaType);
            headers.add("Authorization", "Bearer " + token.replace("\"", ""));
			MultiValueMap<String, Object> body = new LinkedMultiValueMap<String, Object>();  
			FileSystemResource file = new FileSystemResource(convFile);
			body.add("file", file);
            LOGGER.debug("json : {}",json);
			body.add("json",json);

			HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<MultiValueMap<String, Object>>(body, headers);
			
			FormHttpMessageConverter converter = new FormHttpMessageConverter();
			converter.setSupportedMediaTypes(Arrays.asList(mediaType));
			restTemplate.getMessageConverters().add(converter);
			responseEntity = restTemplate.postForEntity(url, entity, String.class);
			 convFile.delete();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseEntity = new ResponseEntity("ERROR", HttpStatus.OK);
		}
        
        return responseEntity;
    }
    
    public ResponseEntity<String> uploadFile(String base64,String fileName,String urlParam) {
    	String url = this.EngineServer +urlParam;
    	LOGGER.info("url :{}", url);

    	ResponseEntity<String> responseEntity;
		try {
			MediaType mediaType = MediaType.MULTIPART_FORM_DATA;
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(mediaType);

			
			MultiValueMap<String, Object> body = new LinkedMultiValueMap<String, Object>();  

			body.add("file", base64);
			body.add("filename", fileName);


			HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<MultiValueMap<String, Object>>(body, headers);
			
			FormHttpMessageConverter converter = new FormHttpMessageConverter();
			converter.setSupportedMediaTypes(Arrays.asList(mediaType));
			
			restTemplate.getMessageConverters().add(converter);
            responseEntity = restTemplate.postForEntity(url, entity, String.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseEntity = new ResponseEntity("ERROR", HttpStatus.OK);
		}
        
        return responseEntity;
    }
    

    
    public ResponseEntity<Resource> loadReqource(String urlParam) {
    	String url = this.EngineServer +urlParam;
        LOGGER.info("url :{}", url);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");



        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        ResponseEntity<Resource> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, Resource.class);
        return responseEntity;
    }
    
    public ResponseEntity<String> deleteAssociate(List<String> associateIdLs,String urlParam,String associatePath) {
    	String url = this.EngineServer +urlParam+associatePath;
    	LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("text","uri-list", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        String content = "";
        
        
        
        HttpEntity<String> entity = new HttpEntity<String>("", headers);

        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        LOGGER.info("entity :{}", restTemplate);
        if(associateIdLs!=null) for(String id:associateIdLs){
        	restTemplate.delete(url+id, entity, String.class);
        }
        
        return new ResponseEntity("", HttpStatus.OK);
    }
    

    
    public ResponseEntity<String> deleteAllAssociate(String urlParam,String associatePath) {
    	String url = this.EngineServer +urlParam+associatePath;
    	LOGGER.info("url :{}", url);

        MediaType mediaType = new MediaType("text","uri-list", Charset.forName("UTF-8"));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        String content = "";
        
        
        
        HttpEntity<String> entity = new HttpEntity<String>("", headers);

        
        FormHttpMessageConverter converter = new FormHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(mediaType));
        
        restTemplate.getMessageConverters().add(converter);
        LOGGER.info("entity :{}", restTemplate);
        restTemplate.put(url, entity, String.class);
        return new ResponseEntity("", HttpStatus.OK);
    }
    
}
