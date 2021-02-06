package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Integer> {
    Forum findAllByName(String name);
}
