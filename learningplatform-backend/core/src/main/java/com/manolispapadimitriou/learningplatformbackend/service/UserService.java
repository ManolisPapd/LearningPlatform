package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.entity.User;
import com.manolispapadimitriou.learningplatformbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUser(String email, String password){

       User user = userRepository.findByEmail(email);

       if(user.getPassword().equals(password)){
           return user;
       }
       throw new NullPointerException("Wrong Credentials");

    }

    public List<User> findAll() {
        return userRepository.findAll();
    }


}
