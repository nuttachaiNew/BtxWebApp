package com.spt.app.spring.security;

public class UserAgentUtil {

	
	public static String getBrowserAbsolute(String userName){
		String result = null;
		if(userName!=null && userName.toUpperCase().indexOf("FIREFOX") >= 0){
			result = "FIREFOX";
		}else if(userName!=null && userName.toUpperCase().indexOf("CHROME") >= 0){
			result = "CHROME";
		}else if(userName!=null && userName.toUpperCase().indexOf("SAFARI") >= 0){
			result = "SAFARI";
		}else{
			result = "OTHER";
		}
		return result;
	}
	
	public static String getBrowserVersionAbsolute(String userName){
		String result = null;
		String browser = null;
		if(userName!=null){
			userName = userName.toUpperCase();
		}
		
		if(userName!=null && userName.toUpperCase().indexOf("FIREFOX") >= 0){
			browser = "FIREFOX";
		}else if(userName!=null && userName.toUpperCase().indexOf("CHROME") >= 0){
			browser = "CHROME";
		}else if(userName!=null && userName.toUpperCase().indexOf("SAFARI") >= 0){
			browser = "SAFARI";
		}
		if(browser!=null){
			int indexStartBrowser = userName.indexOf("/", userName.indexOf(browser));
			int indexEndBrowser = userName.indexOf(" ", userName.indexOf(browser));
			if(indexEndBrowser >=0){
				result = userName.substring(indexStartBrowser+1,indexEndBrowser);
			}else{
				result = userName.substring(indexStartBrowser+1);
			}
		}
		
		return result;
	}
	
	public static Integer getBrowserMainVersionAbsolute(String userName){
		Integer version = null;
		String versionStr = getBrowserVersionAbsolute(userName);
		if(versionStr!=null && versionStr.indexOf(".") >= 0){
			versionStr = versionStr.substring(0,versionStr.indexOf("."));
			
			try {
				version = new Integer(versionStr);
			} catch (NumberFormatException e) { }
		}
		return version;
	}

}
