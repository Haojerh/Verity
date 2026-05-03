package com.Verity.Entity;

import java.time.LocalDateTime;

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
@Table(name = "punishment_log")
public class PunishmentLogEntity extends Auditable {
    @Id
    @Column(length = 20)
    private String logID;

    @Column(length = 10)
    private String type;

    @Column(nullable = true)
    private Integer duration; 

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

    public Integer getRemainingMinutes() {
        if (getSYSCREATEDDATE() == null || duration == null) return 0;

        LocalDateTime endTime = getSYSCREATEDDATE().plusMinutes(duration);
        LocalDateTime now = LocalDateTime.now();

        if (now.isAfter(endTime)) {
            return 0;
        }

        return (int) java.time.Duration.between(now, endTime).toMinutes();
    }
}
