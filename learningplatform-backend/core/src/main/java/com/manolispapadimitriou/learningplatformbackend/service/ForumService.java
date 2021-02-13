package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dto.ForumCommentDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ForumDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ForumPostDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ForumTopicDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.User;
import com.manolispapadimitriou.learningplatformbackend.mapper.ForumMapper;
import com.manolispapadimitriou.learningplatformbackend.model.CategoryData;
import com.manolispapadimitriou.learningplatformbackend.model.CategoryResponseWrapper;
import com.manolispapadimitriou.learningplatformbackend.model.LatestComment;
import com.manolispapadimitriou.learningplatformbackend.repository.ForumRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    public CategoryResponseWrapper getCategoriesForum() throws ParseException {

        //1. For each category
        //2. Retrieve how many topics it has on db (call getForumTopicData and count)
        //3. Retrieve how many posts it has on db (call getForumTopicData and count)
        //4. Retrieve the latest comment (it will be present on getForumTopicData, sort by date)

        //All categories
        List<String> categoriesLiterals = Arrays.asList("Announcements", "Courses", "Help", "General Discussion", "FAQ");
        Map<String, String> categoriesLiteral = new HashMap<>();
        categoriesLiteral.put("Announcements", "value1");
        categoriesLiteral.put("Courses", "value2");
        categoriesLiteral.put("Help", "value3");
        categoriesLiteral.put("General Discussion", "value4");
        categoriesLiteral.put("FAQ", "value5");


        List<CategoryData> categories = new ArrayList<>();
        for(String categoryLiteral : categoriesLiterals){
            ForumDTO forumCategory = forumMapper.toForumDTO(forumRepository.findAllByName(categoryLiteral));
            categories.add(new CategoryData(categoryLiteral,categoriesLiteral.get(categoryLiteral),countTopics(forumCategory),countPosts(forumCategory),findLatestComment(forumCategory)));

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

    private LatestComment findLatestComment(ForumDTO forum) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");

        LatestComment latestComment = new LatestComment();
        latestComment.setDate(new SimpleDateFormat("dd-MM-yyyy").format(new Date()));

        for(ForumTopicDTO topic : forum.getTopics()){
            LatestComment incomingLatestComment = findLatestCommentFromPosts(topic.getPosts());
            if(format.parse(latestComment.getDate()).before(format.parse(incomingLatestComment.getDate()))){
                latestComment.setUser(incomingLatestComment.getUser());
                latestComment.setDate(incomingLatestComment.getDate());
            }
        }

        //find latest comment from posts
        for(ForumPostDTO post : forum.getPosts()){
            for(ForumCommentDTO comment : post.getComments()){
                if(format.parse(latestComment.getDate()).before(format.parse(comment.getDateCreated()))){
                    latestComment.setUser(comment.getUser());
                    latestComment.setDate(comment.getDateCreated());
                }
            }
        }

        if(latestComment.getUser() == null){
            latestComment.setUser(new User(0,"","","","","",0,null));
            latestComment.setDate("No comment");
        }

        return latestComment;
    }

    private LatestComment findLatestCommentFromPosts(List<ForumPostDTO> posts) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");

        LatestComment latestComment = new LatestComment();
        latestComment.setDate(new SimpleDateFormat("dd-MM-yyyy").format(new Date()));

        for(ForumPostDTO post : posts){
            for(ForumCommentDTO comment : post.getComments()){
                if(format.parse(latestComment.getDate()).before(format.parse(comment.getDateCreated()))){
                    latestComment.setUser(comment.getUser());
                    latestComment.setDate(comment.getDateCreated());
                }
            }
        }

        return latestComment;
    }
}
