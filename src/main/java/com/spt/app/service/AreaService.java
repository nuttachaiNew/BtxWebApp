package com.spt.app.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface AreaService {
		public ResponseEntity<String> findAllAreas();
		public ResponseEntity<String> deleteArea(String json);
		public ResponseEntity<String> insertArea(String json);
		public ResponseEntity<String> updateArea(String json);

}
