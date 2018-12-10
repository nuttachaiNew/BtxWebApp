package com.spt.app.spring.security;

import com.spt.app.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("customUserDetailsService")
    UserDetailsService userDetailsService;

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        //1.Default Memory Authentication Provider
        auth.inMemoryAuthentication().withUser("system").password("cR$").roles("SUPER_ADMIN");

        //Set Sequence of Provider
        //2.Custom Authentication Provider
        auth.userDetailsService(userDetailsService).passwordEncoder((PasswordEncoder) userDetailsService);


    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/login/**",
                        "/resources/images/**",
                        "/resources/fonts/**",
                        "/resources/logs/**",
                        "/lbAccessStatus/**").permitAll()
                .antMatchers("/demos/**").hasAnyRole("ADMIN","ROLE2")      
                .antMatchers("/resources/**").authenticated()
                .antMatchers("/**").authenticated()
                .antMatchers(HttpMethod.POST, "/**").authenticated()
                .and().csrf()
                .and().logout().logoutUrl("/logout")
                .and().formLogin().loginPage("/login").loginProcessingUrl("/j_spring_security_check").usernameParameter("j_username").passwordParameter("j_password").successHandler(getAuthenticationSuccessHandler())
                .and().exceptionHandling().authenticationEntryPoint(getAuthenticationEntryPoint())
                .accessDeniedPage("/Access_Denied");
    }

    @Bean
    public CustomAuthenticationEntryPoint getAuthenticationEntryPoint() {
        CustomAuthenticationEntryPoint authenticationEntryPoint = new CustomAuthenticationEntryPoint();
        authenticationEntryPoint.setLoginPageUrl("/login");
        authenticationEntryPoint.setReturnParameterEnabled(true);
        authenticationEntryPoint.setReturnParameterName("r");

        return authenticationEntryPoint;
    }

    @Bean
    public CustomAuthenticationSuccessHandler getAuthenticationSuccessHandler() {
        CustomAuthenticationSuccessHandler authenticationHandler = new CustomAuthenticationSuccessHandler();
        authenticationHandler.setDefaultTargetUrl("/");
        authenticationHandler.setTargetUrlParameter("spring-security-redirect");

        return authenticationHandler;
    }



}
