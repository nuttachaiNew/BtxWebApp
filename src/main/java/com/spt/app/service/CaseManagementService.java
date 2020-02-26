package com.spt.app.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface CaseManagementService {
		public ResponseEntity<String> findCaseByParameter(String json);
		public ResponseEntity<String> findCaseByCriteria(String role,String date,String caseNumber,String username,String dateFrom,String dateTo,String areaId);
		public ResponseEntity<String> findCaseManagementById(String id);
		public ResponseEntity<String> confirmByBU(String json);
		public ResponseEntity<String> confirmByTS(String json);
		public ResponseEntity<String> confirmByFN(String json);
		public ResponseEntity<String> confirmByCS(String json);

		public ResponseEntity<String> uploadDigitalSignature(MultipartHttpServletRequest multipartHttpServletRequest);
		public ResponseEntity<String> findHistoryDocByAreaAndDocStatusAndRoleAndCase(String documentStatus,String createdBy);
		public ResponseEntity<String> sendDeposit(MultipartHttpServletRequest multipartHttpServletRequest);
		public ResponseEntity<String> listDeposit(String rol,String username);
		
		public ResponseEntity<String> listSwapMachine(String username);
		public ResponseEntity<String> returnMachine(String json);

		public ResponseEntity<String> getPaySlip(String id);
		public ResponseEntity<String> findCaseManagementByDeliveryNote(String deliveryNote);

		

}
