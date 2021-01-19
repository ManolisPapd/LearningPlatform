package com.manolispapadimitriou.learningplatformbackend;

import com.manolispapadimitriou.learningplatformbackend.h2.component.InitializerComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class LearningPlatformBackendApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(LearningPlatformBackendApplication.class);


    public static void main(String[] args) {
        SpringApplication.run(LearningPlatformBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("Initializing H2 database.");
        InitializerComponent.h2dbInit();
    }
}
