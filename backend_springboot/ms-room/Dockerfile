FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY ./target/ms-room-0.0.1-SNAPSHOT.jar app_msr.jar
ENTRYPOINT ["java", "-jar", "/app_msr.jar"]