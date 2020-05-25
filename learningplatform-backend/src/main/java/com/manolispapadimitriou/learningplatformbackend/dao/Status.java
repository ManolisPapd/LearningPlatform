package com.manolispapadimitriou.learningplatformbackend.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Status {
    private Boolean failed;
    private Boolean completed;
    private Integer answers;

    public Status(Boolean failed, Boolean completed, Integer answers) {
        this.failed = failed;
        this.completed = completed;
        this.answers = answers;
    }
}
