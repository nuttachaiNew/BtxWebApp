package com.spt.app.service.impl;

import com.spt.app.service.AbstractEngineService;
import com.spt.app.service.BaseCommonService;
import com.spt.app.aop.annotation.Loggable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.spt.app.service.CaseManagementService;
import java.util.Arrays;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Service("CaseManagementService")
public class CaseManagementServiceImpl extends AbstractEngineService implements CaseManagementService {

	static final Logger LOGGER = LoggerFactory.getLogger(CaseManagementServiceImpl.class);

		
		@Override
		@Autowired
		public void setRestTemplate(RestTemplate restTemplate) {
			// TODO Auto-generated method stub
			super.restTemplate = restTemplate;
		}


		public ResponseEntity<String> findCaseByParameter(String json){
			try{
				LOGGER.debug("findCaseByParameter :{}",json);
				String url = "/api/case/findCaseByParameter"+json;
	       		return getResultStringAndSetUser(url);
			}catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
			}
		}



			public ResponseEntity<String> findCaseManagementById(String json){
			try{
				LOGGER.debug("findCaseByParameter :{}",json);
				String url = "/api/casemanagement/findCaseManagementById?id="+json;
	       		return getResultStringAndSetUser(url);
			}catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
			}
		}

		public ResponseEntity<String> findCaseByCriteria(String role,String date,String caseNumber,String username,String dateFrom,String dateTo,String areaId){
			try{
				LOGGER.debug("findCaseByParameter :{}",role);
				String url = "";
				dateFrom = dateFrom == null ? "":dateFrom;
				dateTo = dateTo == null ? "":dateTo;
				areaId = areaId == null ? "":areaId;
				// "/api/case/findCaseByParameter"+json;
				if("BU".equalsIgnoreCase(role) ){
					url = "/api/casemanagement/findCaseByCriteriaforBU";
				}else if("CS".equalsIgnoreCase(role) ){
					url = "/api/casemanagement/findCaseByCriteriaforCS";
				}else if("FN".equalsIgnoreCase(role)){
					url = "/api/casemanagement/findCaseByCriteriaforFN";
				}else if("TS".equalsIgnoreCase(role)){
					url = "/api/casemanagement/findCaseByCriteriaforTS";
				}
				url+="?date="+date+"&caseNumber="+caseNumber+"&username="+username+"&dateFrom="+dateFrom+"&dateTo="+dateTo+"&areaId="+areaId;
	       		return getResultStringAndSetUser(url);
			}catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
			}
		}


	 	@Override
		public ResponseEntity<String> confirmByBU(String json){
	        try{
				String url = "/api/casemanagement/confirmByBU";
	            return postWithStringJson(json, HttpMethod.POST, url);
	        }catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
	        }
		}

		@Override
		public ResponseEntity<String> confirmByTS(String json){
	        try{
				String url = "/api/casemanagement/confirmByTS";
	            return postWithStringJson(json, HttpMethod.POST, url);
	        }catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
	        }
		}

		@Override
		public ResponseEntity<String> confirmByFN(String json){
	        try{
				String url = "/api/casemanagement/confirmByFN";
	            return postWithStringJson(json, HttpMethod.POST, url);
	        }catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
	        }
		}

		@Override
		public ResponseEntity<String> confirmByCS(String json){
	        try{
				String url = "/api/casemanagement/confirmByCS";
	            return postWithStringJson(json, HttpMethod.POST, url);
	        }catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
	        }
		}

	@Override
	public ResponseEntity<String> uploadDigitalSignature(MultipartHttpServletRequest multipartHttpServletRequest) {
		// return null;
		String method = "/api/casemanagement/uploadDigitalSignature";
		String url = method;
		return uploadFile(multipartHttpServletRequest,url);
	}


	public ResponseEntity<String> sendDeposit(MultipartHttpServletRequest multipartHttpServletRequest) {
		// return null;
		String method = "/api/casemanagement/sendDeposit";
		String url = method;
		return uploadFile(multipartHttpServletRequest,url);
	}

	public ResponseEntity<String> listDeposit(String role,String username){
			try{
				LOGGER.debug("findCaseByParameter :{}",role);
				String url = "";
			     if("FN".equalsIgnoreCase(role)){
					url = "/api/casemanagement/listDepositFn";
				}else if("TS".equalsIgnoreCase(role)){
					url = "/api/casemanagement/listDepositTS";
				}
				url+="?username="+username;
	       		return getResultStringAndSetUser(url);
			}catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
			}
		}


		public ResponseEntity<String> findHistoryDocByAreaAndDocStatusAndRoleAndCase(String json,String createdBy){
			try{
				LOGGER.debug("findHistoryDocByAreaAndDocStatusAndRoleAndCase :{}",json);
				String url = "/api/casemanagement/findHistoryDocByAreaAndDocStatusAndRoleAndCase?caseStatus="+json+"&createdBy="+createdBy;
	       		return getResultStringAndSetUser(url);
			}catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
			}
		}


			public ResponseEntity<String> listSwapMachine(String username){
			try{
				String url = "";
					url = "/api/casemanagement/listSwapMachine";
				url+="?username="+username;
	       		return getResultStringAndSetUser(url);
			}catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
			}
		}

		@Override
		public ResponseEntity<String> returnMachine(String json){
	        try{
				String url = "/api/casemanagement/returnMachine";
	            return postWithStringJson(json, HttpMethod.POST, url);
	        }catch(Exception e){
				e.printStackTrace();
	        	throw new RuntimeException(e.getMessage());
	        }
		}

	@Override
	public ResponseEntity<String> getPaySlip(String id) {
		        String url = "/files/getPayslipById?id="+id;
		        return getResultStringAndSetUser(url);
	}


	public ResponseEntity<String> findCaseManagementByDeliveryNote(String deliveryNote){
	try{
		LOGGER.debug("findCaseManagementByDeliveryNote :{}",deliveryNote);
		String url = "/api/casemanagement/findCaseManagementByDeliveryNote?deliveryNote="+deliveryNote;
   		return getResultStringAndSetUser(url);
	}catch(Exception e){
		e.printStackTrace();
    	throw new RuntimeException(e.getMessage());
	}
}

}
