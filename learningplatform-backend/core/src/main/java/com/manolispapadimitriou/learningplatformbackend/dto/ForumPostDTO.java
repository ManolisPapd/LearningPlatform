package com.manolispapadimitriou.learningplatformbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.manolispapadimitriou.learningplatformbackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
public class ForumPostDTO {
    private Integer id;
    private String title;
    private String body;
    private User user;
    private String dateCreated;
    private String dateNewPost;
    private List<ForumCommentDTO> comments;
}
