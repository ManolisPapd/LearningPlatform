package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.model.Analyzer;
import com.manolispapadimitriou.learningplatformbackend.service.ErrorHandler;
import com.manolispapadimitriou.learningplatformbackend.util.Data;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.*;

@Component
public class ErrorHandlerImpl implements ErrorHandler {
    private String errorType;

    @Override
    public List<Analyzer> getErrors(String language, String wrongAnswer, String correctAnswer) throws SQLException, ClassNotFoundException {
        errorType = determineErrorType(language,wrongAnswer);
        List<Analyzer> analyzers;
        if(errorType.equals(Data.SYNTAX)){
            analyzers = getSyntaxErrors(language, wrongAnswer);
            //If analyzers is empty, it means that no syntax errors were found and it will be checked for syntax
            if(analyzers.isEmpty()){
                analyzers = getLogicErrors(language, wrongAnswer, correctAnswer);
            }
        }else{
            analyzers = getLogicErrors(language, wrongAnswer, correctAnswer);

        }
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
                        //TODO find also columns
                        String tableFromWrongAnswer = "";
                        for (int i=0; i<test1.length; i++) {
                            if(test1[i].equalsIgnoreCase(Data.FROM)){
                                tableFromWrongAnswer = test1[++i];
                            }
                        }
                        con.prepareStatement("drop table if exists " + Data.TEST_TABLE).executeUpdate();
                        con.prepareStatement("create table " + Data.TEST_TABLE +"(id int auto_increment, primary key(id))").executeUpdate();
                        String wrongAnswer1 = wrongAnswer.replace(tableFromWrongAnswer, Data.TEST_TABLE);
                        //TODO when query is select and then nothing, it doesn't count as wrong so we need to handle it
                        con.prepareStatement(wrongAnswer1).getMetaData();
                    }catch (Exception e1){
                        return Data.SYNTAX;
                    }

                }
            }
        }
        return Data.LOGIC;
    }

    /**
     *
     * @param language
     * @param wrongAnswer
     * @return
     */
    private List<Analyzer> getSyntaxErrors(String language, String wrongAnswer){
        List<Analyzer> analyzers = new ArrayList<>();
        if(language.equalsIgnoreCase(Data.SQL)){
            Analyzer analyzer;
            //TODO Need to check the order also
            if(wrongAnswer.toUpperCase().startsWith(Data.SELECT)){
                /**
                 * If split has 2 check the second until keyword
                 * If split has 1 it means that it wasn't entered
                 */
                List<String> keywords = Arrays.asList(Data.SELECT, Data.FROM, Data.WHERE, Data.HAVING, Data.ORDER_BY, Data.GROUP_BY, Data.LIMIT);
                for(String keyword : keywords){
                    String[] tokens = wrongAnswer.split("(?i)"+keyword);



                    if(tokens.length == 2){
                        /**
                         * Finding where is the closer keyword and will split.
                         */
                        int min = 999999;
                        String min_keyword = "";
                        for (String keyword_check : keywords) {
                            Integer index = tokens[1].toLowerCase(Locale.ROOT).indexOf(keyword_check.toLowerCase(Locale.ROOT));
                            if(index != - 1 && min > index){
                                min = index;
                                min_keyword = keyword_check;
                            }
                        }
                        String finalText = "";
                        if(!min_keyword.isEmpty()){
                            /**
                             * Will split based on this keyword
                             * But when it's the last one, it doesn't have a keyword
                             */
                            String[] finalTokens = tokens[1].toLowerCase(Locale.ROOT).split(min_keyword.toLowerCase(Locale.ROOT));
                            finalText = finalTokens[0];
                        } else{
                            finalText = tokens[1];
                        }

                        /**
                         * Checking format of the keyword
                         */
                        System.out.println(keyword + " " + finalText);

                        Boolean keywordStatus = KeywordEnum.getByValue(keyword).checkFormat(finalText);
                        System.out.println("\t format is " + keywordStatus);

                        if(!keywordStatus){ //adding the error that is the problematic
                            analyzers.add(new Analyzer(keyword, errorType, KeywordReasonEnum.getByValue(keyword).getReason()));
                        }

                    }
                    //When the keyword is the last on answer, which means that it's wrong because no present expression is there
                    // , the array length stays 1 even though it is a success
                    else if(tokens.length == 1 && wrongAnswer.toLowerCase(Locale.ROOT).contains(keyword.toLowerCase(Locale.ROOT))){
                        analyzers.add(new Analyzer(keyword, errorType, KeywordReasonEnum.getByValue(keyword).getReason()));
                    }

                }

            }else{
                analyzers.add(new Analyzer(Data.WRONG_FORMAT, errorType, "Wrong Format, answer could not be analyzed."));
            }
        }
        return analyzers;

    }


    /**
     *
     * @param language
     * @param wrongAnswer
     * @param correctAnswer
     * @return
     */
    private List<Analyzer> getLogicErrors(String language, String wrongAnswer, String correctAnswer){
        List<Analyzer> analyzers = new ArrayList<>();
        if(language.equals(Data.SQL)){
            /**
             * TODO List:
             * 1 - From correctAnswer find the tables to create and columns if possible
             * 2 - From wrongAnswer find the tables and columns and compare them with the ones from (1).
             *  2.1 - If they are not the same return
             */
        }


        Analyzer analyzer = new Analyzer("TMP", Data.LOGIC, "TMP");
        analyzers.add(analyzer);
        return analyzers;

    }


}
