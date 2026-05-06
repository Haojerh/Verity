package com.Verity.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "topic")
public class TopicEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String topicID;

    @Column(length = 20)
    private String name;

    private String description;
    private String avatar;
    private String banner;

    @PrePersist
    public void beforePersist() { setTopicID("CAT-" + RandomString.make(10));}
}
