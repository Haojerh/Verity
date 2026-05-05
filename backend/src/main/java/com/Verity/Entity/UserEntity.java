package com.Verity.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import net.bytebuddy.utility.RandomString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "system_user")
@JsonInclude(JsonInclude.Include.NON_DEFAULT)

public class UserEntity extends Auditable {
    @Id
    @Column(name = "userID", nullable = false, unique = true, length = 20)
    private String userID;

    @Column(name = "email", nullable = false, unique = true, length = 40)
    private String email;

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @Column(name = "userRole", nullable = false, unique = false, length = 40)
    private String userRole;

    @Column(name = "password", nullable = false, unique = false, length = 256)
    private String password;

    @Column(name = "avatar", nullable = true, unique = false, length = 256)
    private String avatar;
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    @JoinColumn(name = "userID", referencedColumnName = "userID", nullable = true)
//    private List<UserNotiEntity> userNotiEntityList;
//
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    @JoinColumn(name = "userID", referencedColumnName = "userID", nullable = true)
//    private List<UserFavTopicEntity> userFavTopicEntityList;

    @PrePersist
    public void beforePersist() { setUserID("USR-" + RandomString.make(10));}
}

