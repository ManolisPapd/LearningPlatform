FROM openjdk:8-jdk-alpine
MAINTAINER valkon.gr@gmail.com
EXPOSE 8080
COPY core/target/core-0.0.1-SNAPSHOT.jar learning-platform-backend.jar
ENTRYPOINT ["java", "-jar", "/learning-platform-backend.jar"]