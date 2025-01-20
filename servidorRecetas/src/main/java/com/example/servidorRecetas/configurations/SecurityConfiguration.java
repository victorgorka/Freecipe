package com.example.servidorRecetas.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.reactive.config.CorsRegistry;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests((auth) -> auth.anyRequest().permitAll()).build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/h2-console/**"));
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer2() {
        return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/recipes/**"));
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer3() {
        return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/auth/**"));
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer4() {
        return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/users/**"));
    }


}