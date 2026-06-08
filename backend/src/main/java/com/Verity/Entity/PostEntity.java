package com.Verity.Entity;

import org.hibernate.annotations.SQLRestriction;

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
@Table(name = "post")
public class PostEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String postID;
    
    private String title;

    @Column(columnDefinition = "TEXT")
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