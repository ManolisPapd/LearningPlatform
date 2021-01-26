package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manolispapadimitriou.learningplatformbackend.dao.CourseDAO;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String image;
    private String description;

    @ManyToOne
    @JoinColumn(name = "teacher")
    private User teacher;

    public CourseDAO _toConvertCourseDAO(){
        CourseDAO courseDAO = new CourseDAO();
        courseDAO.setId(this.id);
        courseDAO.setName(this.name);
        courseDAO.setImage(this.image);
        courseDAO.setDescription(this.description);
        courseDAO.setTeacher(this.teacher);

        return courseDAO;
    }
}
