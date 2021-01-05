package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.model.Analyzer;
import com.manolispapadimitriou.learningplatformbackend.service.ErrorHandler;
import com.manolispapadimitriou.learningplatformbackend.util.Data;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Component
public class ErrorHandlerImpl implements ErrorHandler {
    private String errorType;

    @Override
    public List<Analyzer> getErrors(String language, String wrongAnswer, String correctAnswer) throws SQLException, ClassNotFoundException {
        errorType = determineErrorType(language,wrongAnswer);
        List<Analyzer> analyzers = new ArrayList<>();
        if(errorType.equals(Data.SYNTAX)){
            analyzers = getErrors(language, wrongAnswer);
        }else{
            analyzers = getLogixErrors(language, wrongAnswer);

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

    /**
     *
     * @param wrongAnswer
     * @return
     */
    private List<Analyzer> getErrors(String language, String wrongAnswer){
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

//                        System.out.println(keyword+": " + tokens[1]);
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
//                                System.out.println("\t\tKeyword: " + keyword_check +" is at " +index);
                            }
                        }
                        String finalText = "";
                        if(!min_keyword.isEmpty()){
//                            System.out.println("\t Closer keyword is " + min_keyword + " at position " + min);
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
                        ;
                        System.out.println("\t format is " + KeywordEnum.getByValue(keyword).checkFormat());

                    }

                }

                analyzer = new Analyzer(Data.SELECT, errorType, "TEST");
            }else{
                analyzer = new Analyzer(Data.WRONG_FORMAT, errorType, "Wrong Format, answer could not be analyzed.");
            }
            analyzers.add(analyzer);
        }
        return analyzers;

    }


    private List<Analyzer> getLogixErrors(String language, String wrongAnswer){
        List<Analyzer> analyzers = new ArrayList<>();
        Analyzer analyzer = new Analyzer("TMP", errorType, "TMP");
        analyzers.add(analyzer);
        return analyzers;

    }




}
