package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manolispapadimitriou.learningplatformbackend.dao.SectionDAO;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer courseId;
    private String information;


    public SectionDAO _toConvertSectionDAO(){
        SectionDAO sectionDAO = new SectionDAO();
        sectionDAO.setId(this.id);
        sectionDAO.setName(this.name);
        sectionDAO.setCourseId(this.courseId);
        sectionDAO.setInformation(this.information);

        return sectionDAO;

    }
}
