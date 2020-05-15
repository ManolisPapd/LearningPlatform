package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {
    List<Quiz> findAllBySectionIdAndForSection(Integer sectionId, Integer forSection);
    List<Quiz> findAllBySectionIdAndForSectionAndWhenFailed(Integer sectionId, Integer forSection, Integer whenFailed);
}
