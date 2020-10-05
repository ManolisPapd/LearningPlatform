package com.manolispapadimitriou.learningplatformbackend.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CourseDAO {
    private Integer id;
    private String name;
    private String image;
    private String description;

    public CourseDAO() {
    }

    public CourseDAO(Integer id, String name,String image,String description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;

    }
}
