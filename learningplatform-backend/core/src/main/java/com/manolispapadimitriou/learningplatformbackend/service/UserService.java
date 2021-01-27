package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.entity.User;
import com.manolispapadimitriou.learningplatformbackend.entity.UserCourse;
import com.manolispapadimitriou.learningplatformbackend.repository.UserCoursesRepository;
import com.manolispapadimitriou.learningplatformbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserCoursesRepository userCoursesRepository;

    public UserService(UserRepository userRepository, UserCoursesRepository userCoursesRepository) {
        this.userRepository = userRepository;
        this.userCoursesRepository = userCoursesRepository;
    }

    public User findUser(String email, String password){

       User user = userRepository.findByEmail(email);

       if(user.getPassword().equals(password)){
           return user;
       }
       throw new NullPointerException("Wrong Credentials");

    }

    public List<User> findAll() {
        return userRepository.findAll();
    }


    public User findById(Integer id){
        return userRepository.findById(id).get();
    }

    public List<User> findUserByCourse(Integer courseId){
        List<User> users = new ArrayList<>();
        List<UserCourse> allByCourseId = userCoursesRepository.findAllByCourseId(courseId);

        for (UserCourse userCourse : allByCourseId) {
            User user = userRepository.findById(userCourse.getUserId()).get();
            users.add(user);
        }

        return users;
    }

}
