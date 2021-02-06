package com.manolispapadimitriou.learningplatformbackend.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.manolispapadimitriou.learningplatformbackend.dto.CourseDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ForumDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.SectionDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Forum;
import com.manolispapadimitriou.learningplatformbackend.model.AuthData;
import com.manolispapadimitriou.learningplatformbackend.entity.Quiz;
import com.manolispapadimitriou.learningplatformbackend.entity.User;
import com.manolispapadimitriou.learningplatformbackend.entity.UserQuiz;
import com.manolispapadimitriou.learningplatformbackend.model.Analyzer;
import com.manolispapadimitriou.learningplatformbackend.model.Status;
import com.manolispapadimitriou.learningplatformbackend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.sql.SQLException;
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

    @Autowired
    private ErrorHandler errorHandler;

    @Autowired
    private ForumService forumService;

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

    public List<CourseDTO> userCourses(Integer id){

        return courseService.findAllCoursesByUser(id);
    }

    public List<SectionDTO> courseSections(Integer id){
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

    public SectionDTO getSection(Integer courseId, Integer sectionId){
        return sectionService.getSectionByCourseId(courseId, sectionId);
    }

    public List<Analyzer> errorAnalyzer(String language, String wrongAnswer, String correctAnswer) throws SQLException, ClassNotFoundException {
        //Replacing ; because of errors
        return errorHandler.getErrors(language, wrongAnswer.replaceAll(";",""), correctAnswer.replaceAll(";",""));
    }

    public ForumDTO getForumData(String name){
        return forumService.getForumTopicData(name);
    }


}
