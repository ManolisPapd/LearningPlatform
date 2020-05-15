package com.manolispapadimitriou.learningplatformbackend.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SectionDAO {
    private Long id;
    private String name;
    private Long courseId;
    private String information;



    public SectionDAO() {
    }
}
