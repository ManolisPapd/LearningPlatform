package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ForumComment {

    @Id
    private Integer id;
    private String body;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;
    private Date dateCreated;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private ForumPost postId;
}
