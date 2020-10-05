package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dao.CourseDAO;
import com.manolispapadimitriou.learningplatformbackend.entity.Course;
import com.manolispapadimitriou.learningplatformbackend.entity.UserCourse;
import com.manolispapadimitriou.learningplatformbackend.repository.CourseRepository;
import com.manolispapadimitriou.learningplatformbackend.repository.UserCoursesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private UserCoursesRepository userCoursesRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseDAO> findAllCoursesByUser(Integer userId){
        List<UserCourse> userCoursesDAO = userCoursesRepository.findAllByUserId(userId);

        List<Course> userCourses = userCoursesDAO.stream()
                .map(course -> courseRepository.findById(course.getId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());



        return userCourses.stream()
                .map(course -> course._toConvertCourseDAO())
                .collect(Collectors.toList());
    }
}
