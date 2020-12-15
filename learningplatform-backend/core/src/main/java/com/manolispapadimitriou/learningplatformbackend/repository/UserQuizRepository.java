package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.UserQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserQuizRepository extends JpaRepository<UserQuiz, Integer> {
    Optional<UserQuiz> findAllByUserIdAndQuizId(Integer userId, Integer quizId);
    UserQuiz findByUserIdAndQuizId(Integer userId, Integer quizId);
    void deleteAllByUserId(Integer userId);
}
