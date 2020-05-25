package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.UserQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserQuizRepository extends JpaRepository<UserQuiz, Long> {
    Optional<UserQuiz> findAllByUserIdAndQuizId(Integer userId, Integer quizId);
    UserQuiz findByUserIdAndQuizId(Integer userId, Integer quizId);
    void deleteAllByUserId(Integer userId);
}
