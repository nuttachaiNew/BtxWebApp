package com.spt.app.constant;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ApplicationConstant {

	public static final String APPLICATION_NAME    = "BTX";
	public static final String APPLICATION_VERSION = "v.1.0.20170101";

	public static  String FETCH_FRONTEND_PARAMETER_TIME = (new SimpleDateFormat("yyyyMMddhhmmss")).format(new Date());
	public static final String FETCH_PARAMETER_NAME = "PARAMETER_FETCH";
}
