package com.Verity.Controller;

import static java.net.URI.create;
import static java.util.Collections.emptyMap;
import java.util.Map;

import static org.apache.tomcat.util.http.SameSiteCookies.NONE;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.Verity.DTO.ChangePassRequest;
import com.Verity.DTO.Credential;
import com.Verity.DTO.UserDTO;
import com.Verity.DTO.UserRequest;
import com.Verity.Domain.Response;
import com.Verity.Exceptions.ApiException;
import com.Verity.Security.Utils.ApiLogoutHandler;
import com.Verity.Security.Utils.UserAuthenticationProvider;
import com.Verity.Security.Utils.UserPrincipal;
import com.Verity.Service.PunishmentLogService;
import com.Verity.Service.UserServices;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserServices userServices;
    private final PunishmentLogService punishmentLogService;
    private final ApiLogoutHandler apiLogoutHandler;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/register")
    public ResponseEntity<Response> createUser(@RequestBody UserRequest userRequest, HttpServletRequest request) {
        userServices.createUser(userRequest);
        return ResponseEntity.created(create("")).body(getResponse(request, emptyMap(), "User created", CREATED));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody Credential credential, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        try {
            UserDTO userDTO = userServices.authenticate(credential);

            if (userServices.isUserBanned(userDTO.getUserID())) {
                int remainingMinutes = punishmentLogService.getRemainingBanMinutes(userDTO.getUserID());
                return ResponseEntity.ok(getResponse(request, Map.of( "banned", true, "remaining", remainingMinutes,"User", userDTO), "Your account has been banned.", OK));
            }

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
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(User,userDTO);
        return ResponseEntity.ok().body(getResponse(request, Map.of("User", userDTO), "User found.", OK));
    }

    @GetMapping("/api/users")
    public ResponseEntity<Response> getAllUsers(HttpServletRequest request) {
        var users = userServices.getAllUsers();
        return ResponseEntity.ok(getResponse(request, Map.of("users", users), "Users Retrieved", OK));
    }

    @GetMapping("/api/user")
    public ResponseEntity<Response> getCurrentUser(HttpServletRequest request) {
        var user = userServices.getCurrentUserDTO();
        return ResponseEntity.ok(getResponse(request, Map.of("user", user), "Current User Retrieved", OK));
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<Response> getUserById(@PathVariable String id, HttpServletRequest request) {
        var user = userServices.getUserByIdDTO(id);
        return ResponseEntity.ok(getResponse(request, Map.of("user", user), "User found", OK));
    }

    @PutMapping("/api/user")
    public ResponseEntity<Response> updateUser(@RequestBody UserRequest userRequest, HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
        }

        String email = auth.getName();
        userServices.updateUser(email, userRequest);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "User updated", OK));
    }

    @DeleteMapping("/api/user")
    public ResponseEntity<Response> deleteAccount(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
        }

        String email = auth.getName();
        userServices.deleteUser(email);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Account deleted", OK));
    }

    @PutMapping("/api/user/avatar")
    public ResponseEntity<Response> updateAvatar(@ModelAttribute UserRequest request, HttpServletRequest httpRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
        }

        String email = auth.getName();
        userServices.updateAvatar(email, request);
        return ResponseEntity.ok(getResponse(httpRequest, emptyMap(), "Profile updated", OK));
    }

    @GetMapping("/api/moderators")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Response> getAllModerators(HttpServletRequest request) {
        var moderators = userServices.getAllModerators();
        return ResponseEntity.ok(getResponse(request, Map.of("moderators", moderators), "Moderators Retrieved", OK));
    }

    @PutMapping("/api/change-password")
    public ResponseEntity<Response> changePassword(@RequestBody ChangePassRequest req, HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
        }

        String email = auth.getName();
        userServices.changePassword(email, req.getCurrentPassword(), req.getNewPassword());
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Password updated successfully", OK));
    }

    @GetMapping("/api/reputation/{id}")
    public ResponseEntity<Response> getRepById(@PathVariable String id, HttpServletRequest request) {
        var reputation = userServices.getUserReputation(id);
        return ResponseEntity.ok(getResponse(request, Map.of("reputation", reputation), "Reputation Retrieved", OK));
    }
}
