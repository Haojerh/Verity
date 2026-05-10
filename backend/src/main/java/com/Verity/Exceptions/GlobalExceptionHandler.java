package com.Verity.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.Verity.Domain.Response;
import com.Verity.Utils.RequestUtils;

import jakarta.servlet.http.HttpServletRequest;

import java.nio.file.AccessDeniedException;

import static com.Verity.Utils.RequestUtils.getResponse;
import static java.util.Collections.emptyMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Response> handleApiException(
            ApiException ex,
            HttpServletRequest request) {
        return ResponseEntity.badRequest()
                .body(getResponse(request, null, ex.getMessage(), HttpStatus.BAD_REQUEST));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Response> handleRuntimeException(
            RuntimeException ex,
            HttpServletRequest request) {
        return ResponseEntity.internalServerError()
                .body(getResponse(request, null, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Response> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(getResponse(request, emptyMap(), "You do not have permission to perform this action", HttpStatus.FORBIDDEN));
    }
}

