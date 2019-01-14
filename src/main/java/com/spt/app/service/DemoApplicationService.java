package com.spt.app.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface DemoApplicationService {
		public ResponseEntity<String> listDemoApplicationOrderByParam(String orderBy , String sortBy,Integer firstResult,Integer maxResult);
		public ResponseEntity<String> listDemoApplicationOrderByParamSize(String orderBy , String sortBy);
		public ResponseEntity<String> deleteDemo(Long id);
		public ResponseEntity<String> insertDemo(String json);
		public ResponseEntity<String> listDemoHeaderNamelikeAndmaxSizeAndOrderby(String orderBy , String sortBy,Integer size,String name);
		public ResponseEntity<String> listDemoApplicationOrderByParamAndKeyword(String keyword,String orderBy , String sortBy,Integer firstResult,Integer maxResult);
		public ResponseEntity<String> listDemoApplicationOrderByParamSizeKeyword(String keyword,String orderBy , String sortBy);
		
		


}
