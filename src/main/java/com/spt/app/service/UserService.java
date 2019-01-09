package com.spt.app.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface UserService {
	
	public ResponseEntity<String>   findByUsername(String username);
	public ResponseEntity<String>   putRole(Long id,List<String> associateIdLs);
	public ResponseEntity<String>   deleteRole(Long id,List<String> associateIdLs);
	public ResponseEntity<String>   uploadFile(String base64,String fileName);
	public ResponseEntity<Resource> loadImage(Long id);
	public ResponseEntity<String>   deleteAllRole(Long id);
	public ResponseEntity<String>   findUserByUserLike(String user, Integer first, Integer max);
	public ResponseEntity<String>   findUserByUserLikeSize(String user);
	public ResponseEntity<String>   saveUser(String json);
	public ResponseEntity<String>   updateUser(String json);
	public ResponseEntity<String> findAllUser();
	public ResponseEntity<String> editProfile(MultipartHttpServletRequest multipartHttpServletRequest);
	public ResponseEntity<String>   getImage(String username);
	

	public ResponseEntity<String>   insertAppuser(String username);
	public ResponseEntity<String>   updateAppUser(String username);

}
