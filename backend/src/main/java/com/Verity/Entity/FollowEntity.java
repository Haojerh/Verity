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
@Table(name = "follow")
@JsonInclude(JsonInclude.Include.NON_DEFAULT)

public class FollowEntity extends Auditable {
    @Id
    @Column(name = "followID", nullable = false, unique = true, length = 20)
    private String followID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followerID")
    private UserEntity userFollower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followingID")
    private UserEntity userFollowing;

    @PrePersist
    public void beforePersist() { setFollowID("FLW-" + RandomString.make(10));}
}
