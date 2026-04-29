package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "topic")
public class TopicEntity extends Auditable{
    @Id
    @Column(length = 20)
    private String topicID;
    private String name;
    private String description;

    @PrePersist
    public void beforePersist() { setTopicID("CAT-" + RandomString.make(10));}
}
