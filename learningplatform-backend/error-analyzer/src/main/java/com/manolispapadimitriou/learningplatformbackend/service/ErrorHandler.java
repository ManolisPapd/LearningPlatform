package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.model.Analyzer;

import java.sql.SQLException;
import java.util.List;

public interface ErrorHandler {
    public List<Analyzer> getErrors(String language, String wrongAnswer, String correctAnswer) throws SQLException, ClassNotFoundException;
}
