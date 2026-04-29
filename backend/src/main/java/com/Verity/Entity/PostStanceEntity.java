package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "post_stance", uniqueConstraints = {@UniqueConstraint(columnNames = {"postID", "userID"})})
public class PostStanceEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String stanceID;
    private String chosenStance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postID")
    private PostEntity postID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private UserEntity user;

    @PrePersist
    public void beforePersist() { setStanceID("STA-" + RandomString.make(10));}
}