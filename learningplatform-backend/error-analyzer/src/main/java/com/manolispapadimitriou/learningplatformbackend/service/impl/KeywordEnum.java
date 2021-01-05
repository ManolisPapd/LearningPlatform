package com.manolispapadimitriou.learningplatformbackend.service.impl;

import com.manolispapadimitriou.learningplatformbackend.util.Data;

public enum KeywordEnum {
    SELECT(Data.SELECT){
        @Override
        public Boolean checkFormat() {
            return null;
        }
    },
    FROM(Data.FROM){
        @Override
        public Boolean checkFormat() {
            return null;
        }
    },
    WHERE(Data.WHERE){
        @Override
        public Boolean checkFormat() {
            return null;
        }
    },
    GROUP_BY(Data.GROUP_BY){
        @Override
        public Boolean checkFormat() {
            return null;
        }
    },
    HAVING(Data.HAVING){
        @Override
        public Boolean checkFormat() {
            return null;
        }
    },
    ORDER_BY(Data.ORDER_BY){
        @Override
        public Boolean checkFormat() {
            return null;
        }
    },
    LIMIT(Data.LIMIT){
        @Override
        public Boolean checkFormat() {
            return null;
        }
    };

    private String value;

    KeywordEnum(String value) {
        this.value = value;
    }

    public abstract Boolean checkFormat();

    public static KeywordEnum getByValue(String value){
        for(KeywordEnum keywordEnum : KeywordEnum.values()){
            if(value.equals(keywordEnum.value)){
                return keywordEnum;
            }
        }
        return null;
    }

}
