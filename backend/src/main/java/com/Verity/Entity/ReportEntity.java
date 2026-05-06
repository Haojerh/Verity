package com.Verity.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "report")
public class ReportEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String reportID;

    @Column(nullable = false, length = 255)
    private String reason;

    @Column(nullable = false, length = 20)
    private String type;

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

    @PrePersist
    public void beforePersist() { setReportID("RPT-" + RandomString.make(10));}
}
