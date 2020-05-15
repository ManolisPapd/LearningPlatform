package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manolispapadimitriou.learningplatformbackend.dao.CourseDAO;
import lombok.Data;
import org.checkerframework.checker.units.qual.C;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    private String description;


    public CourseDAO _toConvertCourseDAO(){
        CourseDAO courseDAO = new CourseDAO();
        courseDAO.setId(this.id);
        courseDAO.setName(this.name);
        courseDAO.setImage(this.image);
        courseDAO.setDescription(this.description);

        return courseDAO;
    }
}
