package com.Verity.DTO;


import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UserRequest {

    private String email;
    private String password;
    private String name;

    private String userID;

    private MultipartFile avatar;

}
