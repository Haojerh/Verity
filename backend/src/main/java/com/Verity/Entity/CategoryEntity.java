package com.Verity.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.bytebuddy.utility.RandomString;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "category")
public class CategoryEntity extends Auditable{
    @Id
    @Column(length = 20)
    private String categoryID;
    private String name;
    private String description;

    @PrePersist
    public void beforePersist() { setCategoryID("CAT-" + RandomString.make(10));}
}
