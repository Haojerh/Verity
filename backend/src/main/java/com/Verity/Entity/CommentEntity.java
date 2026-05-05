package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import net.bytebuddy.utility.RandomString;

import java.util.ArrayList;
import java.util.List;

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

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentCommentID")
    private CommentEntity parentComment;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "parentComment", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("SYSCREATEDDATE ASC")
    private List<CommentEntity> replies = new ArrayList<>();

    @PrePersist
    public void beforePersist() {
        if (this.commentID == null) {
            setCommentID("CMT-" + RandomString.make(10));
        }
    }
}
