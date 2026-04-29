package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "vote", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"threadID", "voterID"})
})
public class VoteEntity extends Auditable {

    @Id
    @Column(name = "voteID", length = 20)
    private String voteID;

    // Many votes belong to one thread
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "threadID", referencedColumnName = "threadID", nullable = false)
    private ThreadEntity thread;

    // Many votes can be cast by one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voterID", referencedColumnName = "userID", nullable = false)
    private UserEntity voter;

    @Column(nullable = false)
    private int voteValue; // 1 for upvote, -1 for downvote

    @PrePersist
    public void beforePersist() { setVoteID("VOT-" + RandomString.make(10));}
}
