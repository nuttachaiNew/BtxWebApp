package com.spt.app.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface PositionService {
		public ResponseEntity<String> findAllPosition();
		public ResponseEntity<String> deletePosition(String json);
		public ResponseEntity<String> insertPosition(String json);
		public ResponseEntity<String> updatePosition(String json);
}
