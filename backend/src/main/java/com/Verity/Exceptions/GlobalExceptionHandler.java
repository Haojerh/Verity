package com.Verity.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.Verity.Domain.Response;
import com.Verity.Utils.RequestUtils;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Response> handleApiException(
            ApiException ex,
            HttpServletRequest request) {
        return ResponseEntity.badRequest()
                .body(RequestUtils.getResponse(request, null, ex.getMessage(), HttpStatus.BAD_REQUEST));
    }
}
