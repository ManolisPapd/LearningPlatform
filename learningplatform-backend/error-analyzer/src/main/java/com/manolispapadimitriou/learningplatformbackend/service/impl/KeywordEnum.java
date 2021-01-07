package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.util.Data;
import com.manolispapadimitriou.learningplatformbackend.util.SqlData;


public enum KeywordEnum {
    SELECT(Data.SELECT){
        @Override
        public Boolean checkFormat(String answerPart) {
            /**
             * Step 1. Split based on select keyword.
             * If splitFromSelectKeywords.length == 2 it means that this keyword was present
             * Save splitFromSelectKeywords[1] if it's present, else keep using answerPart
             *
             */
            String[] splitFromSelectKeywords = answerPart.split("(?i)"+SqlData.SELECT_ALL + "|" +
                    "(?i)"+SqlData.SELECT_DISTINCT + "|" + "(?i)"+SqlData.SELECT_DISTINCTROW + "|" +
                    "(?i)"+SqlData.SELECT_HIGH_PRIORITY );
            String answerPartRedefined = answerPart;
            if(splitFromSelectKeywords.length == 2){
                answerPartRedefined = splitFromSelectKeywords[1];
            }

            /**
             * Step 2. Checking if it has * or columns separated by comma or not
             */
            String[] columns = answerPartRedefined.split(",");
            if(answerPartRedefined.equals("*") || //checking *
                    (columns.length > 1 && columns[columns.length -1 ].trim().matches("[A-Za-z0-9]+") && !columns[columns.length -1 ].trim().isEmpty() && columns[columns.length -1 ] != null  ) || //checking multiple columns and the last item is not symbol, empty or null
                    (columns.length == 1 && columns[0].trim().matches("[A-Za-z0-9]+") && !columns[0].trim().isEmpty() && columns[0] != null) //checking is one column is not symbol, null or empty
            ){
                return true;
            }

            return false;
        }
    },
    FROM(Data.FROM){
        @Override
        public Boolean checkFormat(String answerPart) {
            /**
             * Step 1. FROM [TABLE] should not be symbol, empty or null.
             * Step 2. [TABlE] should be split to be checked if it has a name
             */
            String[] naming = answerPart.split(" ");
            if(naming.length == 3){ //It means the final element is the name
                /**
                 * second and third element will be checked if they are not symbol, null or empty
                 */
                if(!naming[1].isEmpty() && naming[1].trim().matches("[A-Za-z0-9]+") && naming[1] != null &&
                        !naming[2].isEmpty() && naming[2].trim().matches("[A-Za-z0-9]+") && naming[2] != null ){
                    return true;
                }
            }
            else{ //Checking table name
                if(!answerPart.isEmpty() && answerPart.trim().matches("[A-Za-z0-9]+")){
                    return true;
                }
            }

            return false;
        }
    },
    WHERE(Data.WHERE){
        @Override
        public Boolean checkFormat(String answerPart) {
            /**
             * Step 1. Check no null or empty
             */
            if(answerPart != null && !answerPart.isEmpty()){
                return true;
            }
            return false;
        }
    },
    GROUP_BY(Data.GROUP_BY){
        @Override
        public Boolean checkFormat(String answerPart) {
            return true;
        }
    },
    HAVING(Data.HAVING){
        @Override
        public Boolean checkFormat(String answerPart) {
            return true;
        }
    },
    ORDER_BY(Data.ORDER_BY){
        @Override
        public Boolean checkFormat(String answerPart) {
            return true;
        }
    },
    LIMIT(Data.LIMIT){
        @Override
        public Boolean checkFormat(String answerPart) {
            return true;
        }
    };

    private String value;

    KeywordEnum(String value) {
        this.value = value;
    }

    public abstract Boolean checkFormat(String answerPart);

    public static KeywordEnum getByValue(String value){
        for(KeywordEnum keywordEnum : KeywordEnum.values()){
            if(value.equals(keywordEnum.value)){
                return keywordEnum;
            }
        }
        return null;
    }

}
