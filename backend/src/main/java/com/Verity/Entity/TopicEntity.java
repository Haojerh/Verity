package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "topic")
public class TopicEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String topicID;
    private String title;
    private String description;
    private String proLabel = "Pro";
    private String conLabel = "Con";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryID")
    private CategoryEntity category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorID")
    private UserEntity author;

    @PrePersist
    public void beforePersist() { if (this.topicID == null) setTopicID("TPC-" + RandomString.make(10)); }
}