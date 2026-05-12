package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;
import org.hibernate.annotations.SQLRestriction;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "post")
@SQLRestriction("SYSISDELETED = false")
public class PostEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String postID;
    private String title;
    private String description;
    private String proLabel;
    private String conLabel;
    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topicID")
    private TopicEntity topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorID")
    private UserEntity author;

    @PrePersist
    public void beforePersist() { if (this.postID == null) setPostID("TPC-" + RandomString.make(10)); }
}