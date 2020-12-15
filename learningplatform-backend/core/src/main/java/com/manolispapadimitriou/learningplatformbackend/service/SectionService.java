package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dao.SectionDAO;
import com.manolispapadimitriou.learningplatformbackend.entity.Section;
import com.manolispapadimitriou.learningplatformbackend.repository.CourseRepository;
import com.manolispapadimitriou.learningplatformbackend.repository.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    private final CourseRepository courseRepository;

    public SectionService(SectionRepository sectionRepository, CourseRepository courseRepository) {
        this.sectionRepository = sectionRepository;
        this.courseRepository = courseRepository;
    }


    public List<SectionDAO> findAllSectionsByCourse(Integer id) {
        List<Section> sections = sectionRepository.findAllByCourseId(id);

        return sections.stream()
                .map(section -> section._toConvertSectionDAO())
                .collect(Collectors.toList());

    }

    public SectionDAO getSectionByCourseId(Integer courseId, Integer sectionId){
        return sectionRepository.findByIdAndCourseId(sectionId,courseId)._toConvertSectionDAO();

    }
}
