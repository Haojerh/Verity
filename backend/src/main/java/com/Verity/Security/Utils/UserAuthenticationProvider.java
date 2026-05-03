package com.Verity.Security.Utils;


import com.Verity.Entity.UserEntity;
import com.Verity.Service.UserServices;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;


@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {
    @Value("${security.jwt.token.secret-key:secret-value}")
    private String secretKey;

    private final UserServices userServices;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String Username) {
        Date now = new Date();
        //Date validity = new Date(now.getTime() + 3_200_000);
        Date validity = new Date(now.getTime() + 7_200_000);

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        String token = JWT.create()
                .withSubject(Username)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);

        return token;
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);
        UserEntity userEntity = userServices.getUserByEmail(decoded.getSubject());
        return new UsernamePasswordAuthenticationToken(new UserPrincipal(userEntity), null, Collections.emptyList());
    }
}
