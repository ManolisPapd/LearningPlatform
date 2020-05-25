package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dao.SectionDAO;
import com.manolispapadimitriou.learningplatformbackend.entity.Section;
import com.manolispapadimitriou.learningplatformbackend.repository.CourseRepository;
import com.manolispapadimitriou.learningplatformbackend.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectionService {

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private CourseRepository courseRepository;


    public List<SectionDAO> findAllSectionsByCourse(Long id) {
        List<Section> sections = sectionRepository.findAllByCourseId(id);

        return sections.stream()
                .map(section -> section._toConvertSectionDAO())
                .collect(Collectors.toList());

    }

    public SectionDAO getSectionByCourseId(Long courseId, Long sectionId){
        return sectionRepository.findByIdAndCourseId(sectionId,courseId)._toConvertSectionDAO();

    }
}
