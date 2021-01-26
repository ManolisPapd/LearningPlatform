package com.manolispapadimitriou.learningplatformbackend.model;

import lombok.Data;

import java.util.List;

@Data
public class SectionInformationWrapper {
    private String sectionName;
    private List<SectionInformation> sectionInformationList;
}
