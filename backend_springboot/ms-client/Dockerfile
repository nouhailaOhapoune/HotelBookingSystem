FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY ./target/ms-client-0.0.1-SNAPSHOT.jar app_msc.jar
ENTRYPOINT ["java", "-jar", "/app_msc.jar"]