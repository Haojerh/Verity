package com.Verity.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import net.bytebuddy.utility.RandomString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "favorite")
@JsonInclude(JsonInclude.Include.NON_DEFAULT)

public class UserFavTopicEntity extends Auditable {
    @Id
    @Column(name = "userFavID", nullable = false, unique = true, length = 20)
    private String userFavID;

    @Column(name = "postID", nullable = true, unique = false, length = 20)
    private String postID;

    @Column(name = "threadID", nullable = true, unique = false, length = 20)
    private String threadID;

    @PrePersist
    public void beforePersist() { setUserFavID("USRFAV-" + RandomString.make(10));}
}

