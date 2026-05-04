package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "comment")
public class CommentEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String commentID;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(length = 20)
    private String side;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postID")
    private PostEntity post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorID")
    private UserEntity author;

    @PrePersist
    public void beforePersist() {
        if (this.commentID == null) {
            setCommentID("CMT-" + RandomString.make(10));
        }
    }
}
