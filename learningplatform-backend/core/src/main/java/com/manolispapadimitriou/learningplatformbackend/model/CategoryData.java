package com.manolispapadimitriou.learningplatformbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryData {
    private String category;
    private String categoryInformation;
    private Integer topics;
    private Integer posts;
    private LatestComment latestComment;
}
