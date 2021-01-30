package com.manolispapadimitriou.learningplatformbackend.repository;

import com.manolispapadimitriou.learningplatformbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);
    List<User> findByRole(Integer role);
}
