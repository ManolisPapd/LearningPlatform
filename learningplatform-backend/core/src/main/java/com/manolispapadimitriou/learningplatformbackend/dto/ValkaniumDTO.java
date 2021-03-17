package com.manolispapadimitriou.learningplatformbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValkaniumDTO {
    private Integer megame;
    private String name;
    private UUID uuid;
}
