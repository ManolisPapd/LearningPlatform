package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dto.ForumDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ForumTopicDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Forum;
import com.manolispapadimitriou.learningplatformbackend.mapper.ForumMapper;
import com.manolispapadimitriou.learningplatformbackend.model.CategoryData;
import com.manolispapadimitriou.learningplatformbackend.model.CategoryResponseWrapper;
import com.manolispapadimitriou.learningplatformbackend.model.LatestComment;
import com.manolispapadimitriou.learningplatformbackend.repository.ForumRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.*;

@Component
@Data
@AllArgsConstructor
public class ForumService {

    private ForumRepository forumRepository;
    private ForumMapper forumMapper;

    @Transactional
    public ForumDTO getForumTopicData(String name){
        return forumMapper.toForumDTO(forumRepository.findAllByName(name));
    }

    @Transactional
    public CategoryResponseWrapper getCategoriesForum(){

        //1. For each category
        //2. Retrieve how many topics it has on db (call getForumTopicData and count)
        //3. Retrieve how many posts it has on db (call getForumTopicData and count)
        //4. Retrieve the latest comment (it will be present on getForumTopicData, sort by date)

        //All categories
        List<String> categoriesLiterals = Arrays.asList("Announcements", "Courses", "Help", "General Discussion", "FAQ");

        List<CategoryData> categories = new ArrayList<>();
        for(String categoryLiteral : categoriesLiterals){
            ForumDTO forumCategory = forumMapper.toForumDTO(forumRepository.findAllByName(categoryLiteral));
            categories.add(new CategoryData(categoryLiteral,countTopics(forumCategory),countPosts(forumCategory),findLatestComment(forumCategory)));

        }

        return new CategoryResponseWrapper(categories);
    }


    private Integer countTopics(ForumDTO forum){
        return Optional.ofNullable(forum)
                .map(ForumDTO::getTopics)
                .map(List::size)
                .orElse(0);

    }

    private Integer countPosts(ForumDTO forum){
        int posts = Optional.ofNullable(forum)
                .map(ForumDTO::getPosts)
                .map(List::size)
                .orElse(0);

        posts += Optional.ofNullable(forum.getTopics())
                .orElse(Collections.emptyList()).stream().mapToInt(topic -> Optional.ofNullable(topic)
                        .map(ForumTopicDTO::getPosts)
                        .map(List::size)
                        .orElse(0)).sum();

        return posts;
    }

    private LatestComment findLatestComment(ForumDTO forum){
        return null;
    }
}
