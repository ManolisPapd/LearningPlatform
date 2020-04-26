package com.manolispapadimitriou.learningplatformbackend.service;

import com.manolispapadimitriou.learningplatformbackend.model.User;
import com.manolispapadimitriou.learningplatformbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findUser(String email, String password){

       User user = userRepository.findByEmail(email);

       if(user.getPassword().equals(password)){
           return user;
       }
       else{
           return null;
       }

    }

    public List<User> findAll() {
        return userRepository.findAll();
    }


}
