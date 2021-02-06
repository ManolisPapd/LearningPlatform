package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ForumPost {

    @Id
    private Integer id;
    private String title;
    private String body;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    private Date dateCreated;
    private Date dateNewPost;

    @ManyToOne
    @JoinColumn(name = "forum_id", nullable = false)
    private Forum forumId;

    @OneToMany(mappedBy = "postId")
    private List<ForumComment> forumComments;
}
