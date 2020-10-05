package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectionRepository extends JpaRepository<Section, Integer> {

    List<Section> findAllByCourseId(Integer id);
    Section findByIdAndCourseId(Integer id, Integer courseId);
}
