package com.manolispapadimitriou.learningplatformbackend.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SectionDAO {
    private Integer id;
    private String name;
    private Integer courseId;
    private String information;



    public SectionDAO() {
    }
}
