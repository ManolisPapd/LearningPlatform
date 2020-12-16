package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.model.Analyzer;
import com.manolispapadimitriou.learningplatformbackend.service.ErrorHandler;

import java.util.List;

public class ErrorHandlerImpl implements ErrorHandler {
    
    @Override
    public List<Analyzer> getErrors(String language, String wrongAnswer, String correctAnswer) {
        return null;
    }
}
