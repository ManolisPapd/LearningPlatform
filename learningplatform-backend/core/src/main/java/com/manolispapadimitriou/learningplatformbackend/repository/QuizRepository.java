package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Integer> {
    List<Quiz> findAllBySectionIdAndForSection(Integer sectionId, Integer forSection);
    List<Quiz> findAllBySectionIdAndForSectionAndWhenFailed(Integer sectionId, Integer forSection, Integer whenFailed);
}
