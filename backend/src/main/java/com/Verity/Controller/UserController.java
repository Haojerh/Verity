package com.Verity.Controller;

import com.Verity.DTO.Credential;
import com.Verity.DTO.UserDTO;
import com.Verity.DTO.UserRequest;
import com.Verity.Domain.Response;
import com.Verity.Exceptions.ApiException;
import com.Verity.Security.Utils.UserAuthenticationProvider;
import com.Verity.Security.Utils.UserPrincipal;
import com.Verity.Service.UserServices;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import static com.Verity.Utils.RequestUtils.getResponse;
import static java.net.URI.create;
import static java.util.Collections.emptyMap;
import static org.apache.tomcat.util.http.SameSiteCookies.NONE;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserServices userServices;

    @Autowired
    private UserAuthenticationProvider userAuthenticationProvider;
    @PostMapping("/register")
    public ResponseEntity<Response> createUser(@RequestBody UserRequest userRequest, HttpServletRequest request) {
        userServices.createUser(userRequest);
        return ResponseEntity.created(create("")).body(getResponse(request, emptyMap(), "User created", CREATED));
    }

    @PatchMapping("/update")
    public ResponseEntity<Response> updateUser(@RequestBody UserRequest userRequest, HttpServletRequest request) {
        userServices.createUser(userRequest);
        return ResponseEntity.ok().body(getResponse(request, emptyMap(), "User updated", OK));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody Credential credential, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        try{
            UserDTO userDTO = userServices.authenticate(credential);
            String token = userAuthenticationProvider.createToken(userDTO.getEmail());
            var cookie = new Cookie("Token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setMaxAge(10 * 60);
            cookie.setPath("/");
            cookie.setAttribute("SameSite", NONE.name());
            response.addCookie(cookie);
            return ResponseEntity.ok().body(getResponse(request, Map.of("User", userDTO), "Login was successful!", OK));
        } catch (Exception e) {
            throw new ApiException("An unknown error occurred");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Response> profile(@AuthenticationPrincipal UserPrincipal userPrincipal, HttpServletRequest request) {
        var User = userServices.getUserByEmail(userPrincipal.getUsername());
        return ResponseEntity.ok().body(getResponse(request, Map.of("User", User), "User found.", OK));
    }
}
