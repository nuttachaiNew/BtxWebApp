package com.spt.app.spring.security;

import com.spt.app.service.UserAuthorizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.ldap.InitialLdapContext;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Hashtable;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService, PasswordEncoder{

	static final Logger LOGGER = LoggerFactory.getLogger(CustomUserDetailsService.class);
	
	@Autowired
	UserAuthorizationService userAuthorizationService;
	
	@Autowired
	CustomUserModel customUserModel;


	//Default Attribute
	private String userName;
    private String password;

	
	@Transactional(readOnly=true)
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		try {

			CustomUser user = (CustomUser)userAuthorizationService.getUserDetail(userName);

            // Double loginStatus = userAuthorizationService.returnStatusLogin(userName);
            // LOGGER.info("=================LOGIN STATUS  =====>  {}",loginStatus);
            // if(!(loginStatus.toString()).equals("1.0")         ){
            //     throw new UsernameNotFoundException("Use : '" + userName + "' Not Active!");
            // }
			LOGGER.info("---------------------------------");
			LOGGER.info("----   loadUserByUsername   -----");
			LOGGER.info("User Object : ===================>{}",user);
			LOGGER.info("UserName : ===================>{}",userName);
			if(user!=null){
				this.userName = user.getUsername();
//				if(user.getIsActive() ==0 ){
//				    LOGGER.info("==============++ACTIVE =0 ====================");
//				    throw new UsernameNotFoundException("No user with username '" + userName + "' found!");
//                }
				/* Support Detect for Tomcat Attribute */
				ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
				attr.getRequest().getSession(true).setAttribute("userName",userName);
				attr.getRequest().getSession(true).setAttribute("userAgent",attr.getRequest().getHeader("User-Agent"));
		        attr.getRequest().getSession(true).setAttribute("screen_width",String.valueOf(attr.getRequest().getParameter("screen_width")));
		        attr.getRequest().getSession(true).setAttribute("screen_height",String.valueOf(attr.getRequest().getParameter("screen_height")));
		  //       attr.getRequest().getSession(true).setAttribute("menu",customUserModel.getValue("MENU"));
		  //       attr.getRequest().getSession(true).setAttribute("menu_authorize",customUserModel.getValue("MENU_AUTHORIZE"));
		  //       attr.getRequest().getSession(true).setAttribute("storeId",customUserModel.getValue("STORE_ID"));
		  //       attr.getRequest().getSession(true).setAttribute("storeCode",customUserModel.getValue("STORE_CODE"));
		  //       attr.getRequest().getSession(true).setAttribute("storeEngName",customUserModel.getValue("STORE_ENG_NAME"));
		  //       attr.getRequest().getSession(true).setAttribute("storeLocalName",customUserModel.getValue("STORE_LOCAL_NAME"));

		        /* Add to Bean SESSION SCOPE */
		        customUserModel.addValue(CustomUserModel.ATTR_CUSTOM_USER, user);
		        customUserModel.addValue(CustomUserModel.ATTR_CUSTOM_USER_NAME, userName);
		        
		        if(user.getAccessToken()==null){
		        	user.setAccessToken("");
		        }
		        LOGGER.info("session : "+attr.getRequest().getSession().getId());
				return new org.springframework.security.core.userdetails.User(userName, user.getAccessToken(), 
				             true, user.isAccountNonExpired(), user.isCredentialsNonExpired(), user.isAccountNonLocked() ,user.getAuthorities());
			}else{
				throw new UsernameNotFoundException("No user with username '" + userName + "' found!");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new UsernameNotFoundException("No user with username '" + userName + "' found!");
		}
		
		
    }

	
	
    public String encode(CharSequence rawPassword) {
        LOGGER.debug("encode========================================================= : {} : {}",rawPassword);

        return rawPassword.toString()+"EEEE"; // TODO implement
    }

    
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        LOGGER.debug("matches========================================================= : {} : {}",rawPassword,encodedPassword);


        password = rawPassword.toString();
        if (ldapAuthen()) {
            LOGGER.info("is Authentication AD PASS");
            LOGGER.info("---------------------------------");
            //Action When Ldap
            //restService.saveFlagUserAd(userName);
            return true;
        }else {
            LOGGER.info("---------------------------------");
            LOGGER.info("---- Match with database authentication ----");
            return md5Hash(rawPassword.toString()).equals(encodedPassword);
        }
        
    }

    public String md5Hash (String password) {
        LOGGER.debug("md5Hash========================================================= : {}",password);
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(password.getBytes());
            BigInteger number = new BigInteger(1, messageDigest);
            String hashtext = number.toString(16);
            // Now we need to zero pad it if you actually want the full 32 chars.
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
        LOGGER.debug("md5Hash========================================================= : {}",hashtext.toString());

           return hashtext.toString();
        } catch (Exception e) {//} catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "";
        }
    }
    
    private boolean ldapAuthen() {
    	//LOGGER.info("in ldapAuthen");
        //LOGGER.info("Authen AD : {}");
        String url = "ldap://ldap.softsquaregroup.com:389";
        String username = this.userName+"@softsquaregroup.com";
        String password = this.password;
        //LOGGER.info("user : {}",username);
        //LOGGER.info("pass : {}",password);
        Hashtable<Object, Object> env = new Hashtable<Object, Object>();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, url);
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        env.put(Context.SECURITY_PRINCIPAL, username);
        env.put(Context.SECURITY_CREDENTIALS, password);
        env.put(Context.REFERRAL,"follow");

        try {
            InitialLdapContext initialLdapContext = new InitialLdapContext(env,null);
            return true;
        } catch (NamingException e) {
            LOGGER.error("AD Cretential not found !!");
            return false;
        }
    }

}
