package com.manolispapadimitriou.learningplatformbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
public class SectionDTO {
    private Integer id;
    private String name;
    private Integer courseId;
    private String information;
}
