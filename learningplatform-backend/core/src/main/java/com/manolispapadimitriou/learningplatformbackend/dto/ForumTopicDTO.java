package com.manolispapadimitriou.learningplatformbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
public class ForumTopicDTO {
    private Integer id;
    private String name;
    private List<ForumPostDTO> posts;
}
