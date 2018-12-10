package com.spt.app.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class CacheControlFilter implements Filter {

    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletResponse resp = (HttpServletResponse) response;
        //resp.setHeader("Expires", "Tue, 03 Jul 2001 06:00:00 GMT");
        resp.setDateHeader("Last-Modified", new Date().getTime());
        resp.setHeader("Cache-Control", "public");
        resp.setHeader("Pragma", "cache");
        

        chain.doFilter(request, response);
    }

	//@Override
	public void destroy() {

	}

	//@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}