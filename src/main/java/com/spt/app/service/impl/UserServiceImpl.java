package com.spt.app.service.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spt.app.service.AbstractEngineService;
import com.spt.app.service.BaseCommonService;
import com.spt.app.service.UserService;

@Service("UserService")
public class UserServiceImpl extends AbstractEngineService implements BaseCommonService ,UserService{

	static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Override
	public ResponseEntity<String> findByCriteria(Map<String, Object> objectMap) {
		// TODO Auto-generated method stub
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        String queryString = "";
        if(objectMap.get("queryString") != null){
        	queryString = String.valueOf(objectMap.get("queryString"));
        	try {
				queryString = URLDecoder.decode(queryString, "UTF-8");
			} catch (UnsupportedEncodingException e) { e.printStackTrace(); }
        	//queryString = queryString.replaceAll("%2C", ",");
        }
        
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
//        String method = "findByUsernameIgnoreCaseContainingAndFullNameIgnoreCaseContainingAndRolesIn";
		String method = "findByUsernameIgnoreCaseContainingAndFullNameEngIgnoreCaseContainingOrFullNameLocalIgnoreCaseContainingAndRolesIn";
        String url = "/users/search/"+method+"?sort=id,desc&"+queryString;
        return getResultString(url,entity);
	}

	@Override
	public ResponseEntity<String> findSize(Map<String, Object> objectMap) {
		// TODO Auto-generated method stub
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        String queryString = "";
        if(objectMap.get("queryString") != null){
        	queryString = String.valueOf(objectMap.get("queryString"));
        	try {
				queryString = URLDecoder.decode(queryString, "UTF-8");
			} catch (UnsupportedEncodingException e) { e.printStackTrace(); }
        	//queryString = queryString.replaceAll("%2C", ",");
        }
        
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
//        String method = "findByUsernameIgnoreCaseContainingAndFullNameIgnoreCaseContainingAndRolesIn";
		String method = "findByUsernameIgnoreCaseContainingAndFullNameEngIgnoreCaseContainingOrFullNameLocalIgnoreCaseContainingAndRolesIn";
        String url = "/users/search/"+method+"?page=0&size=1&"+queryString;
        
        LOGGER.info("url="+url);
        return getResultString(url,entity);
	}

	@Override
	public ResponseEntity<String> save(Map parameter) {
		// TODO Auto-generated method stub
		String url = "/users";
		return postWithJson(parameter, HttpMethod.POST, url);
	}

	@Override
	public ResponseEntity<String> delete(Long id) {
		// TODO Auto-generated method stub
		String url = "/users/"+id;
		return deleteSend(HttpMethod.DELETE, url);
	}

	@Override
	public ResponseEntity<String> get(Long id) {
		// TODO Auto-generated method stub
		String url = "/user/findById?id="+id;
		return getResultStringByTypeHttpMethodAndBodyContent(HttpMethod.GET,url);
	}

	@Override
	public ResponseEntity<String> load() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<String> findByUsername(String username) {
		        String url = "/api/users/findUserByUserName?username="+username;
		        return getResultStringAndSetUser(url);
	}

	@Override
	public ResponseEntity<String> getImage(String username) {
		        String url = "/files/getImageUser?username="+username;
		        return getResultStringAndSetUser(url);
	}

	@Override
	public ResponseEntity<String> savePut(Long id,Map parameter) {
		// TODO Auto-generated method stub
		String url = "/users/"+id;
		return putWithJson(parameter, HttpMethod.PUT, url);
	}

	@Override
	public ResponseEntity<String> putRole(Long id,List<String> associateIdLs) {
		// TODO Auto-generated method stub
		String url = "/users/"+id;
		String associatePath = "/roles";
		return putAssociate(associateIdLs,url,associatePath);
	}
	

	@Override
	@Autowired
	public void setRestTemplate(RestTemplate restTemplate) {
		// TODO Auto-generated method stub
		super.restTemplate = restTemplate;
	}

	@Override
	public ResponseEntity<String> uploadFile(String base64,String fileName) {//MultipartFile file
		// TODO Auto-generated method stub
		return uploadFile(base64,fileName,"/imageUpload");
	}

	@Override
	public ResponseEntity<Resource> loadImage(Long id) {
		// TODO Auto-generated method stub
		
		
		return loadReqource("/files/"+DigestUtils.md5Hex(""+id));
	}

	@Override
	public ResponseEntity<String> deleteRole(Long id, List<String> associateIdLs) {
		// TODO Auto-generated method stub
		String url = "/users/"+id;
		String associatePath = "/roles/";
		return deleteAssociate(associateIdLs,url,associatePath);
	}

	@Override
	public ResponseEntity<String> deleteAllRole(Long id) {
		// TODO Auto-generated method stub
		String url = "/users/"+id;
		String associatePath = "/roles";
		return deleteAllAssociate(url,associatePath);
	}

	public ResponseEntity<String> findUserByUserLike(String user, Integer first, Integer max) {
		String method = "/user/findUserByUserLike";
		String url = method + "?" + "user="+user+"&firstResult="+first+"&maxResult="+max;
		return getResultStringAndSetUser(url);
	}

	public ResponseEntity<String> findUserByUserLikeSize(String user) {
		String method = "/user/findUserByUserLikeSize";
		String url = method + "?" + "user="+user;
		return getResultStringAndSetUser(url);
	}

	public ResponseEntity<String> saveUser(String json) {
		String method = "/user/saveUser";
		String url = method;
		return postWithStringJson(json,null,url);
	}

	public ResponseEntity<String> updateUser(String json) {
		String method = "/user/updateUser";
		String url = method;
		return postWithStringJson(json,null,url);
	}

	public ResponseEntity<String> findAllUser() {
		String method = "/api/users/findAllUser";
		String url = method;
		return getResultStringAndSetUser(url);
	}

	
	public ResponseEntity<String> editProfile(MultipartHttpServletRequest multipartHttpServletRequest) {
		// return null;
		String method = "/api/users/updateProfileWeb";
		String url = method;
		return uploadFile(multipartHttpServletRequest,url);
	}


	@Override
	public ResponseEntity<String> insertAppuser(String json){
        try{
			String url = "/api/users/save";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

	@Override
	public ResponseEntity<String> updateAppUser(String json){
        try{
			String url = "/api/users/update";
            return postWithStringJson(json, HttpMethod.POST, url);
        }catch(Exception e){
			e.printStackTrace();
        	throw new RuntimeException(e.getMessage());
        }
	}

}
