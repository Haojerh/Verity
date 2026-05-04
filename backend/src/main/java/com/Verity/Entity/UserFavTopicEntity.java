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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topicID")
    private TopicEntity topic;

    @PrePersist
    public void beforePersist() { setUserFavID("USRFAV-" + RandomString.make(10));}
}

