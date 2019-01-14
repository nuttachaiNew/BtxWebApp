package com.spt.app.service.impl;

import java.util.Arrays;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.spt.app.service.AbstractEngineService;
import com.spt.app.service.BaseCommonService;
import com.spt.app.service.RoleService;

@Service("RoleService")
public class RoleServiceImpl extends AbstractEngineService implements BaseCommonService,RoleService {

	static final Logger LOGGER = LoggerFactory.getLogger(RoleServiceImpl.class);
	
	@Override
	public ResponseEntity<String> findByCriteria(Map<String, Object> objectMap) {
		// TODO Auto-generated method stub
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        String queryString = "";
        if(objectMap.get("queryString") != null){
        	queryString = String.valueOf(objectMap.get("queryString"));
        }
        
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        String method = "findByRoleNameIgnoreCaseContaining";
        String url = "/roles/search/"+method+"?sort=id,desc&"+queryString;
        return getResultString(url,entity);
	}

	@Override
	public ResponseEntity<String> findSize(Map<String, Object> objectMap) {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        String queryString = "";
        if(objectMap.get("queryString") != null){
        	queryString = String.valueOf(objectMap.get("queryString"));
        }
        
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        String method = "findByRoleNameIgnoreCaseContaining";
        String url = "/roles/search/"+method+"?page=0&size=1&"+queryString;
        
        LOGGER.info("url="+url);
        return getResultString(url,entity);
	}

	@Override
	public ResponseEntity<String> save(Map parameter) {
		String url = "/roles";
		return postWithJson(parameter, HttpMethod.POST, url);
	}

	@Override
	public ResponseEntity<String> delete(Long id) {
		String url = "/roles/"+id;
		return deleteSend(HttpMethod.DELETE, url);
	}

	@Override
	public ResponseEntity<String> get(Long id) {
		String url = "/roles/"+id;
		return getResultStringByTypeHttpMethodAndBodyContent(HttpMethod.GET,url);
	}

	@Override
	public ResponseEntity<String> load() {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        String url = "/roles";
        
        LOGGER.info("url="+url);
        return getResultString(url,entity);
	}

	@Override
	public ResponseEntity<String> savePut(Long id,Map parameter) {
		String url = "/roles/"+id;
		return putWithJson(parameter, HttpMethod.PUT, url);
	}


	@Override
	@Autowired
	public void setRestTemplate(RestTemplate restTemplate) {
		super.restTemplate = restTemplate;
	}

	@Override
	public ResponseEntity<String> findByRoleName(String roleName) {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Content-Type", "application/json; charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        String method = "findByRoleName";
        String url = "/roles/search/"+method+"?roleName="+roleName;
        return getResultString(url,entity);
	}

	@Override
	public ResponseEntity<String> findUserByRole(Long id) {
		String url = "/roles/"+id+"/user";
		return getResultStringByTypeHttpMethodAndBodyContent(HttpMethod.GET,url);
	}

	@Override
	public ResponseEntity<String> findAllRole() {
		String url = "/rolecustom/allrole";
		return getResultStringByTypeHttpMethodAndBodyContent(HttpMethod.GET,url);
	}

	public ResponseEntity<String> findRoleByCodeOrMenuLike(String code, String menu, Integer first, Integer max) {
		String method = "/role/findRoleByCodeOrMenuLike";
		String url = method + "?" + "code="+code+"&menu="+menu+"&firstResult="+first+"&maxResult="+max;
		return getResultStringAndSetUser(url);
	}

	public ResponseEntity<String> findRoleByCodeOrMenuLikeSize(String code, String menu) {
		String method = "/role/findRoleByCodeOrMenuLikeSize";
		String url = method + "?" + "code="+code+"&menu="+menu;
		return getResultStringAndSetUser(url);
	}

	public ResponseEntity<String> saveMenuRole(String json) {
		String method = "/role/saveMenuRole";
		String url = method;
		return postWithStringJson(json,HttpMethod.PUT,url);
	}

	public ResponseEntity<String> updateMenuRole(String json) {
		String method = "/role/updateMenuRole";
		String url = method;
		return postWithStringJson(json,HttpMethod.PUT,url);
	}

	public ResponseEntity<String> findAllRoles() {
		String method = "/role/findAllRole";
		String url = method;
		return getResultStringAndSetUser(url);
	}

	public ResponseEntity<String> getRole(Long id) {
		String method = "/role/getRole";
		String url = method + "?" + "id="+id;
		return getResultStringAndSetUser(url);
	}

	public ResponseEntity<String> deleteRole(String json) {
		String method = "/role/deleteRole";
		String url = method;
		return postWithStringJson(json,HttpMethod.PUT,url);
	}


}
