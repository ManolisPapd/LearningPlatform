package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.dto.ValkaniumDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Valkanium;
import com.manolispapadimitriou.learningplatformbackend.mapper.ValkaniumMapper;
import com.manolispapadimitriou.learningplatformbackend.repository.ValkaniumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class ValkaniumService {
    @Autowired
    private ValkaniumRepository valkaniumRepository;

    @Autowired
    private ValkaniumMapper valkaniumMapper;

    @Transactional
    public void delete(){
        Valkanium byId = valkaniumRepository.findByName("a");
        ValkaniumDTO valkaniumDTO = valkaniumMapper.toValkaniumDTO(byId);
        valkaniumDTO.setName("bbbb");
        valkaniumRepository.saveAndFlush(valkaniumMapper.toValkanium(valkaniumDTO));

    }
}
