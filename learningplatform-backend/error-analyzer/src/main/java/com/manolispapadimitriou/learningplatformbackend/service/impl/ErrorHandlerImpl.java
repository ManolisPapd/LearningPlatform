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
        String errorType = determineErrorType(language,wrongAnswer);
        if(errorType.equals(Data.SYNTAX)){

        }
        List<Analyzer> analyzers = Arrays.asList(new Analyzer("SELECT", errorType, "Correct format of SELECT IS"));
        return analyzers;
    }

    /**
     * Will determine whether a question has syntax errors. If not the it has logical errors.
     * @param language
     * @param wrongAnswer
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    private String determineErrorType(String language, String wrongAnswer) throws ClassNotFoundException, SQLException {
        if(language.equalsIgnoreCase(Data.SQL)){
            Class.forName(Data.JDBC_DRIVER);

            Connection con = DriverManager.getConnection(Data.DB_URL, Data.USER, Data.PASSWORD);
            try {
                con.prepareStatement(wrongAnswer).getMetaData();
            }catch (Exception e){
                if(e.getMessage().startsWith(Data.SYNTAX_CHECKER)){
                    System.out.println(e.getMessage());
                    return Data.SYNTAX;
                }
                else if(e.getMessage().startsWith(Data.TABLE_CHECKER)){
                    /**
                     * Execute again metadata because table doesn't exist
                     */
                    try{
                        String[] test1 = wrongAnswer.split(" ");
                        //find table after select
                        String tableFromWrongAnswer = "";
                        for (int i=0; i<test1.length; i++) {
                            if(test1[i].equalsIgnoreCase(Data.FROM)){
                                tableFromWrongAnswer = test1[++i];
                            }
                        }
                        con.prepareStatement("drop table if exists " + Data.TEST_TABLE).executeUpdate();
                        con.prepareStatement("create table " + Data.TEST_TABLE +"(id int auto_increment, primary key(id))").executeUpdate();
                        String wrongAnswer1 = wrongAnswer.replace(tableFromWrongAnswer, Data.TEST_TABLE);
                        con.prepareStatement(wrongAnswer1).getMetaData();
                    }catch (Exception e1){
                        return Data.SYNTAX;
                    }

                }
            }
        }
        return Data.LOGIC;
    }

    private String queryBreakDown(String query){
        return null;
    }
}
