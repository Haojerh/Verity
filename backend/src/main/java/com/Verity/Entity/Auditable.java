package com.Verity.Entity;

import ch.qos.logback.classic.pattern.ClassOfCallerConverter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.AlternativeJdkIdGenerator;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value={"SYSCREATEDDATE, SYSMODIFIEDDATE"}, allowGetters = true)

public abstract class Auditable {
    @Column(name = "SYSUNID", unique = true, nullable = false, length = 40)
    private String SYSUNID;

    @Column(name = "SYSCREATEDBY", nullable = false)
    private String SYSCREATEDBY;

    @Column(name = "SYSMODIFIEDBY", nullable = false)
    private String SYSMODIFIEDBY;

    @Column(name = "SYSCREATEDDATE", nullable = false)
    private LocalDateTime SYSCREATEDDATE;

    @Column(name = "SYSMODIFIEDDATE", nullable = false)
    private LocalDateTime SYSMODIFIEDDATE;

    @Column(name = "SYSISDELETED", nullable = false)
    private Boolean SYSISDELETED;

    @PrePersist
    public void onBeforeCreate(){
//        var userID = "administrator";
//        if (userID == null) {throw new ApiException("User ID not found, please login before proceed this action");}

        setSYSUNID(new AlternativeJdkIdGenerator().generateId().toString());
        setSYSCREATEDBY("administrator");
        setSYSMODIFIEDDATE(LocalDateTime.now());
        setSYSMODIFIEDBY("administrator");
        setSYSCREATEDDATE(LocalDateTime.now());
        setSYSISDELETED(Boolean.FALSE);
    }

    @PreUpdate
    public void onBeforeUpdate(){
//        var userID = "administrator";
//        if (userID == null) {throw new ApiException("User ID not found, please login before proceed this action");}
        setSYSMODIFIEDDATE(LocalDateTime.now());
        setSYSMODIFIEDBY("administrator");
    }
}
