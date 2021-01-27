package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCoursesRepository extends JpaRepository<UserCourse, Integer> {
    List<UserCourse> findAllByUserId(Integer userId);
    List<UserCourse> findAllByCourseId(Integer courseId);
}
