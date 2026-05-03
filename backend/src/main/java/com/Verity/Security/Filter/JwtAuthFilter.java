package com.Verity.Security.Filter;


import com.Verity.Exceptions.ApiException;
import com.Verity.Security.Utils.UserAuthenticationProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.FilterChain;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.hibernate.internal.util.collections.ArrayHelper.forEach;


@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthenticationProvider userAuthenticationProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {

        Cookie cookie = WebUtils.getCookie(httpServletRequest, "Token");

        if (cookie != null) {
            String tokenValue = cookie.getValue();
            SecurityContextHolder.getContext().setAuthentication(userAuthenticationProvider.validateToken(tokenValue));
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
