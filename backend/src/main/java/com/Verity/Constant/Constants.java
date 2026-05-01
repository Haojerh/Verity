package com.Verity.Constant;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

import static java.time.LocalDateTime.now;

public class Constants {
    public static final String BASE_PATH = "/**";
    public static final HttpStatus OK = HttpStatus.OK;
    public static final LocalDateTime NOW = now();
}
