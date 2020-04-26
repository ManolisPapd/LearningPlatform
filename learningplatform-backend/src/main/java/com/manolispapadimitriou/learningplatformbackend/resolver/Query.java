package com.manolispapadimitriou.learningplatformbackend.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.manolispapadimitriou.learningplatformbackend.model.AuthData;
import com.manolispapadimitriou.learningplatformbackend.model.User;
import com.manolispapadimitriou.learningplatformbackend.service.UserService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.validation.constraints.Null;
import java.util.List;

@Component
public class Query implements GraphQLQueryResolver {

    @Resource
    private UserService userService;

    public List<User> allUsers() {
        return userService.findAll();
    }

    public AuthData login(String email, String password){
        try{
           User user = userService.findUser(email,password);
           AuthData authData = new AuthData();
           authData.setId(user.getId());
           authData.setToken("$TEMP_TOKEN");
           authData.setTokenExpiration(10000);

           return authData;


        }catch (NullPointerException e){
            return null;
        }


    }
}
