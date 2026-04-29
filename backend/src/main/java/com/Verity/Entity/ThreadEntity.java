package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "thread")
public class ThreadEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String threadID;
    private String content;
    private String stance; // PRO, CON, NEUTRAL

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topicID")
    private TopicEntity topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorID")
    private UserEntity author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentThreadID")
    private ThreadEntity parentThread;

    @PrePersist
    public void beforePersist() {
        if (this.threadID == null) setThreadID("THR-" + RandomString.make(10));
    }
}