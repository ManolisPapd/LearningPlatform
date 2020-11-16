package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dao.CourseDAO;
import com.manolispapadimitriou.learningplatformbackend.entity.Course;
import com.manolispapadimitriou.learningplatformbackend.entity.UserCourse;
import com.manolispapadimitriou.learningplatformbackend.repository.CourseRepository;
import com.manolispapadimitriou.learningplatformbackend.repository.UserCoursesRepository;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final UserCoursesRepository userCoursesRepository;

    private final CourseRepository courseRepository;

    public CourseService(UserCoursesRepository userCoursesRepository, CourseRepository courseRepository) {
        this.userCoursesRepository = userCoursesRepository;
        this.courseRepository = courseRepository;
    }

    public List<CourseDAO> findAllCoursesByUser(Integer userId){
        List<UserCourse> userCoursesDAO = userCoursesRepository.findAllByUserId(userId);

        List<Course> userCourses = userCoursesDAO.stream()
                .map(userCourse -> courseRepository.findById(userCourse.getCourseId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());



        return userCourses.stream()
                .map(course -> course._toConvertCourseDAO())
                .collect(Collectors.toList());
    }
}
