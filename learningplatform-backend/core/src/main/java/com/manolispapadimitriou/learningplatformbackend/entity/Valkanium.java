package com.manolispapadimitriou.learningplatformbackend.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
public class Valkanium {
    private Integer megame;

    private String name;

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = " UUID",
            strategy = "org.hibernate.UUIDGenerator",
            parameters = {
                    @Parameter(
                            name = "uuid_gen_strategy_class",
                            value = "org.hibernate.id.uuid.CustomVersionOneStrategy"
                    )
            }
    )
    @Column(name = "uuid", columnDefinition = "VARCHAR(255)")
    @Type(type = "uuid-char")
    private UUID uuid;
}
