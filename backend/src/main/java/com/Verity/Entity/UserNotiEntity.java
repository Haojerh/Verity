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
    @Column(length = 20, nullable = false)
    private String notiID;
    private String message;
    private String sourceID;
    private boolean isRead = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipientID")
    private UserEntity recipient;

    @PrePersist
    public void beforePersist() { setNotiID("USRNOT-" + RandomString.make(10));}
}