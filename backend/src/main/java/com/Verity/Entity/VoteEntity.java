package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "vote", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"commentID", "voterID"})
})
public class VoteEntity extends Auditable {

    @Id
    @Column(name = "voteID", length = 20)
    private String voteID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commentID", referencedColumnName = "commentID", nullable = false)
    private CommentEntity comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voterID", referencedColumnName = "userID", nullable = false)
    private UserEntity voter;

    @Column(nullable = false)
    private int voteValue;

    @PrePersist
    public void beforePersist() { setVoteID("VOT-" + RandomString.make(10));}
}
