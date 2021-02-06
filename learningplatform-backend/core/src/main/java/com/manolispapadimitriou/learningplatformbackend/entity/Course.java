package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manolispapadimitriou.learningplatformbackend.dto.CourseDTO;
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

    public CourseDTO _toConvertCourseDAO(){
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setId(this.id);
        courseDTO.setName(this.name);
        courseDTO.setImage(this.image);
        courseDTO.setDescription(this.description);
        courseDTO.setTeacher(this.teacher);

        return courseDTO;
    }
}
