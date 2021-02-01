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
            return "GROUP BY format should be GROUP BY {col_name | expr | position}";
        }
    },
    HAVING(Data.HAVING){
        @Override
        public String getReason() {
            return "HAVING format should be GROUP BY {col_name | expr | position}";
        }
    },
    ORDER_BY(Data.ORDER_BY){
        @Override
        public String getReason() {
            return "ORDER BY format should be ORDER BY {col_name | expr | position} [ASC | DESC]";
        }
    },
    LIMIT(Data.LIMIT){
        @Override
        public String getReason() {
            return "LIMIT format should be LIMIT {[offset,] row_count | row_count OFFSET offset}";
        }
    },
    INSERT(Data.INSERT){
        @Override
        public String getReason() {
            return "INSERT format should be INSERT INTO [table](column1 .. column n) VALUES (value1 .. value n)";
        }
    },
    UPDATE(Data.UPDATE){
        @Override
        public String getReason() {
            return "UPDATE format should be UPDATE [table] SET [assignment expression] WHERE [where expression]";
        }
    },
    JOIN(Data.JOIN){
        @Override
        public String getReason() {
            return "JOIN format should be JOIN [table] AS [name] ON [tables relation]";
        }
    },
    INNER_JOIN(Data.INNER_JOIN){
        @Override
        public String getReason() {
            return "INNER JOIN format should be INNER JOIN [table] AS [name] ON [tables relation]";
        }
    },
    LEFT_JOIN(Data.LEFT_JOIN){
        @Override
        public String getReason() {
            return "LEFT JOIN format should be LEFT JOIN [table] AS [name] ON [tables relation]";
        }
    },
    RIGHT_JOIN(Data.RIGHT_JOIN){
        @Override
        public String getReason() {
            return "RIGHT JOIN format should be RIGHT JOIN [table] AS [name] ON [tables relation]";
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
