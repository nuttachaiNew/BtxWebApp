package com.spt.app.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface MachineService {
		public ResponseEntity<String> findAllMachine();
		public ResponseEntity<String> findById(Long id);
		public ResponseEntity<String> insert(String json);
		public ResponseEntity<String> insertList(String json);
		public ResponseEntity<String> update(String json);
}
