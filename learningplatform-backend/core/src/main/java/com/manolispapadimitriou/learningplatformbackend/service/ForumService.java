package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dto.ForumDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Forum;
import com.manolispapadimitriou.learningplatformbackend.mapper.ForumMapper;
import com.manolispapadimitriou.learningplatformbackend.repository.ForumRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

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
}
