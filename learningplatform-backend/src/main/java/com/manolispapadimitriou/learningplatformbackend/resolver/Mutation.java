package com.manolispapadimitriou.learningplatformbackend.resolver;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.manolispapadimitriou.learningplatformbackend.service.QuizService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class Mutation implements GraphQLMutationResolver {

    @Resource
    private QuizService quizService;

    public Boolean saveMultipleChoiceQuiz(Integer userId, Integer quizId, Integer status){
        quizService.saveMultipleChoiceAnswer(userId,quizId,status);

        return true;
    }

}
