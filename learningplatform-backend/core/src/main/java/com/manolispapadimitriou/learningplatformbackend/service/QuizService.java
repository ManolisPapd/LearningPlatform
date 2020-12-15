package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.entity.Quiz;
import com.manolispapadimitriou.learningplatformbackend.entity.UserQuiz;
import com.manolispapadimitriou.learningplatformbackend.model.Status;
import com.manolispapadimitriou.learningplatformbackend.repository.QuizRepository;
import com.manolispapadimitriou.learningplatformbackend.repository.UserQuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;

    private final UserQuizRepository userQuizRepository;

    public QuizService(QuizRepository quizRepository, UserQuizRepository userQuizRepository) {
        this.quizRepository = quizRepository;
        this.userQuizRepository = userQuizRepository;
    }


    public List<Quiz> getSectionQuiz(Integer sectionId){
      return  quizRepository.findAllBySectionIdAndForSection(sectionId,1);

    }

    public List<Quiz> getFinalQuiz(Integer sectionId){
        return  quizRepository.findAllBySectionIdAndForSectionAndWhenFailed(sectionId,0,0);
    }

    public List<Quiz> getFinalQuizWhenFailed(Integer sectionId){
        return  quizRepository.findAllBySectionIdAndForSection(sectionId,0);
    }

    //Will calculate if user failed the section quiz on final quiz
    public Status calculateSectionStatus(Integer userId, Integer sectionId,Boolean sectionQuiz){
        Status status = new Status(false,false,0);
        //Get all final quiz for given section and given user
        int forSection = 0;
        if(sectionQuiz){
            forSection = 1;
        }
        List<Quiz> quizzesBySectionNoFail = quizRepository.findAllBySectionIdAndForSectionAndWhenFailed(sectionId,forSection,0);

        List<UserQuiz> userQuizzes = quizzesBySectionNoFail.stream()
                .map(quiz -> userQuizRepository.findAllByUserIdAndQuizId(userId, quiz.getId().intValue()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        List<Integer> statusList =
                userQuizzes.stream()
                        .map(UserQuiz::getStatus)
                        .collect(Collectors.toList());

        if(statusList.size() >= 4){
            int sum = userQuizzes.stream().mapToInt(UserQuiz::getStatus).sum();
            if(sum < 4){
                status.setFailed(true);
            }
            else{
                status.setFailed(false);
            }
            status.setCompleted(true);
            status.setAnswers(sum);
            return status;
        }

        return status;

    }

    //Save multiple choice answer
    public void saveMultipleChoiceAnswer(Integer userId, Integer quizId, Integer status){
        //Get the object by userId and quizId IF exists
        UserQuiz userQuiz = userQuizRepository.findByUserIdAndQuizId(userId, quizId);
        if(userQuiz == null){
            userQuiz = new UserQuiz();
            userQuiz.setUserId(userId);
            userQuiz.setQuizId(quizId);
        }

        //Change the status
        userQuiz.setStatus(status);

        //Save/Update it
        userQuizRepository.save(userQuiz);

    }

    //Return list of user_quiz based on userId and sectionId
    public List<UserQuiz> getUserQuizzesBySection(Integer userId, Integer sectionId, Boolean sectionFlag){
        //Get quizzes ids by sectionId
        int sectionIdFlag = 0;
        if(sectionFlag)
            sectionIdFlag = 1;
        List<Quiz> allQuizzes = quizRepository.findAllBySectionIdAndForSection(sectionId, sectionIdFlag);

        //Get user_quizzes by quizId and userId
        return allQuizzes.stream()
                .map(quiz -> userQuizRepository.findAllByUserIdAndQuizId(userId, quiz.getId().intValue()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());



    }


    public void resetData(Integer userId){
        userQuizRepository.deleteAllByUserId(userId);
    }


}
