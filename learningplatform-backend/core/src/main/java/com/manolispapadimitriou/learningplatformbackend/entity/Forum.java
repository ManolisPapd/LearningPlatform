package com.manolispapadimitriou.learningplatformbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Forum {

    @Id
    private Integer id;
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "parentId")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<ForumTopic> forumTopics;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "forumId")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<ForumPost> forumPosts;

}
