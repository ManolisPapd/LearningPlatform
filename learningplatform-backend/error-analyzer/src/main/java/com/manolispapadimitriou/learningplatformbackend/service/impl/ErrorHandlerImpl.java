package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.model.Analyzer;
import com.manolispapadimitriou.learningplatformbackend.service.ErrorHandler;
import com.manolispapadimitriou.learningplatformbackend.util.Data;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.Arrays;
import java.util.List;

@Component
public class ErrorHandlerImpl implements ErrorHandler {

    @Override
    public List<Analyzer> getErrors(String language, String wrongAnswer, String correctAnswer) throws SQLException, ClassNotFoundException {
        List<Analyzer> analyzers = Arrays.asList(new Analyzer("SELECT", determineErrorType(language,wrongAnswer), "Correct format of SELECT IS"));
        return analyzers;
    }

    private String determineErrorType(String language, String wrongAnswer) throws ClassNotFoundException, SQLException {
        if(language.equalsIgnoreCase(Data.SQL)){
            Class.forName(Data.JDBC_DRIVER);

            Connection con = DriverManager.getConnection(Data.DB_URL, Data.USER, Data.PASSWORD);
            try {
                con.prepareStatement(wrongAnswer).getMetaData();
            }catch (SQLSyntaxErrorException e){
                if(e.getMessage().startsWith(Data.SYNTAX_CHECKER)){
                    return Data.SYNTAX;
                }
            }
        }
        return Data.LOGIC;
    }
}
