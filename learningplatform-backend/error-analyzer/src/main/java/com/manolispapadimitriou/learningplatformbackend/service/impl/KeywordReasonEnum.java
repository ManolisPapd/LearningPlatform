package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.util.Data;
import com.manolispapadimitriou.learningplatformbackend.util.SqlData;


public enum KeywordReasonEnum {
    SELECT(Data.SELECT){
        @Override
        public String getReason() {
            return "SELECT format should be SELECT [select_keywords] [expression]";
        }
    },
    FROM(Data.FROM){
        @Override
        public String getReason() {
            return "FROM format should be FROM [TABLE]";
        }
    },
    WHERE(Data.WHERE){
        @Override
        public String getReason() {
            return "WHERE format should be WHERE [expression]";
        }
    },
    GROUP_BY(Data.GROUP_BY){
        @Override
        public String getReason() {
            return null;
        }
    },
    HAVING(Data.HAVING){
        @Override
        public String getReason() {
            return null;
        }
    },
    ORDER_BY(Data.ORDER_BY){
        @Override
        public String getReason() {
            return null;
        }
    },
    LIMIT(Data.LIMIT){
        @Override
        public String getReason() {
            return null;
        }
    };

    private String value;

    KeywordReasonEnum(String value) {
        this.value = value;
    }

    public abstract String getReason();

    public static KeywordReasonEnum getByValue(String value){
        for(KeywordReasonEnum keywordEnum : KeywordReasonEnum.values()){
            if(value.equals(keywordEnum.value)){
                return keywordEnum;
            }
        }
        return null;
    }

}
