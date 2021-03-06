package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.model.Analyzer;
import com.manolispapadimitriou.learningplatformbackend.service.ErrorHandler;
import com.manolispapadimitriou.learningplatformbackend.stringsimilarity.SorensenDice;
import com.manolispapadimitriou.learningplatformbackend.util.Data;
import org.h2.jdbc.JdbcResultSetMetaData;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

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
            //Checking select
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

            }
            else if(wrongAnswer.toUpperCase().startsWith(Data.INSERT)){
                Boolean keywordStatus = KeywordEnum.getByValue(Data.INSERT).checkFormat(wrongAnswer.toUpperCase(Locale.ROOT));
                if(!keywordStatus){
                    analyzers.add(new Analyzer(Data.INSERT, errorType, KeywordReasonEnum.getByValue(Data.INSERT).getReason()));
                }
            }
            else if(wrongAnswer.toUpperCase().startsWith(Data.UPDATE)){
                Boolean keywordStatus = KeywordEnum.getByValue(Data.UPDATE).checkFormat(wrongAnswer.toUpperCase(Locale.ROOT));
                if(!keywordStatus){
                    analyzers.add(new Analyzer(Data.UPDATE, errorType, KeywordReasonEnum.getByValue(Data.UPDATE).getReason()));
                }
            }
            else if(wrongAnswer.toUpperCase().startsWith(Data.CREATE)){
                Boolean keywordStatus = KeywordEnum.getByValue(Data.CREATE).checkFormat(wrongAnswer.toUpperCase(Locale.ROOT));
                if(!keywordStatus){
                    analyzers.add(new Analyzer(Data.CREATE, errorType, KeywordReasonEnum.getByValue(Data.CREATE).getReason()));
                }
            }
            else{
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
    private List<Analyzer> getLogicErrors(String language, String wrongAnswer, String correctAnswer) throws SQLException {
        List<Analyzer> analyzers = new ArrayList<>();
        if(language.toUpperCase(Locale.ROOT).equals(Data.SQL)){
            /**
             * TODO List:
             * 1 - Create all tables for test purposes
             *  1.1 - Handle create database differently
             *  1.2 - If answer has CREATE TABLE, execute the creation delete if exists
             *  1.3 - See how to get results from INSERT
             * 2 - Execute them and compare the results
             * 3 - Breakdown correctAnswer and wrongAnswer and find the differences
             * 4 - Return the list of differences
             */

            //TODO format string and spaces
            //Splitting based on spaces and comparing the words
            String[] correctSplit = correctAnswer.toUpperCase(Locale.ROOT).split(" ");
            String[] wrongSplit = wrongAnswer.toUpperCase(Locale.ROOT).split(" ");
            //Way 1, comparing word by word
            analyzers.addAll(compareStrings(correctSplit, wrongSplit));

            //CREATE statement handling
            if(correctAnswer.toUpperCase(Locale.ROOT).startsWith(Data.CREATE)){
                //If similarity is zero, it means it has no similarities and return a message for that
                if( SorensenDice.similarity(wrongAnswer.toUpperCase(Locale.ROOT), correctAnswer.toUpperCase(Locale.ROOT)) < 0.2){
                    analyzers.add(0, new Analyzer("logic", "logic", "Given answer is not related with the correct answer"));
                }
                else{
                    return Collections.emptyList();
                }
            }
            else{
                /**
                 * Execute correct and wrong answers and compare them
                 */
                try{
                    List<String> wrongValuesFromColumns = getValuesFromColumns(wrongAnswer);
                    List<String> correctValuesFromColumns = getValuesFromColumns(correctAnswer);

                    //If they are the same and distance is greater than 0.7 we empty the wrong ones
                    if(wrongValuesFromColumns.equals(correctValuesFromColumns)
                            && SorensenDice.similarity(wrongAnswer.toUpperCase(Locale.ROOT), correctAnswer.toUpperCase(Locale.ROOT)) > 0.7){
                        return Collections.emptyList();
                    }
                }catch (Exception e){
                    //Because of Step 1, analyzers will be kept.
                    System.out.println("RCS: " + e.getMessage());
                }

            }

        }

        return analyzers;

    }

    /**
     * Compares two string and returns the differences
     * @param correct
     * @param wrong
     * @return
     */
    private List<Analyzer> compareStrings(String[] correct, String[] wrong){
        List<Analyzer> analyzers = new ArrayList<>();
        List<String> wrongWords = new ArrayList<>();
        List<String> correctWords = new ArrayList<>();

        //Setting size to not be out of bounds
        int size = correct.length;
        if(correct.length > wrong.length){
            size = wrong.length;
        }

        //comparing each word
        int i;
        for(i=0; i<size; i++){
            if(!correct[i].equals(wrong[i])){
                analyzers.add(calculateLogicError(correct[i], wrong[i]));
            }
        }

        //If wrong is greater than correct, we have to return the redundant
        if(correct.length < wrong.length){
            for(int j=i; j < wrong.length; j++){
                analyzers.add(calculateLogicError("", wrong[j]));
            }
        }
        else if(correct.length > wrong.length){
            for(int j=i; j < correct.length; j++){
                analyzers.add(calculateLogicError(correct[j], "Not given"));
            }
        }

        return analyzers;

    }


    private Analyzer calculateLogicError(String correct, String wrong){
        String correctReason = correct;
        String wrongReason = wrong;

        //Changing case when it's not a keyword
        if(KeywordEnum.getByValue(wrongReason) == null){
            wrongReason = wrongReason.toLowerCase(Locale.ROOT);
        }
        if(KeywordEnum.getByValue(correctReason) == null){
            correctReason = correctReason.toLowerCase(Locale.ROOT);
        }

        return new Analyzer(Data.LOGIC, Data.LOGIC, wrongReason + " #PLACEHOLDER# " +correctReason);
    }


    private List<String> getValuesFromColumns(String answer) throws SQLException {
        Connection con = DriverManager.getConnection(Data.DB_URL, Data.USER, Data.PASSWORD);
        con.prepareStatement(answer).getMetaData();
        //----- Exception Free -----
        //Way 2, comparing by result
        //Step 2. Executing both syntax free queries
        //Step 2.1. Wrong query is correct, execute correct query also and save the results for both of them
        //Step 2.2. Compare the results and if there are differences return, if not empty the analyzers table.



        JdbcResultSetMetaData jdbcResultSetMetaData = (JdbcResultSetMetaData) con.prepareStatement(answer).executeQuery().getMetaData();

        //1.Get column count
        int columnCount = jdbcResultSetMetaData.getColumnCount();

        //2.For each column get name
        ResultSet resultSet = con.prepareStatement(answer).executeQuery();
        List<String> columnData = new ArrayList<>();
        //3. For each column name get results
        while (resultSet.next()) {
            //Loop all column names and save result
            for(int i = 1; i <= columnCount; i++){
                columnData.add(resultSet.getString(jdbcResultSetMetaData.getColumnName(i)));
            }

        }

        //Do it for the correct also. Sort the columns
        return columnData.stream().sorted().collect(Collectors.toList());

    }

}
