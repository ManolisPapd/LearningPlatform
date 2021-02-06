package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manolispapadimitriou.learningplatformbackend.dto.SectionDTO;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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


    public SectionDTO _toConvertSectionDAO(){
        SectionDTO sectionDTO = new SectionDTO();
        sectionDTO.setId(this.id);
        sectionDTO.setName(this.name);
        sectionDTO.setCourseId(this.courseId);
        sectionDTO.setInformation(this.information);

        return sectionDTO;

    }
}
