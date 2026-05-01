package com.Verity.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import net.bytebuddy.utility.RandomString;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "notification")
@JsonInclude(JsonInclude.Include.NON_DEFAULT)

public class UserNotiEntity extends Auditable {
    @Id
    @Column(name = "notiID", nullable = false, unique = true, length = 20)
    private String notiID;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "topicID", nullable = true, unique = false, length = 20)
    private String topicID;

    @Column(name = "threadID", nullable = true, unique = false, length = 20)
    private String threadID;

    @PrePersist
    public void beforePersist() { setNotiID("USRNOT-" + RandomString.make(10));}
}