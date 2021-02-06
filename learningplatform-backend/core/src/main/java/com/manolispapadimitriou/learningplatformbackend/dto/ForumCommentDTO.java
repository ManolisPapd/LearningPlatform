package com.manolispapadimitriou.learningplatformbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manolispapadimitriou.learningplatformbackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
public class ForumCommentDTO {
    private Integer id;
    private String body;
    private User user;
    private String dateCreated;
}
