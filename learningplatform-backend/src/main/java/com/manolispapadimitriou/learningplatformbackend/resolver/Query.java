package com.manolispapadimitriou.learningplatformbackend.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.manolispapadimitriou.learningplatformbackend.dao.CourseDAO;
import com.manolispapadimitriou.learningplatformbackend.dao.SectionDAO;
import com.manolispapadimitriou.learningplatformbackend.dao.Status;
import com.manolispapadimitriou.learningplatformbackend.entity.AuthData;
import com.manolispapadimitriou.learningplatformbackend.entity.Quiz;
import com.manolispapadimitriou.learningplatformbackend.entity.User;
import com.manolispapadimitriou.learningplatformbackend.entity.UserQuiz;
import com.manolispapadimitriou.learningplatformbackend.service.CourseService;
import com.manolispapadimitriou.learningplatformbackend.service.QuizService;
import com.manolispapadimitriou.learningplatformbackend.service.SectionService;
import com.manolispapadimitriou.learningplatformbackend.service.UserService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Component
public class Query implements GraphQLQueryResolver {

    @Resource
    private UserService userService;

    @Resource
    private CourseService courseService;

    @Resource
    private SectionService sectionService;

    @Resource
    private QuizService quizService;

    public List<User> allUsers() {
        return userService.findAll();
    }

    public AuthData login(String email, String password){

           User user = userService.findUser(email,password);
           AuthData authData = new AuthData();
           authData.setId(user.getId());
           authData.setToken("Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZW9maXRvcyIsImV4cCI6MTU4MDQwMjA5OSwiaWF0IjoxNTgwMzczMjk5fQ.sEzphOQuzMX51ufSSsKSJxdZvLuAMfzCfEZCm-LV-TwUE_Va9nxYZZ-QMD6jc4KqjwGrdtGeILjvzP68TRIpig");
           authData.setTokenExpiration(12700);

           return authData;


    }

    public List<CourseDAO> userCourses(Long id){

        return courseService.findAllCoursesByUser(id);
    }

    public List<SectionDAO> courseSections(Long id){
        return sectionService.findAllSectionsByCourse(id);
    }

    public List<Quiz> allQuiz(Integer sectionId, Boolean sectionQuiz, Boolean failed ){
        List<Quiz> quiz = new ArrayList<>();
        //Section quiz requested
        if(sectionQuiz && !failed){
            quiz = quizService.getSectionQuiz(sectionId);
        }
        //Final quiz requested with no fail
        else if(!sectionQuiz && !failed ){
            quiz = quizService.getFinalQuiz(sectionId);
        }
        //Final quiz requested with fail
        else{
            quiz = quizService.getFinalQuizWhenFailed(sectionId);
        }

        return quiz;
    }

    public Status checkUserSectionStatus(Integer userId, Integer sectionId,Boolean sectionQuiz){
        return quizService.calculateSectionStatus(userId,sectionId,sectionQuiz);

    }

    public List<UserQuiz> getQuizzesStatus(Integer userId, Integer sectionId, Boolean sectionFlag ){
        return quizService.getUserQuizzesBySection(userId,sectionId,sectionFlag);

    }

}
