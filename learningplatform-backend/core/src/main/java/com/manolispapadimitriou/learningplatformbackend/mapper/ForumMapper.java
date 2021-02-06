package com.manolispapadimitriou.learningplatformbackend.mapper;

import com.manolispapadimitriou.learningplatformbackend.dto.ForumDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Forum;
import com.manolispapadimitriou.learningplatformbackend.mapper.converter.ForumConverter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring", uses = {ForumConverter.class})
public abstract class ForumMapper {

    @Mappings({
            @Mapping(target = "topics", source = "forum", qualifiedByName = "covertToTopics"),
            @Mapping(target = "posts", source = "forum", qualifiedByName = "covertToPosts")
    })
    public abstract ForumDTO toForumDTO(Forum forum);

}
