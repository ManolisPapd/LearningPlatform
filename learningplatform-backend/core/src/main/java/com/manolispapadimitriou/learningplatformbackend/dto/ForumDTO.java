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
public class ForumDTO {
    private List<ForumTopicDTO> topics;
    private List<ForumPostDTO> posts;
}
