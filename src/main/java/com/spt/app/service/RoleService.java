package com.spt.app.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface RoleService {
	
	public ResponseEntity<String> findByRoleName(String roleName);
	public ResponseEntity<String> findUserByRole(Long id);
	public ResponseEntity<String> findAllRole();
	public ResponseEntity<String> findRoleByCodeOrMenuLike(String code, String menu, Integer first, Integer max);

	public ResponseEntity<String> findRoleByCodeOrMenuLikeSize(String code,String menu);

	public ResponseEntity<String> saveMenuRole(String json);

	public ResponseEntity<String> updateMenuRole(String json);

	public ResponseEntity<String> findAllRoles();
	public ResponseEntity<String> getRole(Long id);
	public ResponseEntity<String> deleteRole(String roleId);

}
