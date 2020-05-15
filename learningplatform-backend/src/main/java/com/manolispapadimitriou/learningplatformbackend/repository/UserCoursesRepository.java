package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCoursesRepository extends JpaRepository<UserCourse, Long> {
    List<UserCourse> findAllByUserId(Long userId);
}
