package com.Verity.Exceptions;

public class ApiException extends RuntimeException{
    public ApiException(String message){
        super(message);
    }
}
