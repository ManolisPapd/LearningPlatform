package com.manolispapadimitriou.learningplatformbackend.mapper.converter;

import com.manolispapadimitriou.learningplatformbackend.dto.ForumCommentDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ForumPostDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ForumTopicDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Forum;
import com.manolispapadimitriou.learningplatformbackend.entity.ForumComment;
import com.manolispapadimitriou.learningplatformbackend.entity.ForumPost;
import com.manolispapadimitriou.learningplatformbackend.entity.ForumTopic;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ForumConverter {

    @Named("covertToTopics")
    public List<ForumTopicDTO> covertToTopics(Forum forum){
        return convertTopics(forum.getForumTopics());
    }

    @Named("covertToPosts")
    public List<ForumPostDTO> covertToPosts(Forum forum){
        return convertPosts(forum.getForumPosts());
    }

    private List<ForumTopicDTO> convertTopics(List<ForumTopic> forumTopics){
        List<ForumTopicDTO> forumTopicDTOS = new ArrayList<>();
        for(ForumTopic forumTopic : forumTopics){
            forumTopicDTOS.add(new ForumTopicDTO(forumTopic.getChildId().getId(),forumTopic.getChildId().getName(),convertPosts(forumTopic.getChildId().getForumPosts())));
        }
        return forumTopicDTOS;
    }

    private List<ForumPostDTO> convertPosts(List<ForumPost> forumPosts){
        List<ForumPostDTO> forumPostDTOS = new ArrayList<>();
        for(ForumPost forumPost : forumPosts){
            forumPostDTOS.add(new ForumPostDTO(forumPost.getId(),forumPost.getTitle(),forumPost.getBody(),forumPost.getUserId(),DateFormatUtils.format(forumPost.getDateCreated(), "dd-MM-yyyy"),DateFormatUtils.format(forumPost.getDateNewPost(), "dd-MM-yyyy"),convertComments(forumPost.getForumComments())));
        }

        return forumPostDTOS;
    }

    private List<ForumCommentDTO> convertComments(List<ForumComment> forumComments){
        List<ForumCommentDTO> forumCommentDTOS = new ArrayList<>();

        for(ForumComment forumComment : forumComments){
            forumCommentDTOS.add(new ForumCommentDTO(forumComment.getId(), forumComment.getBody(),forumComment.getUserId(),DateFormatUtils.format(forumComment.getDateCreated(), "dd-MM-yyyy")));
        }

        return forumCommentDTOS;

    }

}
