package com.manolispapadimitriou.learningplatformbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseWrapper {
    private List<CategoryData> categories;
}
