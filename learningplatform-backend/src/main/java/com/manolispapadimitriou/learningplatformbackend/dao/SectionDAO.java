package com.manolispapadimitriou.learningplatformbackend.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
public class SectionDAO {
    private Integer id;
    private String name;
    private Integer courseId;
    private String information;
}
