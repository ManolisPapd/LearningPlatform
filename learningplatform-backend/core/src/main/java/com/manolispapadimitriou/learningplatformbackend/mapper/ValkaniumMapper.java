package com.manolispapadimitriou.learningplatformbackend.mapper;

import com.manolispapadimitriou.learningplatformbackend.dto.ForumDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.ValkaniumDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Forum;
import com.manolispapadimitriou.learningplatformbackend.entity.Valkanium;
import com.manolispapadimitriou.learningplatformbackend.mapper.converter.ForumConverter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public abstract class ValkaniumMapper {

    @Mappings({
            @Mapping(target = "megame", source = "megame"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "uuid", source = "uuid")
    })
    public abstract ValkaniumDTO toValkaniumDTO(Valkanium valkanium);

    @Mappings({
            @Mapping(target = "megame", source = "megame"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "uuid", source = "uuid")
    })
    public abstract Valkanium toValkanium(ValkaniumDTO valkaniumDTO);

}
