package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "punishment_log")
public class PunishmentLogEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String logID;

    @Column(length = 10)
    private String type;

    private int duration; 
    private String reason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private UserEntity punishedUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "moderatorID")
    private UserEntity moderator;

    @PrePersist
    public void beforePersist() {
        if (this.logID == null) setLogID("LOG-" + RandomString.make(10));
    }

    public boolean isActive() {
        if (getSYSCREATEDDATE() == null) return false;

        LocalDateTime endTime = getSYSCREATEDDATE().plusMinutes(duration);
        return endTime.isAfter(LocalDateTime.now());
    }
}
