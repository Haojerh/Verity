package com.Verity.Constant;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

import static java.time.LocalDateTime.now;

/**
 * @author : Eugene
 * @version : 1.0
 * @license :  Internation Business Solution (<a href="https://www.ibs.com">IBS</a>)
 * @mailto : eugene_ong@yahoo.com
 * @created : 12/2/2025
 * @description
 */

public class Constants {
    public static final String BASE_PATH = "/**";
    public static final HttpStatus OK = HttpStatus.OK;
    public static final LocalDateTime NOW = now();
}
