package com.manolispapadimitriou.learningplatformbackend.model;

import com.manolispapadimitriou.learningplatformbackend.entity.User;
import lombok.Data;

@Data
public class LatestComment {
    private User user;
    private String date;
}
