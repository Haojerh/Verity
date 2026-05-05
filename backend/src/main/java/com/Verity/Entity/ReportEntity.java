package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "report")
public class ReportEntity {
    @Id
    @Column(length = 20)
    private String reportID;

    @Column(nullable = false, length = 255)
    private String reason;

    @Column(nullable = false, length = 20)
    private String reportStatus = "PENDING"; // PENDING, RESOLVED, DISMISSED

    // The user who filed the report
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporterID", referencedColumnName = "userID")
    private UserEntity reporter;

    // Optional: If the report is against a specific topic
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "targetPostID", referencedColumnName = "postID")
    private PostEntity targetPost;

    // Optional: If the report is against a specific thread/reply
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "targetCommentID", referencedColumnName = "commentID")
    private CommentEntity targetComment;
}
